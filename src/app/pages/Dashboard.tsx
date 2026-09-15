import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device, InstallmentPlan, Payment } from "../../lib/types";
import { AppLayout } from "../components/AppLayout";
import { StatsBar } from "../components/StatsBar";
import { CustomersPanel } from "../components/CustomersPanel";
import { DevicesPanel } from "../components/DevicesPanel";
import { PaymentsPanel } from "../components/PaymentsPanel";

export function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [plans, setPlans] = useState<InstallmentPlan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [customersRes, devicesRes, plansRes, paymentsRes] = await Promise.all([
      supabase.from("customers").select("*").order("created_at", { ascending: false }),
      supabase.from("devices").select("*").order("created_at", { ascending: false }),
      supabase.from("installment_plans").select("*"),
      supabase.from("payments").select("*"),
    ]);

    const firstError =
      customersRes.error || devicesRes.error || plansRes.error || paymentsRes.error;
    if (firstError) {
      setError(firstError.message);
    } else {
      setError(null);
      setCustomers(customersRes.data ?? []);
      setDevices(devicesRes.data ?? []);
      setPlans(plansRes.data ?? []);
      setPayments(paymentsRes.data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <AppLayout>
        <div className="font-mono text-[13.5px] text-slate">Loading your shop's data…</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}

      <StatsBar devices={devices} payments={payments} />

      <div className="grid gap-6">
        <DevicesPanel devices={devices} customers={customers} onChanged={load} />
        <PaymentsPanel payments={payments} plans={plans} devices={devices} customers={customers} onChanged={load} />
        <CustomersPanel customers={customers} onChanged={load} />
      </div>
    </AppLayout>
  );
}
