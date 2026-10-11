'use client';
import { PrefsProvider } from './Prefs';
export default function Providers({ children }: { children: React.ReactNode }) {
  return <PrefsProvider>{children}</PrefsProvider>;
}
