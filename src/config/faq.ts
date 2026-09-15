export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What happens when a payment is missed?",
    answer:
      "Once an installment passes its grace period, LockPilot can move the device into an overdue state and, depending on your shop's settings, apply device controls automatically. You always retain a manual override.",
  },
  {
    question: "Does the phone unlock automatically after payment?",
    answer:
      "Yes — when a payment is recorded and the payment state updates successfully, the device can return to its normal state automatically, provided the implementation on that device supports automatic restoration.",
  },
  {
    question: "Can the customer uninstall LockPilot?",
    answer:
      "LockPilot is intended to prevent removal while installments are outstanding. The actual protection depends on Android's device administration capabilities and the specific device/OS version, so we describe this conservatively rather than guaranteeing it in every scenario.",
  },
  {
    question: "What happens if the customer factory resets the phone?",
    answer:
      "LockPilot is designed to resist unauthorized factory resets where Android's device owner protections apply. We do not promise this is unbreakable in every circumstance — actual behavior depends on the Android version and device.",
  },
  {
    question: "Can I manually unlock a device?",
    answer:
      "Yes. Retailers always retain manual control over their devices from the dashboard, subject to normal account and device permissions.",
  },
  {
    question: "What happens when the phone is fully paid?",
    answer:
      "Once the final installment is recorded, device protections are removed and the device returns to its normal, unrestricted state.",
  },
  {
    question: "Which Android phones are supported?",
    answer:
      "We don't publish a fixed compatibility list at this stage — supported devices depend on the current Android implementation. We'll share more specific guidance as the product moves toward general availability.",
  },
  {
    question: "How many devices can I manage?",
    answer: "The current plan covers up to 50 active devices.",
  },
  {
    question: "Can I see device location?",
    answer:
      "Device location is on the roadmap but not built yet. When it ships, visibility will depend on device permissions and connectivity, and will show a last-known location rather than a guaranteed live position.",
  },
  {
    question: "How is the Android app installed?",
    answer:
      "The app is installed via a downloadable APK at the time of sale. LockPilot is not currently distributed through the Google Play Store.",
  },
  {
    question: "How do I get started?",
    answer:
      "Request early access and we'll walk you through onboarding, including how the app is installed and how to set up your first installment plan.",
  },
];
