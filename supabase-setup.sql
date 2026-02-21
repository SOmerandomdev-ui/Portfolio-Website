-- Run this SQL in your Supabase SQL Editor to create the projects table

create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  short_description text default '',
  full_description text,
  tech_stack text[] default '{}',
  category text default 'general' check (category in ('quant', 'data_science', 'general')),
  is_public boolean default true,
  is_top_project boolean default false,
  github_url text,
  demo_url text,
  image_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.projects enable row level security;

-- Public read access for public projects (used by the portfolio page)
create policy "Public projects are viewable by everyone"
  on public.projects
  for select
  using (is_public = true);

-- Authenticated users can do everything (for the admin dashboard)
create policy "Authenticated users can view all projects"
  on public.projects
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert projects"
  on public.projects
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update projects"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete projects"
  on public.projects
  for delete
  to authenticated
  using (true);
