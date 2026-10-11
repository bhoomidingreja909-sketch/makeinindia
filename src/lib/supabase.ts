/**
 * Server-only Supabase REST config. Never import this from a client component.
 * Accepts the new "secret key" (sb_secret_…) or the legacy service_role JWT.
 */
export function supabaseConfig(env: Record<string, string | undefined> = process.env) {
  const url = (env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '';
  return url && key ? { url, key } : null;
}

/** New-style sb_secret_ keys are not JWTs and must go in `apikey` only; legacy JWT keys also go in Authorization. */
export function supabaseHeaders(key: string): Record<string, string> {
  const h: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (key.startsWith('eyJ')) h.Authorization = `Bearer ${key}`;
  return h;
}
