import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device, InstallmentPlan, Payment } from "../../lib/types";

export function useShopData() {
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

  return { customers, devices, plans, payments, loading, error, reload: load };
}
