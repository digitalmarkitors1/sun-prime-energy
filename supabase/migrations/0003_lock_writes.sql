-- Security hardening: lock ALL Sunprime CMS writes to a single admin user.
-- Even if another account somehow exists in the shared project, only this
-- user id (Ram's /admin login) can insert/update/delete Sunprime content.
-- Public read stays open (it's a public website).

do $$
declare
  t   text;
  uid text := '8b3c9340-13cc-45c7-9cad-bf0363a455cd';  -- ramsarora1@gmail.com
begin
  foreach t in array array[
    'sunprime_content_singletons',
    'sunprime_landing_pages',
    'sunprime_seo_meta',
    'sunprime_blog_posts'
  ] loop
    -- drop the broad "any authenticated user" write policies
    execute format('drop policy if exists "sunprime_auth_write"  on public.%I', t);
    execute format('drop policy if exists "sunprime_auth_update" on public.%I', t);
    execute format('drop policy if exists "sunprime_auth_delete" on public.%I', t);
    -- recreate them scoped to the admin uid only
    execute format('create policy "sunprime_admin_write"  on public.%I for insert to authenticated with check (auth.uid() = %L)', t, uid);
    execute format('create policy "sunprime_admin_update" on public.%I for update to authenticated using (auth.uid() = %L) with check (auth.uid() = %L)', t, uid, uid);
    execute format('create policy "sunprime_admin_delete" on public.%I for delete to authenticated using (auth.uid() = %L)', t, uid);
  end loop;
end $$;

-- Storage: lock sunprime-media uploads/edits/deletes to the same admin uid
drop policy if exists "sunprime_media_auth_insert" on storage.objects;
drop policy if exists "sunprime_media_auth_update" on storage.objects;
drop policy if exists "sunprime_media_auth_delete" on storage.objects;

create policy "sunprime_media_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'sunprime-media' and auth.uid() = '8b3c9340-13cc-45c7-9cad-bf0363a455cd');
create policy "sunprime_media_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'sunprime-media' and auth.uid() = '8b3c9340-13cc-45c7-9cad-bf0363a455cd');
create policy "sunprime_media_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'sunprime-media' and auth.uid() = '8b3c9340-13cc-45c7-9cad-bf0363a455cd');
