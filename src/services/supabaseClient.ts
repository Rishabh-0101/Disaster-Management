import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// createClient() throws immediately if the URL isn't a valid http(s) URL,
// which crashes the whole app (blank white screen) before anything renders.
// Fall back to a harmless placeholder so the app still boots when the
// .env file hasn't been filled in yet — actual Supabase calls will simply
// fail gracefully (caught by try/catch in the services) until you add real keys.
const supabaseUrl = envUrl && envUrl.startsWith('http') ? envUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = envKey && envKey.length > 0 ? envKey : 'placeholder-anon-key';

if (!envUrl || !envKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file. Using placeholder values for now — Supabase calls will not work until you do.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
