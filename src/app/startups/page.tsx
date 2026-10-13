import type { Metadata } from 'next';
import StoryGrid from '@/components/StoryGrid';
import QueryForm from '@/components/QueryForm';

export const metadata: Metadata = { title: 'Startup stories', description: 'Startups building in India, each story linked to its sources.' };

export default function Startups() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">Startup stories</span>
        <h1>Built in India. Sourced line by line.</h1>
        <p className="lede">Every line comes from the linked sources. Stories marked <b>Draft — verify</b> are candidates still being checked by the author; they show the format and are not confirmed facts.</p>
      </div></div>
      <div className="wrap block"><StoryGrid /></div>
      <section className="wrap block">
        <span className="eyebrow">Your turn</span>
        <h2>Building something in India?</h2>
        <p className="lede">Tell us about it. This is a demonstration form: nothing is stored or published automatically.</p>
        <QueryForm mode="apply" />
      </section>
    </>
  );
}
