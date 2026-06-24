# Samarqand Tibbiyot Texnikumi — Sertifikat tekshirish tizimi

Certificate verification system for Samarqand Tibbiyot Texnikumi.

## Stack

- Next.js 14 (App Router)
- Supabase (PostgreSQL + Auth)
- Tailwind CSS
- TypeScript

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor to create the `certificates` table and RLS policies.
3. Create an admin user in Supabase Auth (Authentication → Users → Add user) — this is the account used to log into `/admin`.
4. Copy `.env.local.example` to `.env.local` and fill in your project's URL and anon key:

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

5. Install dependencies and run the dev server:

   ```
   npm install
   npm run dev
   ```

## Structure

- `/` — public landing page with a certificate number search box
- `/verify/[certNo]` — public certificate verification result page
- `/admin` — protected admin dashboard (add/revoke/delete certificates, view QR codes)
- `/admin/login` — admin sign-in
- `/api/certificates` — list/create certificates (POST requires an authenticated session)
- `/api/certificates/[id]` — get/update/delete a single certificate (PUT/DELETE require an authenticated session)

Each certificate's QR code encodes a link to `/verify/[certNo]` for quick scanning.
