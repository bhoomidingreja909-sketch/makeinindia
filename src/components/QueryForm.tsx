'use client';
import { useState } from 'react';
import { SECTORS } from '@/data/sectors';

type Mode = 'contact' | 'apply';
type Result = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok'; message: string } | { kind: 'err'; message: string; fields?: Record<string, string[]> };

export default function QueryForm({ mode }: { mode: Mode }) {
  const [res, setRes] = useState<Result>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form).entries());
    const payload = { ...fd, consent: fd.consent === 'on' };
    setRes({ kind: 'sending' });
    try {
      const r = await fetch(mode === 'contact' ? '/api/contact' : '/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await r.json().catch(() => ({ message: 'Unexpected response.' }));
      if (r.ok) { setRes({ kind: 'ok', message: body.message }); form.reset(); }
      else setRes({ kind: 'err', message: body.message ?? 'Something went wrong.', fields: body.fields });
    } catch {
      setRes({ kind: 'err', message: 'Network error. Please check your connection and try again.' });
    }
  }

  const fe = (k: string) => (res.kind === 'err' && res.fields?.[k]?.[0]) || null;

  if (res.kind === 'ok') return <div className="ok" role="status"><b>Received.</b> {res.message}</div>;

  return (
    <form className="stack" onSubmit={onSubmit} noValidate>
      {mode === 'contact' ? (
        <>
          <label>Your name<input name="name" required autoComplete="name" />{fe('name') && <span className="err">{fe('name')}</span>}</label>
          <label>Email<input name="email" type="email" required autoComplete="email" />{fe('email') && <span className="err">{fe('email')}</span>}</label>
          <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>Organisation (optional)<input name="organisation" autoComplete="organization" /></label>
          <label>Topic
            <select name="category" defaultValue="investment">
              <option value="investment">Investing in India</option><option value="policy">Policy (IPR / FDI)</option>
              <option value="startup">Startups</option><option value="media">Media</option><option value="other">Other</option>
            </select>
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
      <label className="check"><input type="checkbox" name="consent" required /> I agree that my details may be stored to respond to this request. They are not shared with other websites.</label>
      {res.kind === 'err' && <div className="notice" role="alert">{res.message}</div>}
      <button className="btn" disabled={res.kind === 'sending'}>{res.kind === 'sending' ? 'Sending…' : mode === 'contact' ? 'Send query' : 'Submit my startup'}</button>
    </form>
  );
}
