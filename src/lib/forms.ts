import { z } from 'zod';
import { NextResponse } from 'next/server';

const text = (max: number) => z.string().trim().max(max);

export const contactSchema = z.object({
  name: text(100).min(2),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: text(30).optional().or(z.literal('')),
  organisation: text(150).optional().or(z.literal('')),
  category: z.enum(['investment', 'policy', 'startup', 'media', 'feedback', 'other']),
  sector_slug: text(60).optional().or(z.literal('')),
  message: text(2000).min(10),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // honeypot: real users leave it empty
});

export const applySchema = z.object({
  founder_name: text(100).min(2),
  email: z.string().trim().toLowerCase().email().max(200),
  startup_name: text(150).min(2),
  sector_slug: text(60).min(2),
  stage: z.enum(['idea', 'prototype', 'early-revenue', 'scaling']),
  pitch: text(2000).min(20),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});

// Best-effort per-instance limiter (5 submissions / hour / IP). Pair with a CDN/WAF rule in production.
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, now = Date.now(), limit = 5, windowMs = 3_600_000): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

export function clientIp(req: Request): string {
  return req.headers.get('x-nf-client-connection-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

export async function insertRow(table: string, row: Record<string, unknown>): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(8_000),
  });
  return res.ok;
}

export async function handleForm<T extends { website?: string; consent: true }>(
  req: Request,
  schema: z.ZodType<T>,
  table: string,
) {
  if (rateLimited(clientIp(req))) return NextResponse.json({ ok: false, message: 'Too many submissions. Please try again later.' }, { status: 429 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Please check the form fields.', fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { website: _hp, consent: _c, ...row } = parsed.data;
  void _hp; void _c;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Never pretend a message was saved when storage is not configured.
    console.error(`[forms] Supabase is not configured; ${table} submission was not stored.`);
    return NextResponse.json({ ok: false, message: 'Our form service is not available right now. Please try again later.' }, { status: 503 });
  }
  try {
    const ok = await insertRow(table, row);
    if (!ok) return NextResponse.json({ ok: false, message: 'We could not save your message. Please try again.' }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, message: 'We could not save your message. Please try again.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, message: 'Thank you — your submission has been received.' });
}
