import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/supabase";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[14.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

const FUNCTIONS_URL = "https://laqcafhkqmgkpuapthdq.supabase.co/functions/v1/admin-create-shop";

export function AdminAddShop() {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (!accessToken) {
      setFormError("Your session expired — please sign in again.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(FUNCTIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ shopName, shopPhone, ownerFullName, ownerEmail }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setFormError(body.error ?? `Failed to create shop (${res.status}).`);
        setSubmitting(false);
        return;
      }

      setSuccess(true);
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
    }
    setSubmitting(false);
  }

  if (success) {
    return (
      <AdminLayout>
        <div className="mx-auto max-w-[480px] rounded-card border border-line-dark p-6 text-center">
          <div className="mb-2 font-heading text-[18px] font-bold text-offwhite">Invite sent</div>
          <p className="mb-5 text-[13.5px] text-slate">
            <span className="text-offwhite">{ownerEmail}</span> has been emailed a link to set up their
            password and start using "{shopName}"'s dashboard.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={() => setSuccess(false)}>
              Add another shop
            </Button>
            <Button variant="primary" onClick={() => navigate("/admin/shops")}>
              View all shops
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-6 font-heading text-[24px] font-extrabold text-offwhite">Add a shop</h1>

      <form onSubmit={handleSubmit} className="max-w-[480px] rounded-card border border-line-dark p-6">
        <div className="mb-4">
          <label className={labelClass}>Shop name</label>
          <input required value={shopName} onChange={(e) => setShopName(e.target.value)} className={inputClass} />
        </div>
        <div className="mb-4">
          <label className={labelClass}>Shop phone</label>
          <input value={shopPhone} onChange={(e) => setShopPhone(e.target.value)} className={inputClass} />
        </div>
        <div className="mb-4">
          <label className={labelClass}>Owner's full name</label>
          <input
            required
            value={ownerFullName}
            onChange={(e) => setOwnerFullName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="mb-5">
          <label className={labelClass}>Owner's email</label>
          <input
            type="email"
            required
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            className={inputClass}
            placeholder="They'll receive a setup link at this address"
          />
        </div>

        {formError && (
          <div className="mb-4 rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[13px] text-danger">
            {formError}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Sending invite…" : "Create shop & send invite"}
        </Button>
      </form>
    </AdminLayout>
  );
}
