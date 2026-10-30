// Styled notification-email templates for Hexa Systems form submissions.
// Pure string builders only — no secrets, no network calls. The server
// function in contact-request.server.ts does the sending.
// Design: Hexa green gradient header, lime accent, clean field table.
// Every field value is HTML-escaped; the visitor's message is rendered
// as plain text with line breaks, never as raw HTML.

export type InquiryPayload = {
  kind: 'inquiry' | 'call-request';
  name: string;
  email: string;
  company?: string;
  service?: string;
  message?: string;
};

export type CallRequestPayload = {
  kind: 'call-request';
  name: string;
  email: string;
  timezone: string;
  date: string; // e.g. "FRI, OCT 30, 2026"
  time: string; // e.g. "10:00 AM"
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:10px 14px;border-bottom:1px solid #e8e8e0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#5a665f;width:160px;">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e8e8e0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#101613;"><strong>${escapeHtml(value)}</strong></td></tr>`;
}

function wrap(title: string, intro: string, rows: string, message?: string): { html: string; text: string } {
  const messageBlock = message
    ? `<p style="margin:24px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:1px;color:#5a665f;"><strong>MESSAGE</strong></p><p style="margin:0;padding:16px;background:#f6f5ef;border-radius:10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#101613;white-space:pre-wrap;">${escapeHtml(message)}</p>`
    : '';
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#f6f5ef;padding:24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#07281a 0%,#0e5a2e 55%,#119936 100%);padding:28px 32px;">
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;color:#dafe6a;"><strong>HEXA SYSTEMS</strong></p>
<h1 style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;">${escapeHtml(title)}</h1>
</td></tr>
<tr><td style="padding:28px 32px;">
<p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#333333;">${escapeHtml(intro)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e0;border-radius:12px;overflow:hidden;">${rows}</table>
${messageBlock}
<p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#5a665f;">Reply to this email to answer the visitor directly. This notification was sent from the contact form on thehexasystems.com.</p>
</td></tr>
<tr><td style="padding:16px 32px;background:#07281a;">
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#ffffff;">Hexa Systems &middot; We Turn Ad Spend Into Booked Jobs &middot; thehexasystems.com</p>
</td></tr>
</table></body></html>`;
  return { html, text: '' };
}

export function buildNotificationEmail(
  payload: InquiryPayload | CallRequestPayload,
): { subject: string; html: string; text: string } {
  if (payload.kind === 'call-request' && 'date' in payload) {
    const rows = row('Name', payload.name) + row('Email', payload.email) + row('Time zone', payload.timezone) + row('Requested call', `${payload.date} at ${payload.time}`);
    const { html } = wrap(
      'New strategy call request',
      `${payload.name} requested a free strategy call. This is a request, not a confirmed booking — confirm the time by replying to this email.`,
      rows,
    );
    const text = `New strategy call request — Hexa Systems\n\nName: ${payload.name}\nEmail: ${payload.email}\nTime zone: ${payload.timezone}\nRequested call: ${payload.date} at ${payload.time}\n\nThis is a request, not a confirmed booking. Confirm the time by replying to the visitor.`;
    return { subject: `Strategy call request — ${payload.name} — ${payload.date} at ${payload.time}`, html, text };
  }
  const inquiry = payload as InquiryPayload;
  const rows =
    row('Name', inquiry.name) +
    row('Email', inquiry.email) +
    row('Business', inquiry.company || 'Not specified') +
    row('Interest', inquiry.service || 'Not specified');
  const { html } = wrap(
    inquiry.kind === 'call-request' ? 'New strategy call request' : 'New business inquiry',
    inquiry.kind === 'call-request'
      ? `${inquiry.name} asked for a strategy call. Reply to this email to agree a time.`
      : `${inquiry.name} sent a new inquiry from the Hexa Systems contact form.`,
    rows,
    inquiry.message,
  );
  const text = `${inquiry.kind === 'call-request' ? 'New strategy call request' : 'New business inquiry'} — Hexa Systems\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nBusiness: ${inquiry.company || 'Not specified'}\nInterest: ${inquiry.service || 'Not specified'}\n\n${inquiry.message || ''}`;
  return {
    subject: `${inquiry.kind === 'call-request' ? 'Strategy call request' : 'Business inquiry'} — ${inquiry.name}`,
    html,
    text,
  };
}
