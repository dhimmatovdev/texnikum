"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "admin@texnikum.uz";
const ADMIN_PASSWORD = "texnikum2024";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      document.cookie = "admin_session=true; path=/; max-age=86400";
      router.push("/admin");
      return;
    }

    setLoading(false);
    setError("Login yoki parol noto'g'ri");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm"
      >
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F6E56]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-center text-lg font-bold text-gray-900">
            Nukus Tibbiyot va IT Texnikumi
          </h1>
          <p className="mt-1 text-sm text-gray-500">Admin panel</p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0F6E56] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0F6E56] focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c5a46] disabled:opacity-50"
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </div>
      </form>
    </main>
  );
}
