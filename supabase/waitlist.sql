create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx
on public.waitlist (created_at desc);
