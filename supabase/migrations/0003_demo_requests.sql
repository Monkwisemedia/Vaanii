-- Vaanii — demo request leads (the homepage "get a live demo" form)
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run.

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  business_type text,
  channel text not null check (channel in ('whatsapp', 'instagram', 'both')),
  phone text not null,
  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;

-- No select/insert policy for regular users on purpose — this is a public
-- lead form with no login, so all writes go through the service-role
-- client in app/api/demo-request/route.ts, never directly from the browser.
