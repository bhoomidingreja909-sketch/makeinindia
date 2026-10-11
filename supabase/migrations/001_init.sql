-- Make in India redesign: schema + row level security.
-- Run in Supabase -> SQL editor. All writes go through server routes using the
-- service-role key (which bypasses RLS); the public/anon role gets NO access to
-- tables that hold personal data.

create table if not exists contact_queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  category text not null check (category in ('investment','policy','startup','media','other')),
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists startup_applications (
  id uuid primary key default gen_random_uuid(),
  founder_name text not null,
  email text not null,
  startup_name text not null,
  sector_slug text not null,
  stage text not null check (stage in ('idea','prototype','early-revenue','scaling')),
  pitch text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists news_cache (
  key text primary key,
  payload jsonb not null,
  fetched_at timestamptz not null default now(),
  status text not null default 'ok'
);

alter table contact_queries enable row level security;
alter table startup_applications enable row level security;
alter table news_cache enable row level security;
-- No policies on purpose: anon/authenticated roles cannot read or write these tables.
