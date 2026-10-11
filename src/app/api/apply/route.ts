import { applySchema, handleForm } from '@/lib/forms';
export const dynamic = 'force-dynamic';
export const POST = (req: Request) => handleForm(req, applySchema, 'startup_applications');
