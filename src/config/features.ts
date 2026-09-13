export type FeatureItem = {
  id: string;
  title: string;
  description: string;
};

export const featureItems: FeatureItem[] = [
  {
    id: "auto-lock",
    title: "Automatic Device Lock",
    description:
      "When an installment becomes overdue past its grace period, device controls can activate automatically — no phone calls, no manual chasing.",
  },
  {
    id: "auto-unlock",
    title: "Automatic Unlock",
    description:
      "Once a payment is received and recorded, the device can return to its normal state automatically, the same way it was restricted.",
  },
  {
    id: "removal-protection",
    title: "Protection Against Removal",
    description:
      "LockPilot is designed to resist unauthorized uninstallation or factory reset while payments are outstanding. Actual protection depends on the Android device administration capabilities available on a given device and OS version.",
  },
  {
    id: "lifecycle",
    title: "Full Payment Lifecycle",
    description:
      "Every device moves through one clear lifecycle: sale, payment schedule, payment, overdue, lock, payment received, restore, paid off — visible at every stage.",
  },
  {
    id: "manual-override",
    title: "Manual Override",
    description:
      "Automation never removes your control. A retailer can unlock, pause, or adjust any device from the dashboard at any time.",
  },
  {
    id: "records",
    title: "Customer & Device Records",
    description:
      "Every customer and every device lives in one place — installment history, contact details, and current status, without scattered notebooks or spreadsheets.",
  },
  {
    id: "financial-visibility",
    title: "Financial Visibility",
    description:
      "See capital invested, money collected, outstanding receivables, overdue amounts, and expected profit — updated as payments come in.",
  },
  {
    id: "audit-log",
    title: "Lock / Unlock Audit Log",
    description:
      "Every device-state change is recorded with the event, device, timestamp, trigger, and resulting status — so a dispute is a lookup, not a guessing game.",
  },
];
