// Fallback delivery for contact + call-request forms, used ONLY when the
// Resend server function reports `email_not_configured` (no RESEND_API_KEY
// in Vercel env) or the server call itself fails.
//
// FormSubmit (formsubmit.co) needs no API key and no Vercel env var: it
// delivers to the inbox named in the endpoint URL. The trade-off, and the
// reason Resend stays primary, is activation: the FIRST submission to a new
// address triggers an activation email to that inbox, and submissions are
// only delivered after the owner clicks the activation link in it. So after
// this code goes live, one test submission must be sent and the activation
// link in thehexasystems@gmail.com clicked, then a second test submission
// confirms end-to-end delivery.
//
// Spam handling: _captcha is off (the site already validates length/format
// and the server function validates before this fallback is reached), and a
// honeypot field (_honey) is included; FormSubmit also rate-limits per form.

import { contactConfig } from './content';
import type { CallRequestPayload, InquiryPayload } from './email-template';

export async function sendViaFormSubmit(
  payload: InquiryPayload | CallRequestPayload,
): Promise<boolean> {
  const subject =
    payload.kind === 'call-request'
      ? 'Strategy call request — Hexa Systems'
      : 'Business inquiry — Hexa Systems';
  const fields: Record<string, string> = {
    name: payload.name,
    email: payload.email,
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _honey: '',
  };
  if (payload.kind === 'call-request' && 'date' in payload) {
    fields['Requested call'] = `${payload.date} at ${payload.time}`;
    fields['Time zone'] = payload.timezone;
  } else {
    const inquiry = payload as InquiryPayload;
    fields['Business'] = inquiry.company || 'Not specified';
    fields['Interest'] = inquiry.service || 'Not specified';
    fields['message'] = inquiry.message || '';
  }
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${contactConfig.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(fields),
    });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => null)) as { success?: unknown } | null;
    return data?.success === true || data?.success === 'true';
  } catch {
    return false;
  }
}
