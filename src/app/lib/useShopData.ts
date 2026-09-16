import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device, InstallmentPlan, LockEvent, Payment, Staff } from "../../lib/types";

export function useShopData() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [plans, setPlans] = useState<InstallmentPlan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [lockEvents, setLockEvents] = useState<LockEvent[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [customersRes, devicesRes, plansRes, paymentsRes, lockEventsRes, staffRes] = await Promise.all([
      supabase.from("customers").select("*").order("created_at", { ascending: false }),
      supabase.from("devices").select("*").order("created_at", { ascending: false }),
      supabase.from("installment_plans").select("*"),
      supabase.from("payments").select("*"),
      supabase.from("lock_events").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("staff").select("*"),
    ]);

    const firstError =
      customersRes.error || devicesRes.error || plansRes.error || paymentsRes.error || lockEventsRes.error || staffRes.error;
    if (firstError) {
      setError(firstError.message);
    } else {
      setError(null);
      setCustomers(customersRes.data ?? []);
      setDevices(devicesRes.data ?? []);
      setPlans(plansRes.data ?? []);
      setPayments(paymentsRes.data ?? []);
      setLockEvents(lockEventsRes.data ?? []);
      setStaff(staffRes.data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { customers, devices, plans, payments, lockEvents, staff, loading, error, reload: load };
}
