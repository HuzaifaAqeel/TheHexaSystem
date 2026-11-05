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
    expect(screen.getByText(/was not sent automatically/)).toBeTruthy();
  });

  it('books calls on Calendly, not through the old in-site request form', () => {
    expect(contactConfig.bookingUrl).toBe('https://calendly.com/thehexasystems/30min');
    render(<BookingSection embedded />);
    const widget = document.querySelector('.calendly-inline-widget');
    expect(widget).toBeTruthy();
    expect(widget?.getAttribute('data-url')).toBe('https://calendly.com/thehexasystems/30min');
    const link = screen.getByRole('link', { name: /Open the booking calendar in Calendly/ });
    expect(link).toHaveAttribute('href', 'https://calendly.com/thehexasystems/30min');
    expect(link).toHaveAttribute('target', '_blank');
    // No fake calendar and no booking-request form remain.
    expect(document.querySelector('form')).toBeNull();
    expect(screen.getByText(/confirmed straight away/)).toBeTruthy();
  });
});
