// Server-side delivery for contact + call-request forms.
// Sends a styled notification email TO the Hexa inbox (thehexasystems@gmail.com)
// via the Resend HTTP API. No other provider is wired in.
//
// Required Vercel environment variable (set in the Vercel project dashboard,
// never committed to the repo):
//   RESEND_API_KEY — a Resend API key. Without it, delivery is NOT attempted
//   and the caller gets { ok: false, reason: 'email_not_configured' }, so the
//   UI can fall back to an email draft and must never claim a message was sent.
//
// Optional:
//   EMAIL_FROM — the sender Resend is allowed to send from. Default is
//   Resend's free-tier onboarding address. To send from your own domain,
//   verify thehexasystems.com in Resend first, then set this to e.g.
//   "Hexa Systems <hello@thehexasystems.com>". Resend cannot send FROM a
//   Gmail address, so the Gmail inbox is the RECIPIENT, not the sender.
//   The visitor's address is set as reply-to, so replying answers them.
//
// A call request is a REQUEST, not a confirmed booking: the on-site calendar
// shows illustrative slots, not real availability, so the email says so.

import { createServerFn } from '@tanstack/react-start';
import { buildNotificationEmail, type CallRequestPayload, type InquiryPayload } from './email-template';
import { contactConfig } from './content';

export type ContactRequestInput = InquiryPayload | CallRequestPayload;

function env(name: string): string | undefined {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.[name];
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export const sendContactRequest = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: ContactRequestInput }) => {
    const name = clean(data.name, 120);
    const email = clean(data.email, 254);
    if (!name || !validEmail(email)) {
      return { ok: false, reason: 'invalid_input' as const };
    }

    let payload: ContactRequestInput;
    if (data.kind === 'call-request' && 'date' in data) {
      const timezone = clean(data.timezone, 100);
      const date = clean(data.date, 60);
      const time = clean(data.time, 20);
      if (!timezone || !date || !time) return { ok: false, reason: 'invalid_input' as const };
      payload = { kind: 'call-request', name, email, timezone, date, time };
    } else {
      const message = clean((data as InquiryPayload).message, 4000);
      if (message.length < 10) return { ok: false, reason: 'invalid_input' as const };
      payload = {
        kind: data.kind === 'call-request' ? 'call-request' : 'inquiry',
        name,
        email,
        company: clean((data as InquiryPayload).company, 160),
        service: clean((data as InquiryPayload).service, 120),
        message,
      };
    }

    const apiKey = env('RESEND_API_KEY');
    if (!apiKey) {
      return { ok: false, reason: 'email_not_configured' as const };
    }

    const { subject, html, text } = buildNotificationEmail(payload);
    const from = env('EMAIL_FROM') || 'Hexa Systems <onboarding@resend.dev>';
    const to = contactConfig.email;

    let res: Response;
    try {
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], reply_to: email, subject, html, text }),
      });
    } catch (error) {
      console.error('Contact email delivery failed', error);
      return { ok: false, reason: 'delivery_failed' as const };
    }
    if (!res.ok) {
      console.error('Contact email delivery failed', res.status, await res.text().catch(() => ''));
      return { ok: false, reason: 'delivery_failed' as const };
    }
    return { ok: true as const };
  },
);
