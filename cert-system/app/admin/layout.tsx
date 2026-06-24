import NavLink from "@/components/NavLink";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F6E56]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900">
            Nukus Tibbiyot va IT Texnikumi
          </span>
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          <NavLink href="/admin">Bosh sahifa</NavLink>
          <NavLink href="/admin/add">Talaba qo&apos;shish</NavLink>
          <NavLink href="/admin/list">Ro&apos;yxat</NavLink>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-gray-500 sm:inline">admin@texnikum.uz</span>
          <LogoutButton />
        </div>
      </nav>

      <main className="pt-16 p-6">{children}</main>
    </div>
  );
}
