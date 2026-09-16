-- Vaanii — add channel (whatsapp / instagram / both) to subscriptions
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run.

alter table public.subscriptions
  add column if not exists channel text not null default 'whatsapp'
  check (channel in ('whatsapp', 'instagram', 'both'));
