-- Vaanii — initial schema
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run.

-- One row per signed-up user, kept in sync with auth.users automatically.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  business_name text,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are viewable by owner" on public.profiles;
create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles are editable by owner" on public.profiles;
create policy "profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, business_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'business_name',
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Subscriptions land here once Razorpay billing is wired up.
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tier text not null check (tier in ('starter', 'growth', 'scale')),
  interval text not null check (interval in ('monthly', 'yearly')),
  status text not null default 'pending' check (
    status in ('pending', 'active', 'past_due', 'cancelled')
  ),
  razorpay_subscription_id text unique,
  razorpay_plan_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions are viewable by owner" on public.subscriptions;
create policy "subscriptions are viewable by owner"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only server code (using the service role key) writes subscriptions —
-- no insert/update policy for regular users, on purpose.
