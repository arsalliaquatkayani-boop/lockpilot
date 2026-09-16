import { useState, type FormEvent } from "react";
import { Button } from "./Button";

const volumeOptions = ["1–10", "11–30", "31–50", "50+"];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend is connected yet (see EARLY_ACCESS_BACKEND_CONNECTED in
    // src/config/config.ts). This only updates local UI state for now.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-emerald-soft bg-emerald-soft/40 p-10 text-center">
        <h3 className="font-heading text-[20px] font-bold text-offwhite mb-2">
          Thanks — your early-access request has been received.
        </h3>
        <p className="text-[14.5px] text-slate">We'll reach out on WhatsApp with next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-card border border-line bg-white p-8 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" name="fullName" required />
        <Field label="Shop Name" name="shopName" required />
        <Field label="WhatsApp Number" name="whatsapp" type="tel" required />
        <Field label="City" name="city" required />
      </div>
      <div>
        <label className="mb-1.5 block text-[13.5px] font-medium text-offwhite" htmlFor="volume">
          Approx. phones sold on installments per month
        </label>
        <select
          id="volume"
          name="volume"
          required
          defaultValue=""
          className="w-full rounded-sm border border-line bg-white px-4 py-2.5 text-[14.5px] text-offwhite focus:outline-none focus:border-emerald"
        >
          <option value="" disabled>
            Select a range
          </option>
          {volumeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="primary" className="mt-2 w-full md:w-fit">
        Request Early Access
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13.5px] font-medium text-offwhite" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-line bg-white px-4 py-2.5 text-[14.5px] text-offwhite placeholder:text-slate-light focus:outline-none focus:border-emerald"
      />
    </div>
  );
}
