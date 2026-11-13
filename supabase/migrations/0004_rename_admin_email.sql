-- Rename the CMS admin login email from ramsarora1@gmail.com to a neutral
-- shared address. Same user id (8b3c9340-…), so the write-lock RLS policies and
-- the existing password are unaffected — only the login email changes.

update auth.users
set email = 'admin@sunpesolutions.com',
    email_confirmed_at = coalesce(email_confirmed_at, now())
where id = '8b3c9340-13cc-45c7-9cad-bf0363a455cd';

update auth.identities
set identity_data = jsonb_set(identity_data, '{email}', '"admin@sunpesolutions.com"')
where user_id = '8b3c9340-13cc-45c7-9cad-bf0363a455cd'
  and provider = 'email';
