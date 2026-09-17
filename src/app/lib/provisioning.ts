// Values verified against the app's actual signed release build — see
// lockpilot-android/provisioning/lockpilot-provisioning-qr.png, confirmed
// working via real Xiaomi/Redmi device testing. These only change if the
// app is ever re-signed with a different keystore.
const ADMIN_COMPONENT = "com.mylockpilot.app/.LockPilotDeviceAdminReceiver";
const APK_DOWNLOAD_URL = "https://lockpilot.vercel.app/downloads/lockpilot.apk";
const SIGNATURE_CHECKSUM = "xbysiMQ_jiL3adp5_abQvlU410jco294u2kq7UTVNMk";

/**
 * Builds a per-device Android zero-touch provisioning QR payload. Scanning
 * this on a factory-reset phone's welcome screen installs LockPilot, makes
 * it Device Owner, AND pairs it immediately — the device_id/pairing_code
 * ride along in PROVISIONING_ADMIN_EXTRAS_BUNDLE, which
 * LockPilotDeviceAdminReceiver.onProfileProvisioningComplete reads.
 */
export function buildProvisioningPayload(deviceId: string, pairingCode: string): string {
  return JSON.stringify({
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": ADMIN_COMPONENT,
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": APK_DOWNLOAD_URL,
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": SIGNATURE_CHECKSUM,
    "android.app.extra.PROVISIONING_SKIP_ENCRYPTION": true,
    "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true,
    "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
      device_id: deviceId,
      pairing_code: pairingCode,
    },
  });
}
