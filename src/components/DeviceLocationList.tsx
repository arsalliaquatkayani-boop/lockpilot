type LocationState = "Available" | "Unavailable" | "Permission Disabled" | "Device Offline";

type LocationEntry = {
  deviceId: string;
  status: "Active" | "Overdue" | "Locked";
  city: string;
  lastUpdated: string;
  locationState: LocationState;
};

// Demo data only — fictional device IDs and locations.
const demoLocations: LocationEntry[] = [
  { deviceId: "LP-1042", status: "Active", city: "Karachi, Pakistan", lastUpdated: "Today, 10:42 AM", locationState: "Available" },
  { deviceId: "LP-1097", status: "Locked", city: "Lahore, Pakistan", lastUpdated: "Today, 9:18 AM", locationState: "Available" },
  { deviceId: "LP-1118", status: "Overdue", city: "Rawalpindi, Pakistan", lastUpdated: "Yesterday, 6:05 PM", locationState: "Unavailable" },
  { deviceId: "LP-1160", status: "Active", city: "Islamabad, Pakistan", lastUpdated: "—", locationState: "Permission Disabled" },
];

const stateStyle: Record<LocationState, string> = {
  Available: "text-emerald-deep bg-emerald-soft",
  Unavailable: "text-slate bg-line",
  "Permission Disabled": "text-amber-700 bg-amber-100",
  "Device Offline": "text-slate bg-line",
};

export function DeviceLocationList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {demoLocations.map((entry) => (
        <div key={entry.deviceId} className="rounded-card border border-line p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[13px] text-navy">{entry.deviceId}</span>
            <span className="font-mono text-[11px] text-slate">{entry.status}</span>
          </div>
          <div className="text-[13.5px] text-slate mb-1">Last known location</div>
          <div className="text-[15px] font-medium text-navy mb-3">{entry.city}</div>
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="text-slate-light font-mono">Updated: {entry.lastUpdated}</span>
            <span className={`rounded-pill px-2.5 py-1 font-mono text-[11px] ${stateStyle[entry.locationState]}`}>
              {entry.locationState}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
