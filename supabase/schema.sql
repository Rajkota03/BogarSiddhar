-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. User Roles Table (to manage Admin vs Editor)
create table public.user_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('admin', 'editor')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- 2. Articles / Teachings Table
create table public.articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  summary text,
  content jsonb, -- For Tiptap JSON content
  cover_image text,
  status text check (status in ('draft', 'published', 'archived')) default 'draft',
  published_at timestamp with time zone,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Pages Table
create table public.pages (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  seo_title text,
  seo_description text,
  content_blocks jsonb, -- Flexible JSON for hero, text blocks, etc.
  status text check (status in ('draft', 'published')) default 'draft',
  updated_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Gallery Items
create table public.gallery_items (
  id uuid primary key default uuid_generate_v4(),
  image_path text not null,
  caption text,
  location text,
  tags text[],
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Quotes
create table public.quotes (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  source text,
  tags text[],
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Sacred Places
create table public.sacred_places (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  latitude double precision,
  longitude double precision,
  image_path text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
alter table public.user_roles enable row level security;
alter table public.articles enable row level security;
alter table public.pages enable row level security;
alter table public.gallery_items enable row level security;
alter table public.quotes enable row level security;
alter table public.sacred_places enable row level security;

-- Helper function to check if user has role
create or replace function public.has_role(role_name text)
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
    and role = role_name
  );
end;
$$ language plpgsql security definer;

-- User Roles Policies
create policy "Admins can manage roles" on public.user_roles
  for all using (public.has_role('admin'));

create policy "Users can read own role" on public.user_roles
  for select using (auth.uid() = user_id);

-- Articles Policies
create policy "Public read published articles" on public.articles
  for select using (status = 'published');

create policy "Admins/Editors manage articles" on public.articles
  for all using (public.has_role('admin') or public.has_role('editor'));

-- Pages Policies (Same logic)
create policy "Public read published pages" on public.pages
  for select using (status = 'published');

create policy "Admins/Editors manage pages" on public.pages
  for all using (public.has_role('admin') or public.has_role('editor'));

-- Gallery, Quotes, Places Policies (Public read all, Admin/Editor write)
create policy "Public read gallery" on public.gallery_items for select using (true);
create policy "Staff manage gallery" on public.gallery_items for all using (public.has_role('admin') or public.has_role('editor'));

create policy "Public read quotes" on public.quotes for select using (true);
create policy "Staff manage quotes" on public.quotes for all using (public.has_role('admin') or public.has_role('editor'));

create policy "Public read places" on public.sacred_places for select using (true);
create policy "Staff manage places" on public.sacred_places for all using (public.has_role('admin') or public.has_role('editor'));

-- Storage Policies (You need to create 'media' bucket in Supabase Dashboard)
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);

-- Policy to allow authenticated reads (and public reads if bucket is public)
-- Policy to allow Staff to upload/delete

-- 7. Siddhars Table
create table public.siddhars (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  title text,
  bio text,
  image_path text,
  expertise text[],
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Siddhars Policies
alter table public.siddhars enable row level security;

create policy "Public read siddhars" on public.siddhars for select using (true);
create policy "Staff manage siddhars" on public.siddhars for all using (public.has_role('admin') or public.has_role('editor'));

