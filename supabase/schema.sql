-- Perfis: estende auth.users, distingue admin (Júlia) de paciente
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'patient')) default 'patient',
  full_name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  icon text,
  variant text,
  sort_order int not null default 0
);
alter table public.categories enable row level security;

create table public.guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_slug text references public.categories(slug) on delete set null,
  title text not null,
  subtitle text,
  image text,
  is_new boolean not null default false,
  is_featured boolean not null default false,
  read_minutes int,
  updated_at date,
  content jsonb not null default '{}'::jsonb,
  sort_order int not null default 0
);
alter table public.guides enable row level security;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  guide_slug text references public.guides(slug) on delete cascade,
  name text not null,
  brand text,
  image text,
  is_pick boolean not null default false,
  nutrition jsonb not null default '{}'::jsonb,
  note text,
  usage_text text,
  sort_order int not null default 0
);
alter table public.products enable row level security;

create table public.favorites (
  patient_id uuid not null references public.profiles(id) on delete cascade,
  guide_id uuid not null references public.guides(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (patient_id, guide_id)
);
alter table public.favorites enable row level security;

-- Cria automaticamente um perfil (role padrão: patient) sempre que uma conta é criada no Auth
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Função auxiliar: o usuário logado é admin?
create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles: cada um vê o próprio; admin vê e gerencia todos
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_select_admin" on public.profiles for select using (public.is_admin());
create policy "profiles_update_admin" on public.profiles for update using (public.is_admin());

-- categorias/guias/produtos: qualquer logado lê; só admin escreve
create policy "categories_select_auth" on public.categories for select using (auth.role() = 'authenticated');
create policy "categories_write_admin" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "guides_select_auth" on public.guides for select using (auth.role() = 'authenticated');
create policy "guides_write_admin" on public.guides for all using (public.is_admin()) with check (public.is_admin());

create policy "products_select_auth" on public.products for select using (auth.role() = 'authenticated');
create policy "products_write_admin" on public.products for all using (public.is_admin()) with check (public.is_admin());

-- favoritos: cada paciente só mexe nos próprios
create policy "favorites_owner" on public.favorites for all using (auth.uid() = patient_id) with check (auth.uid() = patient_id);

-- uso da Análise de Refeição: um registro por análise/correção, usado para limitar X por semana
-- kind: 'analysis_photo' (envio de foto), 'analysis_manual' (só gramas informadas), 'correction' (adicionar/corrigir item)
create table public.meal_analysis_usage (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'analysis_photo' check (kind in ('analysis_photo', 'analysis_manual', 'correction')),
  created_at timestamptz not null default now()
);
alter table public.meal_analysis_usage enable row level security;

create policy "meal_analysis_usage_owner" on public.meal_analysis_usage
  for all using (auth.uid() = patient_id) with check (auth.uid() = patient_id);
