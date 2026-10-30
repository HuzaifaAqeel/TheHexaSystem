import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CTA } from '@/site/components/Design';
import { InquiryForm } from '@/site/pages/Contact';
import BookingSection from '@/site/components/BookingSection';
import { contactConfig } from '@/site/content';

vi.mock('@tanstack/react-router', () => ({ Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => <a href={to} {...props}>{children}</a> }));

const sendMock = vi.fn();
vi.mock('@/site/contact-request.server', () => ({ sendContactRequest: (...args: unknown[]) => sendMock(...args) }));

afterEach(() => { cleanup(); vi.useRealTimers(); sendMock.mockReset(); });

describe('Contact requests', () => {
  it('routes shared growth calls to Contact', () => {
    render(<CTA>Let’s Talk Growth</CTA>);
    expect(screen.getByRole('link', { name: /Let’s Talk Growth/ })).toHaveAttribute('href', '/contact');
  });

  it('addresses inquiries to the requested Gmail inbox', async () => {
    expect(contactConfig.email).toBe('thehexasystems@gmail.com');
    sendMock.mockResolvedValue({ ok: true });
    const { container } = render(<InquiryForm />);
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Request Test' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'request@example.com' } });
    const form = container.querySelector('form');
    if (!form) throw new Error('Missing inquiry form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByText(/Sent\. Thanks/)).toBeTruthy());
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ kind: 'inquiry', name: 'Request Test', email: 'request@example.com' }) }),
    );
  });

  it('falls back to an email draft to the same inbox when server delivery is not configured', async () => {
    sendMock.mockResolvedValue({ ok: false, reason: 'email_not_configured' });
    const { container } = render(<InquiryForm />);
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Request Test' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'request@example.com' } });
    const form = container.querySelector('form');
    if (!form) throw new Error('Missing inquiry form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByRole('link', { name: /Open Email Draft/ })).toBeTruthy());
    expect(screen.getByRole('link', { name: /Open Email Draft/ }).getAttribute('href')).toMatch(/^mailto:thehexasystems@gmail\.com\?/);
    expect(screen.getByText(/not set up on the server yet/)).toBeTruthy();
  });

  it('sends the requested date, time and timezone as a call request, not a confirmed booking', async () => {
    sendMock.mockResolvedValue({ ok: true });
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 29, 12));
    render(<BookingSection embedded />);
    expect(screen.getByRole('gridcell', { name: 'Wed Oct 28 2026' })).toBeDisabled();
    fireEvent.click(screen.getByRole('gridcell', { name: 'Fri Oct 30 2026' }));
    fireEvent.click(screen.getAllByRole('button', { name: /\d+:00 [AP]M/ })[0] as HTMLElement);
    // Switch back to real timers before the async send, so the success
    // message can be awaited (fake timers block waitFor/findBy polling).
    vi.useRealTimers();
    fireEvent.change(screen.getByLabelText('YOUR NAME *'), { target: { value: 'Request Test' } });
    fireEvent.change(screen.getByLabelText('EMAIL ADDRESS *'), { target: { value: 'request@example.com' } });
    fireEvent.change(screen.getByLabelText('TIME ZONE *'), { target: { value: 'Karachi (UTC+5)' } });
    const form = document.querySelector('form');
    if (!form) throw new Error('Missing call form');
    fireEvent.submit(form);
    await screen.findByText(/Request sent\./);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ kind: 'call-request', timezone: 'Karachi (UTC+5)' }),
      }),
    );
    const call = sendMock.mock.calls[0][0].data;
    expect(call.date).toContain('OCT 30, 2026');
    expect(screen.getByText(/Nothing is booked until we confirm/)).toBeTruthy();
  });
});
