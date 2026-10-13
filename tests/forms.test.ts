import { describe, expect, it } from 'vitest';
import { contactSchema, applySchema, toMailto } from '@/lib/forms';

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
});

describe('applySchema', () => {
  it('validates stage and pitch', () => {
    const base = { founder_name: 'Ravi', email: 'r@x.in', startup_name: 'RoboWorks', sector_slug: 'capital-goods', stage: 'prototype', pitch: 'We build low-cost CNC machines for MSMEs.', consent: true };
    expect(applySchema.safeParse(base).success).toBe(true);
    expect(applySchema.safeParse({ ...base, stage: 'unicorn' }).success).toBe(false);
  });
});

describe('toMailto', () => {
  it('builds an encoded mailto link and leaves out consent and empty fields', () => {
    const u = toMailto('team@example.com', 'Hello & welcome', { name: 'Asha', phone: '', consent: true, sector_slug: 'esdm' });
    expect(u.startsWith('mailto:team@example.com?subject=Hello%20%26%20welcome')).toBe(true);
    const body = decodeURIComponent(u.split('body=')[1]);
    expect(body).toBe('name: Asha\nsector slug: esdm');
  });
});
