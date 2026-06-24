import Link from "next/link";
import VerifyForm from "@/components/VerifyForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Nukus Tibbiyot va IT Texnikumi
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Sertifikat haqiqiyligini onlayn tekshirish tizimi
        </p>
        <div className="mt-6">
          <VerifyForm />
        </div>
      </div>
      <Link href="/admin" className="mt-6 text-sm text-gray-400 hover:text-gray-600">
        Admin panel
      </Link>
    </main>
  );
}
