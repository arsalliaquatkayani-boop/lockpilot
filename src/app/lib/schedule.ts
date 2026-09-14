import type { InstallmentPlan } from "../../lib/types";

// Builds the due-date schedule for a new installment plan. Nothing in the
// backend generates these rows automatically (see lockpilot-backend/migrations/003_functions.sql —
// the lock/unlock logic only reacts to payments that already exist), so the
// dashboard has to create one payment row per installment up front.
export function buildPaymentSchedule(
  plan: Pick<InstallmentPlan, "start_date" | "frequency" | "installment_count" | "installment_amount">,
) {
  const dueDates: string[] = [];
  const start = new Date(plan.start_date + "T00:00:00");

  for (let i = 0; i < plan.installment_count; i++) {
    const due = new Date(start);
    if (plan.frequency === "weekly") {
      due.setDate(due.getDate() + 7 * (i + 1));
    } else {
      due.setMonth(due.getMonth() + (i + 1));
    }
    dueDates.push(due.toISOString().slice(0, 10));
  }

  return dueDates;
}
