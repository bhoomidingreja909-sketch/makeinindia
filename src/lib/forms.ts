import { z } from 'zod';

const text = (max: number) => z.string().trim().max(max);

export const contactSchema = z.object({
  name: text(100).min(2, 'Please enter your name'),
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(200),
  phone: text(30).optional(),
  organisation: text(150).optional(),
  category: z.enum(['investment', 'policy', 'startup', 'media', 'feedback', 'other']),
  sector_slug: text(60).optional(),
  message: text(2000).min(10, 'Please write at least 10 characters'),
  consent: z.literal(true, { message: 'Please tick the box to continue' }),
});

export const applySchema = z.object({
  founder_name: text(100).min(2, 'Please enter the founder name'),
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(200),
  startup_name: text(150).min(2, 'Please enter the startup name'),
  sector_slug: text(60).min(2),
  stage: z.enum(['idea', 'prototype', 'early-revenue', 'scaling']),
  pitch: text(2000).min(20, 'Please write at least 20 characters'),
  consent: z.literal(true, { message: 'Please tick the box to continue' }),
});

/** Build a mailto: link so a visitor can send the message from their own mail app. */
export function toMailto(to: string, subject: string, fields: Record<string, unknown>): string {
  const body = Object.entries(fields)
    .filter(([k, v]) => v !== '' && v !== undefined && k !== 'consent')
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${String(v)}`)
    .join('\n');
  return `mailto:${encodeURIComponent(to).replace(/%40/g, '@')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
