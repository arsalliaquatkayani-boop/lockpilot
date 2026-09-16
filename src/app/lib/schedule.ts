import type { InstallmentPlan } from "../../lib/types";

// Builds the due-date schedule for a new installment plan. Nothing in the
// backend generates these rows automatically (see lockpilot-backend/migrations/003_functions.sql —
// the lock/unlock logic only reacts to payments that already exist), so the
// dashboard has to create one payment row per installment up front.
export function buildPaymentSchedule(
  plan: Pick<
    InstallmentPlan,
    "start_date" | "frequency" | "installment_count" | "installment_amount" | "due_day_of_month"
  >,
) {
  const dueDates: string[] = [];
  const start = new Date(plan.start_date + "T00:00:00");

  for (let i = 0; i < plan.installment_count; i++) {
    let due: Date;

    if (plan.frequency === "weekly") {
      due = new Date(start);
      due.setDate(due.getDate() + 7 * (i + 1));
    } else if (plan.due_day_of_month) {
      // Fixed day-of-month (e.g. always the 5th), independent of the day
      // the plan started. Clamp to the last real day of a shorter month
      // (e.g. day 31 in February) instead of overflowing into the next one.
      const targetMonth = new Date(start.getFullYear(), start.getMonth() + 1 + i, 1);
      const lastDayOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
      due = new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth(),
        Math.min(plan.due_day_of_month, lastDayOfMonth),
      );
    } else {
      due = new Date(start);
      due.setMonth(due.getMonth() + (i + 1));
    }

    dueDates.push(due.toISOString().slice(0, 10));
  }

  return dueDates;
}
