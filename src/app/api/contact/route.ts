import { contactSchema, handleForm } from '@/lib/forms';
export const dynamic = 'force-dynamic';
export const POST = (req: Request) => handleForm(req, contactSchema, 'contact_queries');
