"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Certificate } from "@/types";

type Props = {
  certificate: Certificate;
};

export default function EditCertificateForm({ certificate }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    familiya: certificate.familiya,
    ism: certificate.ism,
    sharif: certificate.sharif ?? "",
    yonalish_uz: certificate.yonalish_uz,
    yonalish_eng: certificate.yonalish_eng ?? "",
    soat: certificate.soat?.toString() ?? "",
    start_date: certificate.start_date ?? "",
    end_date: certificate.end_date ?? "",
    status: certificate.status,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/certificates/${certificate.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
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

    router.push("/admin/list");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          onChange={(e) => update("status", e.target.value as Certificate["status"])}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <p className="col-span-full text-sm text-red-600">{error}</p>}

      <div className="col-span-full flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c5a46] disabled:opacity-50"
        >
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/list")}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Bekor qilish
        </button>
      </div>
    </form>
  );
}
