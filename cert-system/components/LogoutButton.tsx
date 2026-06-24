"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    document.cookie = "admin_session=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Chiqish
    </button>
  );
}
