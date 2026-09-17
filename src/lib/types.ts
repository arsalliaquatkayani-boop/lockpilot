// Mirrors lockpilot-backend/migrations/001_schema.sql — keep in sync by hand
// for now; codegen from the live schema is a nice-to-have for later.

export type Shop = {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  grace_period_days: number;
  plan: "trial" | "basic" | "pro";
  billing_status: "active" | "overdue" | "suspended";
  next_payment_due: string | null;
  last_payment_date: string | null;
  created_at: string;
};

export type Staff = {
  id: string;
  shop_id: string;
  full_name: string | null;
  email: string | null;
  role: "owner" | "staff";
  created_at: string;
};

export type AdminShopStats = {
  customers_count: number;
  devices_count: number;
  active_plans_count: number;
  locked_devices_count: number;
};

export type Customer = {
  id: string;
  shop_id: string;
  full_name: string;
  phone: string | null;
  city: string | null;
  address: string | null;
  cnic_number: string | null;
  cnic_front_path: string | null;
  cnic_back_path: string | null;
  guarantor_name: string | null;
  guarantor_phone: string | null;
  created_at: string;
};

export type DeviceStatus = "active" | "locked" | "paid_off" | "inactive";

export type Device = {
  id: string;
  shop_id: string;
  customer_id: string | null;
  device_label: string | null;
  imei: string | null;
  imeis: string[] | null;
  android_device_id: string | null;
  device_secret: string | null;
  cost_price: number | null;
  sale_price: number | null;
  status: DeviceStatus;
  should_be_locked: boolean;
  last_seen_at: string | null;
  provisioned_at: string | null;
  created_at: string;
};

export type InstallmentPlan = {
  id: string;
  shop_id: string;
  device_id: string;
  customer_id: string;
  total_amount: number;
  down_payment: number;
  installment_amount: number;
  installment_count: number;
  frequency: "weekly" | "monthly";
  start_date: string;
  due_day_of_month: number | null;
  status: "active" | "completed" | "defaulted";
  created_at: string;
};

export type Payment = {
  id: string;
  shop_id: string;
  installment_plan_id: string;
  amount: number;
  due_date: string;
  paid_date: string | null;
  recorded_by: string | null;
  created_at: string;
};

export type LockEvent = {
  id: string;
  shop_id: string;
  device_id: string;
  event_type: "locked" | "unlocked" | "manual_lock" | "manual_unlock";
  trigger: string | null;
  triggered_by: string | null;
  created_at: string;
};
