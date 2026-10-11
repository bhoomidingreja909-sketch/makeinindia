import { FAQS, type Faq } from '@/data/content';
import { score } from './text';

/**
 * Retrieval-based FAQ assistant. It never generates text: it returns the closest
 * existing answers (with their sources), so it cannot invent facts.
 */
export function answerFaq(question: string, minScore = 3): Faq[] {
  return FAQS.map((f) => ({ f, s: score(question, f.q, f.a) }))
    .filter((x) => x.s >= minScore)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .map((x) => x.f);
}
