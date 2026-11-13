-- Sunprime Energy Solutions — CMS backend schema
-- Runs INSIDE the shared dm-portal Supabase project. Every object is prefixed
-- `sunprime_` (tables + function + policies) and the storage bucket is
-- `sunprime-media`, so nothing here can collide with the portal's own tables.
--
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Model:
--   sunprime_content_singletons.data (key='site') = the whole `site` object (JSONB)
--   sunprime_landing_pages                        = one row per SEO landing page
--   sunprime_seo_meta                             = per-route <title>/<meta>
--   sunprime_blog_posts                           = blog articles (Markdown body)
--   storage bucket "sunprime-media"               = uploaded images
--
-- Reads are public (content is public anyway, and the static build reads with
-- the anon key). Writes require an authenticated user (the /admin login).

-- ---------------------------------------------------------------------------
-- updated_at helper (prefixed so it can't clash with a portal function)
-- ---------------------------------------------------------------------------
create or replace function public.sunprime_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 1. Global site content (single JSONB document, key = 'site')
-- ---------------------------------------------------------------------------
create table if not exists public.sunprime_content_singletons (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_sunprime_content_updated on public.sunprime_content_singletons;
create trigger trg_sunprime_content_updated
  before update on public.sunprime_content_singletons
  for each row execute function public.sunprime_set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. SEO landing pages
-- ---------------------------------------------------------------------------
create table if not exists public.sunprime_landing_pages (
  slug              text primary key,
  nav_label         text not null default '',
  eyebrow           text not null default '',
  meta_title        text not null default '',
  meta_description  text not null default '',
  h1_lead           text not null default '',
  h1_highlight      text not null default '',
  lead              text not null default '',
  intro             jsonb not null default '[]'::jsonb,
  benefits_heading  text not null default '',
  benefits          jsonb not null default '[]'::jsonb,
  sector            text,
  faq_heading       text,
  faqs              jsonb not null default '[]'::jsonb,
  related           jsonb not null default '[]'::jsonb,
  published         boolean not null default true,
  sort_order        integer not null default 0,
  updated_at        timestamptz not null default now()
);

drop trigger if exists trg_sunprime_landing_updated on public.sunprime_landing_pages;
create trigger trg_sunprime_landing_updated
  before update on public.sunprime_landing_pages
  for each row execute function public.sunprime_set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. Per-route SEO meta (standard pages)
-- ---------------------------------------------------------------------------
create table if not exists public.sunprime_seo_meta (
  path            text primary key,
  title           text not null default '',
  description     text not null default '',
  canonical       text,
  og_title        text,
  og_description  text,
  og_image        text,
  noindex         boolean not null default false,
  extra           jsonb not null default '{}'::jsonb,
  updated_at      timestamptz not null default now()
);

drop trigger if exists trg_sunprime_seo_updated on public.sunprime_seo_meta;
create trigger trg_sunprime_seo_updated
  before update on public.sunprime_seo_meta
  for each row execute function public.sunprime_set_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Blog posts (Markdown body)
-- ---------------------------------------------------------------------------
create table if not exists public.sunprime_blog_posts (
  slug             text primary key,
  title            text not null default '',
  excerpt          text not null default '',
  body             text not null default '',
  category         text not null default '',
  read_time        text not null default '',
  author           text not null default 'Sunprime Energy Solutions',
  cover_image      text not null default '',
  meta_title       text,
  meta_description text,
  og_image         text,
  published        boolean not null default true,
  featured         boolean not null default false,
  published_at     date not null default current_date,
  sort_order       integer not null default 0,
  updated_at       timestamptz not null default now()
);

create index if not exists idx_sunprime_blog_published
  on public.sunprime_blog_posts (published, published_at desc);

drop trigger if exists trg_sunprime_blog_updated on public.sunprime_blog_posts;
create trigger trg_sunprime_blog_updated
  before update on public.sunprime_blog_posts
  for each row execute function public.sunprime_set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — public read, authenticated write (all four tables)
-- ---------------------------------------------------------------------------
alter table public.sunprime_content_singletons enable row level security;
alter table public.sunprime_landing_pages      enable row level security;
alter table public.sunprime_seo_meta           enable row level security;
alter table public.sunprime_blog_posts         enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'sunprime_content_singletons',
    'sunprime_landing_pages',
    'sunprime_seo_meta',
    'sunprime_blog_posts'
  ] loop
    execute format('drop policy if exists "sunprime_public_read" on public.%I', t);
    execute format('drop policy if exists "sunprime_auth_write"  on public.%I', t);
    execute format('drop policy if exists "sunprime_auth_update" on public.%I', t);
    execute format('drop policy if exists "sunprime_auth_delete" on public.%I', t);

    execute format('create policy "sunprime_public_read" on public.%I for select using (true)', t);
    execute format('create policy "sunprime_auth_write"  on public.%I for insert to authenticated with check (true)', t);
    execute format('create policy "sunprime_auth_update" on public.%I for update to authenticated using (true) with check (true)', t);
    execute format('create policy "sunprime_auth_delete" on public.%I for delete to authenticated using (true)', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage bucket for uploaded media (public read, authenticated write)
-- Scoped to bucket_id = 'sunprime-media' so it never touches other buckets.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('sunprime-media', 'sunprime-media', true)
on conflict (id) do nothing;

drop policy if exists "sunprime_media_public_read" on storage.objects;
drop policy if exists "sunprime_media_auth_insert" on storage.objects;
drop policy if exists "sunprime_media_auth_update" on storage.objects;
drop policy if exists "sunprime_media_auth_delete" on storage.objects;

create policy "sunprime_media_public_read" on storage.objects
  for select using (bucket_id = 'sunprime-media');
create policy "sunprime_media_auth_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'sunprime-media');
create policy "sunprime_media_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'sunprime-media');
create policy "sunprime_media_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'sunprime-media');
