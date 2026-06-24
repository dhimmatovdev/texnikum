"use client";

import { useState } from "react";
import type { Certificate } from "@/types/certificate";

type Props = {
  onCreated: (certificate: Certificate) => void;
};

const emptyForm = {
  cert_no: "",
  full_name: "",
  specialty: "",
  graduation_year: new Date().getFullYear(),
  gpa: "",
  issue_date: "",
  status: "valid" as const,
};

export default function CertificateForm({ onCreated }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        graduation_year: Number(form.graduation_year),
        gpa: form.gpa ? Number(form.gpa) : null,
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.error ?? "Xatolik yuz berdi");
      return;
    }

    onCreated(json.data);
    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label className="block text-xs font-medium text-gray-700">Sertifikat raqami</label>
        <input
          required
          value={form.cert_no}
          onChange={(e) => update("cert_no", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">F.I.Sh.</label>
        <input
          required
          value={form.full_name}
          onChange={(e) => update("full_name", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Mutaxassislik</label>
        <input
          required
          value={form.specialty}
          onChange={(e) => update("specialty", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Bitirgan yili</label>
        <input
          required
          type="number"
          value={form.graduation_year}
          onChange={(e) => update("graduation_year", Number(e.target.value) as never)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">GPA</label>
        <input
          type="number"
          step="0.01"
          value={form.gpa}
          onChange={(e) => update("gpa", e.target.value as never)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Berilgan sana</label>
        <input
          required
          type="date"
          value={form.issue_date}
          onChange={(e) => update("issue_date", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Holati</label>
        <select
          value={form.status}
          onChange={(e) => update("status", e.target.value as never)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="valid">Valid</option>
          <option value="revoked">Revoked</option>
        </select>
      </div>

      {error && <p className="col-span-full text-sm text-red-600">{error}</p>}

      <div className="col-span-full">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saqlanmoqda..." : "Sertifikat qo'shish"}
        </button>
      </div>
    </form>
  );
}
