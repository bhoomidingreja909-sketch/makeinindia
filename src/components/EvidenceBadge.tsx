import { EVIDENCE_TEXT, type Evidence } from '@/data/content';

export default function EvidenceBadge({ kind }: { kind: Evidence }) {
  const t = EVIDENCE_TEXT[kind];
  return <span className={`badge ${kind}`} title={t.hint}>{t.label}</span>;
}
