# testing-google-cloud

Static Google OAuth sign-in using Supabase Auth.

## Configure Supabase

1. In Supabase, open **Project Settings > API** and copy the **Project URL** and
   **anon public** key into `config.js`.
2. In **Authentication > Providers > Google**, enable Google and enter the
   OAuth client ID and client secret from Google Cloud.
3. In **Authentication > URL Configuration**, add the URL where this site is
   hosted to **Site URL** and **Redirect URLs**. For local testing, add the
   exact origin/path, for example:
   `http://localhost:5500/testing-google-cloud/index.html`.
4. In Google Cloud, add the Supabase Google callback URL shown in the Supabase
   Google provider settings to the OAuth client's **Authorized redirect URIs**.

The browser uses only the Supabase anon key. Do not put a Supabase service-role
key in `config.js`.
