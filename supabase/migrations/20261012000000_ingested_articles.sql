-- Articles collected by the daily Invest India job: title + short excerpt + link only (credited, never full text).
create table if not exists ingested_articles (
  url text primary key,
  title text not null,
  excerpt text,
  source text not null default 'Invest India',
  published_at timestamptz not null,
  fetched_at timestamptz not null default now()
);
create index if not exists ingested_articles_published_idx on ingested_articles (published_at desc);
alter table ingested_articles enable row level security;
-- No policies on purpose: only the server (secret key) reads or writes this table.
