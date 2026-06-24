"use client";

import { useState } from "react";
import type { Certificate } from "@/types/certificate";

type Props = {
  onCreated: (certificate: Certificate) => void;
};

const emptyForm = {
  cert_no: "",
  familiya: "",
  ism: "",
  sharif: "",
  yonalish_uz: "",
  yonalish_eng: "",
  soat: "",
  start_date: "",
  end_date: "",
  status: "active" as const,
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
        cert_no: form.cert_no || undefined,
        sharif: form.sharif || null,
        yonalish_eng: form.yonalish_eng || null,
        soat: form.soat ? Number(form.soat) : null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
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
        <label className="block text-xs font-medium text-gray-700">
          Sertifikat raqami (ixtiyoriy)
        </label>
        <input
          value={form.cert_no}
          onChange={(e) => update("cert_no", e.target.value)}
          placeholder="Bo'sh qoldirilsa avtomatik beriladi"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Familiya</label>
        <input
          required
          value={form.familiya}
          onChange={(e) => update("familiya", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Ism</label>
        <input
          required
          value={form.ism}
          onChange={(e) => update("ism", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Sharif</label>
        <input
          value={form.sharif}
          onChange={(e) => update("sharif", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Yo&apos;nalish (UZ)</label>
        <input
          required
          value={form.yonalish_uz}
          onChange={(e) => update("yonalish_uz", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Direction (EN)</label>
        <input
          value={form.yonalish_eng}
          onChange={(e) => update("yonalish_eng", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Soat</label>
        <input
          type="number"
          value={form.soat}
          onChange={(e) => update("soat", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Boshlanish sanasi</label>
        <input
          type="date"
          value={form.start_date}
          onChange={(e) => update("start_date", e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700">Tugash sanasi</label>
        <input
          type="date"
          value={form.end_date}
          onChange={(e) => update("end_date", e.target.value)}
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
