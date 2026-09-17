import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { supabase } from "../../lib/supabase";
import type { Device } from "../../lib/types";
import { Button } from "../../components/Button";
import { buildProvisioningPayload } from "../lib/provisioning";
import { isWebUsbSupported, runUsbSetup, WebAdbSetupError, type SetupStep } from "../lib/webadb";

const stepLabels: Record<SetupStep, string> = {
  connecting: "Waiting for you to pick the phone…",
  "waiting-for-phone-approval": "Check the phone screen — tap \"Allow USB debugging\"",
  installing: "Installing LockPilot on the phone…",
  "setting-device-owner": "Locking in device control…",
  pairing: "Pairing with this customer's plan…",
  done: "Done — the phone is set up and paired.",
};

export function DeviceSetupModal({ device, onClose }: { device: Device; onClose: () => void }) {
  const [tab, setTab] = useState<"qr" | "usb" | "manual">("qr");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [usbStep, setUsbStep] = useState<SetupStep | null>(null);
  const [usbError, setUsbError] = useState<string | null>(null);
  const [usbRunning, setUsbRunning] = useState(false);
  const [frpAppliedAt, setFrpAppliedAt] = useState(device.frp_applied_at);
  const [checkingFrp, setCheckingFrp] = useState(false);

  async function refreshFrpStatus() {
    setCheckingFrp(true);
    const { data } = await supabase
      .from("devices")
      .select("frp_applied_at")
      .eq("id", device.id)
      .single();
    setFrpAppliedAt(data?.frp_applied_at ?? null);
    setCheckingFrp(false);
  }

  useEffect(() => {
    if (tab !== "qr" || !device.device_secret) return;
    const payload = buildProvisioningPayload(device.id, device.device_secret);
    QRCode.toDataURL(payload, { width: 280, margin: 1 }).then(setQrDataUrl);
  }, [tab, device.id, device.device_secret]);

  async function handleUsbConnect() {
    if (!device.device_secret) return;
    setUsbRunning(true);
    setUsbError(null);
    try {
      await runUsbSetup(device.id, device.device_secret, setUsbStep);
      // The phone confirms FRP protection asynchronously (a few seconds
      // after setup, sometimes longer on slower networks) — check once
      // right away, staff can hit "Check again" below if it's not there yet.
      await refreshFrpStatus();
    } catch (err) {
      console.error("USB setup failed:", err);
      setUsbError(
        err instanceof WebAdbSetupError
          ? err.message
          : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    setUsbRunning(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-[520px] rounded-card border border-line bg-navy-secondary p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-[17px] font-extrabold text-offwhite">
            Set up {device.device_label ?? "this phone"}
          </h2>
          <button type="button" onClick={onClose} className="text-slate hover:text-offwhite">
            ✕
          </button>
        </div>

        <div
          className={`mb-5 flex items-center justify-between rounded-sm border px-3 py-2.5 text-[12.5px] ${
            frpAppliedAt
              ? "border-emerald/30 bg-emerald-soft text-emerald-deep"
              : "border-warning/30 bg-warning-soft text-warning"
          }`}
        >
          <span>
            {frpAppliedAt
              ? "✓ Anti-theft protection (FRP) confirmed active on this phone"
              : "⚠ Anti-theft protection (FRP) not yet confirmed — don't hand over the phone until this shows active"}
          </span>
          <button
            type="button"
            onClick={refreshFrpStatus}
            disabled={checkingFrp}
            className="flex-shrink-0 font-medium underline"
          >
            {checkingFrp ? "Checking…" : "Check again"}
          </button>
        </div>

        <div className="mb-5 flex gap-1 rounded-sm border border-line p-1">
          {(["qr", "usb", "manual"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-sm py-2 text-[12.5px] font-medium transition-colors ${
                tab === t ? "bg-emerald-soft text-emerald-deep" : "text-slate hover:text-offwhite"
              }`}
            >
              {t === "qr" ? "Scan QR" : t === "usb" ? "Connect via USB" : "Manual"}
            </button>
          ))}
        </div>

        {tab === "qr" && (
          <div>
            <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-[13px] text-slate">
              <li>Factory reset the phone (Settings → System → Reset, or use a brand-new phone still in setup)</li>
              <li>On the "Hi there" welcome screen, tap the screen 6 times in the same spot</li>
              <li>Connect it to Wi-Fi when asked</li>
              <li>Scan this QR code when the camera opens</li>
            </ol>
            <div className="mb-3 rounded-sm border border-line bg-navy p-4 text-center">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Provisioning QR code" className="mx-auto" />
              ) : (
                <div className="py-16 text-[13px] text-slate">Generating…</div>
              )}
            </div>
            <p className="rounded-sm border border-warning/30 bg-warning-soft px-3 py-2 text-[12.5px] text-warning">
              Doesn't work on Xiaomi/Redmi phones — MIUI blocks this method. Use "Connect via USB" instead for those.
            </p>
          </div>
        )}

        {tab === "usb" && (
          <div>
            <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-[13px] text-slate">
              <li>Factory reset the phone, and skip signing into any Google account during setup</li>
              <li>
                Go to Settings → About phone → tap "Build number" 7 times to unlock Developer Options
              </li>
              <li>Settings → Developer options → turn on "USB debugging"</li>
              <li>Plug the phone into this computer with a USB cable</li>
              <li>Click "Connect via USB" below, then pick the phone from the popup</li>
            </ol>

            {!isWebUsbSupported() ? (
              <p className="rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[12.5px] text-danger">
                This browser doesn't support USB setup — open this page in Chrome or Edge on a computer.
              </p>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={usbRunning}
                  onClick={handleUsbConnect}
                >
                  {usbRunning ? "Working…" : "Connect via USB"}
                </Button>
                {usbStep && (
                  <p className="mt-3 text-center text-[13px] text-slate">{stepLabels[usbStep]}</p>
                )}
                {usbError && (
                  <div className="mt-3 rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[12.5px] text-danger">
                    {usbError}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "manual" && (
          <div>
            <p className="mb-3 text-[13px] text-slate">
              If you've already installed LockPilot and made it Device Owner some other way, enter these
              on the phone's "Pair this device" screen:
            </p>
            <div className="grid gap-1 rounded-sm border border-line bg-navy p-3 font-mono text-[12.5px] text-offwhite">
              <div>Device ID: {device.id}</div>
              <div>Pairing code: {device.device_secret ?? "—"}</div>
              {device.imeis && device.imeis.length > 0 && <div>IMEI{device.imeis.length > 1 ? "s" : ""}: {device.imeis.join(", ")}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
