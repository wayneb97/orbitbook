
-- Supabase schema for OrbitBook

create table businesses (
  id uuid default uuid_generate_v4() primary key,
  name text,
  slug text unique,
  created_at timestamp default now()
);

create table slots (
  id uuid default uuid_generate_v4() primary key,
  business_slug text,
  date date,
  time text,
  capacity integer,
  created_at timestamp default now()
);

create table tickets (
  id uuid default uuid_generate_v4() primary key,
  business_slug text,
  name text,
  price numeric,
  created_at timestamp default now()
);

create table bookings (
  id uuid default uuid_generate_v4() primary key,
  business_slug text,
  slot_id uuid,
  name text,
  email text,
  tickets jsonb,
  created_at timestamp default now()
);
