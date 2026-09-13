// Site-wide constants. Keep configurable values centralized here so they are
// easy to change once real infrastructure (backend, APK, domain) exists.

export const SITE = {
  name: "LockPilot",
  domain: "mylockpilot.com",
  tagline: "Control every installment. Know every number.",
  description:
    "LockPilot helps mobile shops in Pakistan manage installment phone sales with device protection, payment tracking, location visibility, and financial insight.",
};

// The real APK is not built yet. Once it exists, drop the file at
// public/downloads/lockpilot.apk and this constant needs no other change.
export const APK_DOWNLOAD_URL = "/downloads/lockpilot.apk";

// Early-access form currently has no backend. Submissions are not stored
// anywhere yet — this flag exists so the form's success state can be wired to
// a real API/CRM later without changing any component code.
export const EARLY_ACCESS_BACKEND_CONNECTED = false;

export const CONTACT = {
  // Intentionally left unset — do not fabricate contact details.
  whatsapp: null as string | null,
  email: null as string | null,
};

export const CURRENT_YEAR = new Date().getFullYear();
