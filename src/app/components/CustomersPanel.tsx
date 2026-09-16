import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[13.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";
const fileInputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2 text-[12.5px] text-slate-light file:mr-3 file:rounded-sm file:border-0 file:bg-emerald-soft file:px-2.5 file:py-1.5 file:text-[12px] file:font-semibold file:text-emerald-deep";

function extOf(file: File) {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts.pop() : "jpg";
}

export function CustomersPanel({
  customers,
  onChanged,
}: {
  customers: Customer[];
  onChanged: () => void;
}) {
  const { shop } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cnicNumber, setCnicNumber] = useState("");
  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorPhone, setGuarantorPhone] = useState("");
  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  function resetForm() {
    setFullName("");
    setPhone("");
    setCity("");
    setAddress("");
    setCnicNumber("");
    setGuarantorName("");
    setGuarantorPhone("");
    setCnicFront(null);
    setCnicBack(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!shop) return;
    setSubmitting(true);
    setError(null);

    const { data: newCustomer, error: insertError } = await supabase
      .from("customers")
      .insert({
        shop_id: shop.id,
        full_name: fullName,
        phone: phone || null,
        city: city || null,
        address: address || null,
        cnic_number: cnicNumber || null,
        guarantor_name: guarantorName || null,
        guarantor_phone: guarantorPhone || null,
      })
      .select()
      .single();

    if (insertError || !newCustomer) {
      setError(insertError?.message ?? "Could not save customer.");
      setSubmitting(false);
      return;
    }

    const pathUpdates: { cnic_front_path?: string; cnic_back_path?: string } = {};

    if (cnicFront) {
      const path = `${shop.id}/${newCustomer.id}-front.${extOf(cnicFront)}`;
      const { error: uploadError } = await supabase.storage
        .from("customer-documents")
        .upload(path, cnicFront, { upsert: true });
      if (uploadError) {
        setError(`Customer saved, but CNIC front upload failed: ${uploadError.message}`);
      } else {
        pathUpdates.cnic_front_path = path;
      }
    }

    if (cnicBack) {
      const path = `${shop.id}/${newCustomer.id}-back.${extOf(cnicBack)}`;
      const { error: uploadError } = await supabase.storage
        .from("customer-documents")
        .upload(path, cnicBack, { upsert: true });
      if (uploadError) {
        setError(`Customer saved, but CNIC back upload failed: ${uploadError.message}`);
      } else {
        pathUpdates.cnic_back_path = path;
      }
    }

    if (pathUpdates.cnic_front_path || pathUpdates.cnic_back_path) {
      await supabase.from("customers").update(pathUpdates).eq("id", newCustomer.id);
    }

    setSubmitting(false);
    resetForm();
    setShowForm(false);
    onChanged();
  }

  async function handleViewId(customer: Customer, side: "front" | "back") {
    const path = side === "front" ? customer.cnic_front_path : customer.cnic_back_path;
    if (!path) return;
    setViewingId(customer.id + side);
    const { data, error: signError } = await supabase.storage
      .from("customer-documents")
      .createSignedUrl(path, 60);
    setViewingId(null);
    if (signError || !data) {
      setError(signError?.message ?? "Could not open document.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-card border border-line bg-navy-secondary p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-extrabold text-offwhite">Customers</h2>
        <Button variant={showForm ? "ghost-dark" : "secondary"} size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Add customer"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 border-b border-line pb-6 md:grid-cols-3">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
          </div>

          <div className="md:col-span-3">
            <label className={labelClass}>Complete Residential Address</label>
            <input
              placeholder="House #, street, area, city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>CNIC Number</label>
            <input
              placeholder="42101-1234567-1"
              pattern="\d{5}-\d{7}-\d{1}"
              title="Format: 42101-1234567-1"
              value={cnicNumber}
              onChange={(e) => setCnicNumber(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>CNIC Front Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCnicFront(e.target.files?.[0] ?? null)}
              className={fileInputClass}
            />
          </div>
          <div>
            <label className={labelClass}>CNIC Back Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCnicBack(e.target.files?.[0] ?? null)}
              className={fileInputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Guarantor / Reference Name</label>
            <input
              placeholder="Optional"
              value={guarantorName}
              onChange={(e) => setGuarantorName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Guarantor / Reference Phone</label>
            <input
              placeholder="Optional"
              value={guarantorPhone}
              onChange={(e) => setGuarantorPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <div className="text-[13px] text-danger md:col-span-3">{error}</div>}
          <div className="md:col-span-3">
            <Button type="submit" variant="primary" size="sm" disabled={submitting}>
              {submitting ? "Saving…" : "Save customer"}
            </Button>
          </div>
        </form>
      )}

      {customers.length === 0 ? (
        <div className="text-[13.5px] text-slate">No customers yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] text-slate">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                <th className="pb-3 font-normal">Name</th>
                <th className="pb-3 font-normal">Phone</th>
                <th className="pb-3 font-normal">City</th>
                <th className="pb-3 font-normal">CNIC</th>
                <th className="pb-3 font-normal">Guarantor</th>
                <th className="pb-3 font-normal">ID Documents</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-none">
                  <td className="py-3 text-offwhite">{c.full_name}</td>
                  <td className="py-3">{c.phone ?? "—"}</td>
                  <td className="py-3">{c.city ?? "—"}</td>
                  <td className="py-3 font-mono">{c.cnic_number ?? "—"}</td>
                  <td className="py-3">
                    {c.guarantor_name ? (
                      <>
                        {c.guarantor_name}
                        {c.guarantor_phone && <span className="text-slate-light"> · {c.guarantor_phone}</span>}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-3">
                    {!c.cnic_front_path && !c.cnic_back_path ? (
                      <span className="text-slate-light">None on file</span>
                    ) : (
                      <div className="flex gap-2">
                        {c.cnic_front_path && (
                          <Button
                            variant="ghost-dark"
                            size="sm"
                            disabled={viewingId === c.id + "front"}
                            onClick={() => handleViewId(c, "front")}
                          >
                            Front
                          </Button>
                        )}
                        {c.cnic_back_path && (
                          <Button
                            variant="ghost-dark"
                            size="sm"
                            disabled={viewingId === c.id + "back"}
                            onClick={() => handleViewId(c, "back")}
                          >
                            Back
                          </Button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
