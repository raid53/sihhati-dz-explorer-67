-- Attach trigger so new users get profiles and roles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to public
as $$
begin
  -- Create profile for the user if it doesn't exist
  insert into public.profiles (id, user_id, display_name)
  values (gen_random_uuid(), new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email))
  on conflict (user_id) do nothing;

  -- Automatically assign admin role to the designated admin email
  if new.email = 'soad@admin.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;

  return new;
end;
$$;

-- Create trigger on auth.users if it does not already exist
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill admin role for existing admin user (if any)
insert into public.user_roles (user_id, role)
select u.id, 'admin'
from auth.users u
left join public.user_roles r on r.user_id = u.id and r.role = 'admin'
where u.email = 'soad@admin.com' and r.user_id is null;
