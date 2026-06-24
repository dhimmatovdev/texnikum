-- Run this in the Supabase SQL editor

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  cert_no text not null unique,
  full_name text not null,
  specialty text not null,
  graduation_year int not null,
  gpa numeric(3, 2),
  issue_date date not null,
  status text not null default 'valid' check (status in ('valid', 'revoked')),
  created_at timestamptz not null default now()
);

create index if not exists certificates_cert_no_idx on certificates (cert_no);

alter table certificates enable row level security;

-- Anyone can read a certificate by its number (public verification page)
create policy "Public can read certificates"
  on certificates for select
  using (true);

-- Only authenticated admins can insert/update/delete
create policy "Authenticated users can insert certificates"
  on certificates for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update certificates"
  on certificates for update
  to authenticated
  using (true);

create policy "Authenticated users can delete certificates"
  on certificates for delete
  to authenticated
  using (true);
