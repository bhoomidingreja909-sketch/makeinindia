'use client';
import { useState } from 'react';
import { SECTORS } from '@/data/sectors';
import { CONTACT_EMAIL } from '@/data/site';
import { applySchema, contactSchema, toMailto } from '@/lib/forms';

type Mode = 'contact' | 'apply';
type Result =
  | { kind: 'idle' }
  | { kind: 'err'; fields: Record<string, string> }
  | { kind: 'ok'; data: Record<string, unknown>; subject: string };

export default function QueryForm({ mode, defaultCategory = 'investment' }: { mode: Mode; defaultCategory?: string }) {
  const [res, setRes] = useState<Result>({ kind: 'idle' });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Honeypot: a real visitor leaves this empty. Pretend success to bots without doing anything.
    if (raw.website) { setRes({ kind: 'ok', data: {}, subject: '' }); return; }
    const payload = { ...raw, consent: raw.consent === 'on' };
    delete (payload as Record<string, unknown>).website;
    const parsed = (mode === 'contact' ? contactSchema : applySchema).safeParse(payload);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const i of parsed.error.issues) fields[String(i.path[0])] ??= i.message;
      setRes({ kind: 'err', fields });
      return;
    }
    const subject = mode === 'contact' ? `Make in India redesign — ${String((parsed.data as { category: string }).category)} query` : 'Startup submission — Make in India redesign';
    setRes({ kind: 'ok', data: parsed.data as Record<string, unknown>, subject });
  }

  const fe = (k: string) => (res.kind === 'err' && res.fields[k]) || null;

  if (res.kind === 'ok') {
    return (
      <div className="ok" role="status">
        <b>Details checked.</b>{' '}
        {CONTACT_EMAIL ? (
          <>
            <p>Your message is ready. Press the button to open it as an email draft, then send it from your own mail app.</p>
            <a className="btn" href={toMailto(CONTACT_EMAIL, res.subject, res.data)}>Open email draft</a>
          </>
        ) : (
          <p>This is an academic demonstration: <b>nothing was sent or stored</b>. On a live site this form would deliver your message to the project team.</p>
        )}
        <p><button className="btn ghost" onClick={() => setRes({ kind: 'idle' })}>Fill the form again</button></p>
      </div>
    );
  }

  return (
    <form className="stack" onSubmit={onSubmit} noValidate>
      <p className="notice info" role="note">Academic project: this form is a demonstration. It does not reach DPIIT, Invest India or any ministry, and nothing you type is stored on this website.</p>
      {mode === 'contact' ? (
        <>
          <label>Your name<input name="name" required autoComplete="name" />{fe('name') && <span className="err">{fe('name')}</span>}</label>
          <label>Email<input name="email" type="email" required autoComplete="email" />{fe('email') && <span className="err">{fe('email')}</span>}</label>
          <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>Organisation (optional)<input name="organisation" autoComplete="organization" /></label>
          <label>Topic
            <select name="category" defaultValue={defaultCategory}>
              <option value="investment">Investing in India</option><option value="policy">Policy (IPR / FDI)</option>
              <option value="startup">Startups</option><option value="media">Media</option><option value="feedback">Feedback / accessibility</option><option value="other">Other</option>
            </select>
          </label>
          <label>Sector of interest (optional)
            <select name="sector_slug" defaultValue=""><option value="">Not sure / any</option>{SECTORS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}</select>
          </label>
          <label>Message<textarea name="message" required minLength={10} />{fe('message') && <span className="err">{fe('message')}</span>}</label>
        </>
      ) : (
        <>
          <label>Founder name<input name="founder_name" required />{fe('founder_name') && <span className="err">{fe('founder_name')}</span>}</label>
          <label>Email<input name="email" type="email" required />{fe('email') && <span className="err">{fe('email')}</span>}</label>
          <label>Startup name<input name="startup_name" required />{fe('startup_name') && <span className="err">{fe('startup_name')}</span>}</label>
          <label>Sector
            <select name="sector_slug" defaultValue="capital-goods">{SECTORS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}</select>
          </label>
          <label>Stage
            <select name="stage" defaultValue="prototype"><option value="idea">Idea</option><option value="prototype">Prototype</option><option value="early-revenue">Early revenue</option><option value="scaling">Scaling</option></select>
          </label>
          <label>What are you building?<textarea name="pitch" required minLength={20} />{fe('pitch') && <span className="err">{fe('pitch')}</span>}</label>
        </>
      )}
      <div className="hp" aria-hidden><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="check"><input type="checkbox" name="consent" /> I understand this is a demonstration form.</label>
      {fe('consent') && <span className="err">{fe('consent')}</span>}
      <button className="btn">{mode === 'contact' ? 'Check my message' : 'Check my submission'}</button>
    </form>
  );
}
