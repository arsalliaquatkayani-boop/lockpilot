import { AppLayout } from "../components/AppLayout";
import { DevicesPanel } from "../components/DevicesPanel";
import { useShopData } from "../lib/useShopData";

export function DevicesPage() {
  const { devices, customers, loading, error, reload } = useShopData();

  return (
    <AppLayout>
      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}
      <h1 className="mb-6 font-heading text-[24px] font-extrabold text-offwhite">Devices</h1>
      {loading ? (
        <div className="text-[13.5px] text-slate">Loading…</div>
      ) : (
        <DevicesPanel devices={devices} customers={customers} onChanged={reload} />
      )}
    </AppLayout>
  );
}
