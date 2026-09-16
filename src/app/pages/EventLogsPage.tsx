import { useMemo } from "react";
import { AppLayout } from "../components/AppLayout";
import { useShopData } from "../lib/useShopData";

const eventLabel: Record<string, string> = {
  locked: "Locked automatically",
  unlocked: "Unlocked automatically",
  manual_lock: "Locked manually",
  manual_unlock: "Unlocked manually",
};

const eventStyle: Record<string, string> = {
  locked: "bg-danger-soft text-danger",
  manual_lock: "bg-danger-soft text-danger",
  unlocked: "bg-success-soft text-success",
  manual_unlock: "bg-success-soft text-success",
};

export function EventLogsPage() {
  const { lockEvents, devices, staff, loading, error } = useShopData();

  const rows = useMemo(() => {
    return lockEvents.map((e) => {
      const device = devices.find((d) => d.id === e.device_id);
      const actor = staff.find((s) => s.id === e.triggered_by);
      return {
        id: e.id,
        device: device?.device_label ?? "—",
        eventType: e.event_type,
        actor: actor?.full_name ?? (e.triggered_by ? "—" : "System"),
        time: new Date(e.created_at).toLocaleString("en-PK", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };
    });
  }, [lockEvents, devices, staff]);

  return (
    <AppLayout>
      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}
      <h1 className="mb-6 font-heading text-[24px] font-extrabold text-offwhite">Event Logs</h1>

      {loading ? (
        <div className="text-[13.5px] text-slate">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="rounded-card border border-line p-6 text-[13.5px] text-slate">
          No lock or unlock events recorded yet.
        </div>
      ) : (
        <div className="rounded-card border border-line p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px] text-slate">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                  <th className="pb-3 font-normal">Device</th>
                  <th className="pb-3 font-normal">Event</th>
                  <th className="pb-3 font-normal">Triggered By</th>
                  <th className="pb-3 font-normal">Time</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-line last:border-none">
                    <td className="py-3 font-medium text-offwhite">{r.device}</td>
                    <td className="py-3">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${eventStyle[r.eventType]}`}>
                        {eventLabel[r.eventType] ?? r.eventType}
                      </span>
                    </td>
                    <td className="py-3">{r.actor}</td>
                    <td className="py-3 font-mono">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
