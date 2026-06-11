-- SiteCtrl MVP Database Schema
create table if not exists websites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  website_name text not null,
  website_url text not null,
  platform text default 'unknown',
  health_score int default 0,
  created_at timestamptz default now()
);

create table if not exists assets (
  id uuid primary key default gen_random_uuid(),
  website_id uuid references websites(id) on delete cascade,
  asset_type text not null, -- domain, hosting, ssl, plugin, app, license
  name text not null,
  provider text,
  billing_cycle text default 'yearly',
  expiry_date date,
  reminder_days int[] default array[30,15,7,1],
  created_at timestamptz default now()
);

create table if not exists uptime_logs (
  id uuid primary key default gen_random_uuid(),
  website_id uuid references websites(id) on delete cascade,
  status text not null,
  response_time_ms int,
  checked_at timestamptz default now()
);

create table if not exists pagespeed_reports (
  id uuid primary key default gen_random_uuid(),
  website_id uuid references websites(id) on delete cascade,
  mobile_score int,
  desktop_score int,
  lcp text,
  cls text,
  inp text,
  created_at timestamptz default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  website_id uuid references websites(id) on delete cascade,
  alert_type text not null,
  severity text default 'medium',
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);
