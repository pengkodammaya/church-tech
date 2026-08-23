import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY. Add them in Vercel (Settings > Environment Variables) or .env.local for local development."
    );
  }

  return createClient(url, key);
}

export function checkAdmin(request) {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) return true;
  return request.headers.get("x-admin-passcode") === passcode;
}
