import { Adb, AdbDaemonTransport } from "@yume-chan/adb";
import { AdbDaemonWebUsbDeviceManager } from "@yume-chan/adb-daemon-webusb";
import AdbWebCredentialStore from "@yume-chan/adb-credential-web";

const ADMIN_COMPONENT = "com.mylockpilot.app/.LockPilotDeviceAdminReceiver";
const APK_URL = "/downloads/lockpilot.apk";
const REMOTE_APK_PATH = "/data/local/tmp/lockpilot.apk";

export type SetupStep =
  | "connecting"
  | "waiting-for-phone-approval"
  | "installing"
  | "setting-device-owner"
  | "pairing"
  | "done";

export function isWebUsbSupported() {
  return Boolean(AdbDaemonWebUsbDeviceManager.BROWSER);
}

export class WebAdbSetupError extends Error {}

async function runShell(adb: Adb, command: string[]) {
  if (adb.subprocess.shellProtocol) {
    const result = await adb.subprocess.shellProtocol.spawnWaitText(command);
    return result.stdout + result.stderr;
  }
  return adb.subprocess.noneProtocol.spawnWaitText(command);
}

/**
 * Walks a phone connected over USB through the same steps we used to do by
 * hand with the adb CLI: install the app, promote it to Device Owner, then
 * launch it once with the pairing credentials so staff never type them in.
 * Requires a phone with USB debugging already turned on, and — same as the
 * command-line flow — no existing Google account or Device Owner on it.
 */
export async function runUsbSetup(
  deviceId: string,
  pairingCode: string,
  onStep: (step: SetupStep) => void,
): Promise<void> {
  const Manager = AdbDaemonWebUsbDeviceManager.BROWSER;
  if (!Manager) {
    throw new WebAdbSetupError("This browser doesn't support USB setup — use Chrome or Edge on a computer.");
  }

  onStep("connecting");
  const device = await Manager.requestDevice();
  if (!device) {
    throw new WebAdbSetupError("No device was selected.");
  }

  const connection = await device.connect();
  const credentialStore = new AdbWebCredentialStore("LockPilot");

  onStep("waiting-for-phone-approval");
  const transport = await AdbDaemonTransport.authenticate({
    serial: device.serial,
    connection,
    credentialStore,
  });

  const adb = new Adb(transport);

  try {
    onStep("installing");
    const apkBuffer = await fetch(APK_URL).then((r) => r.arrayBuffer());
    const apkBytes = new Uint8Array(apkBuffer);

    const sync = await adb.sync();
    try {
      await sync.write({
        filename: REMOTE_APK_PATH,
        file: new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(apkBytes);
            controller.close();
          },
        }),
      });
    } finally {
      await sync.dispose();
    }

    const installOutput = await runShell(adb, ["pm", "install", "-r", REMOTE_APK_PATH]);
    if (!installOutput.includes("Success")) {
      throw new WebAdbSetupError(`Install failed: ${installOutput.trim()}`);
    }

    onStep("setting-device-owner");
    const ownerOutput = await runShell(adb, ["dpm", "set-device-owner", ADMIN_COMPONENT]);
    if (!ownerOutput.includes("Success")) {
      throw new WebAdbSetupError(
        `Could not set Device Owner: ${ownerOutput.trim()}. The phone likely already has a Google account signed in or was set up before — factory reset it and try again before any account is added.`,
      );
    }

    onStep("pairing");
    await runShell(adb, [
      "am",
      "start",
      "-n",
      "com.mylockpilot.app/.MainActivity",
      "-e",
      "device_id",
      deviceId,
      "-e",
      "pairing_code",
      pairingCode,
    ]);

    onStep("done");
  } finally {
    await adb.close();
  }
}
