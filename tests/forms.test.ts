import { describe, expect, it } from 'vitest';
import { contactSchema, applySchema, rateLimited } from '@/lib/forms';

const valid = { name: 'Asha Rao', email: 'ASHA@Example.com', category: 'investment', message: 'I would like to know more about FDI.', consent: true };

describe('contactSchema', () => {
  it('accepts a valid query and lower-cases email', () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success && r.data.email).toBe('asha@example.com');
  });
  it('requires consent, a real email and a message', () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: 'hi' }).success).toBe(false);
  });
  it('rejects bots that fill the honeypot', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false);
  });
});

describe('applySchema', () => {
  it('validates stage and pitch', () => {
    const base = { founder_name: 'Ravi', email: 'r@x.in', startup_name: 'RoboWorks', sector_slug: 'capital-goods', stage: 'prototype', pitch: 'We build low-cost CNC machines for MSMEs.', consent: true };
    expect(applySchema.safeParse(base).success).toBe(true);
    expect(applySchema.safeParse({ ...base, stage: 'unicorn' }).success).toBe(false);
  });
});

describe('rateLimited', () => {
  it('blocks the 6th submission within an hour', () => {
    const t = 1_000_000;
    const results = Array.from({ length: 6 }, (_, i) => rateLimited('1.2.3.4', t + i));
    expect(results).toEqual([false, false, false, false, false, true]);
    expect(rateLimited('1.2.3.4', t + 3_700_000)).toBe(false);
  });
});

import { supabaseConfig, supabaseHeaders } from '@/lib/supabase';
describe('supabase config', () => {
  it('sends new sb_secret_ keys in apikey only, legacy JWTs in both', () => {
    expect(supabaseHeaders('sb_secret_abc')).not.toHaveProperty('Authorization');
    expect(supabaseHeaders('sb_secret_abc').apikey).toBe('sb_secret_abc');
    expect(supabaseHeaders('eyJhbGciOi.x.y').Authorization).toBe('Bearer eyJhbGciOi.x.y');
  });
  it('reads either env naming and trims trailing slashes; null when unset', () => {
    expect(supabaseConfig({ NEXT_PUBLIC_SUPABASE_URL: 'https://x.supabase.co/', SUPABASE_SECRET_KEY: 'k' })).toEqual({ url: 'https://x.supabase.co', key: 'k' });
    expect(supabaseConfig({ SUPABASE_URL: 'https://x.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'k2' })?.key).toBe('k2');
    expect(supabaseConfig({})).toBeNull();
  });
});
