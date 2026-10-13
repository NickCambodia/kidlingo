-- Kidlingo device sync (Supabase project "kidlingo-sync"). One row per family code; the public key can only call the
-- two functions below, never read or list the table. Data = progress only (no recordings, no family phrases).
create table if not exists public.kl_sync (
  code text primary key check (code ~ '^[2-9A-Z]{4}-[2-9A-Z]{4}-[2-9A-Z]{4}$'),
  data jsonb not null default '{}'::jsonb check (pg_column_size(data) < 300000),
  updated_at timestamptz not null default now()
);
alter table public.kl_sync enable row level security;   -- no policies: closed to anon / authenticated
revoke all on public.kl_sync from anon, authenticated;

create or replace function public.kl_get(code text) returns jsonb
language sql security definer set search_path = '' as $$
  select s.data from public.kl_sync s where s.code = kl_get.code
$$;

create or replace function public.kl_put(code text, data jsonb) returns void
language sql security definer set search_path = '' as $$
  insert into public.kl_sync (code, data, updated_at) values (kl_put.code, kl_put.data, now())
  on conflict (code) do update set data = excluded.data, updated_at = now()
$$;

revoke all on function public.kl_get(text), public.kl_put(text, jsonb) from public;
grant execute on function public.kl_get(text), public.kl_put(text, jsonb) to anon;
revoke execute on function public.kl_get(text), public.kl_put(text, jsonb) from authenticated;   -- no sign-in is used
