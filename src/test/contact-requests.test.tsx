import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CTA } from '@/site/components/Design';
import { InquiryForm } from '@/site/pages/Contact';
import BookingSection from '@/site/components/BookingSection';
import { contactConfig } from '@/site/content';

vi.mock('@tanstack/react-router', () => ({ Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => <a href={to} {...props}>{children}</a> }));
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('Contact requests', () => {
  it('routes shared growth calls to Contact', () => {
    render(<CTA>Let’s Talk Growth</CTA>);
    expect(screen.getByRole('link', { name: /Let’s Talk Growth/ })).toHaveAttribute('href', '/contact');
  });

  it('addresses inquiries to the requested inbox', () => {
    expect(contactConfig.email).toBe('info@thehexasystems.com');
    const { container } = render(<InquiryForm />);
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Request Test' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'request@example.com' } });
    const form = container.querySelector('form');
    if (!form) throw new Error('Missing inquiry form');
    fireEvent.submit(form);
    expect(screen.getByRole('link', { name: /Open Email Draft/ }).getAttribute('href')).toMatch(/^mailto:info@thehexasystems\.com\?/);
  });

  it('keeps requested date, time and timezone in the call request to the same inbox', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 29, 12));
    const { container } = render(<BookingSection embedded />);
    expect(screen.getByRole('gridcell', { name: 'Wed Oct 28 2026' })).toBeDisabled();
    fireEvent.click(screen.getByRole('gridcell', { name: 'Fri Oct 30 2026' }));
    fireEvent.click(screen.getAllByRole('button', { name: /\d+:00 [AP]M/ })[0] as HTMLElement);
    fireEvent.change(screen.getByLabelText('YOUR NAME *'), { target: { value: 'Request Test' } });
    fireEvent.change(screen.getByLabelText('EMAIL ADDRESS *'), { target: { value: 'request@example.com' } });
    fireEvent.change(screen.getByLabelText('TIME ZONE *'), { target: { value: 'Karachi (UTC+5)' } });
    const form = container.querySelector('form');
    if (!form) throw new Error('Missing call form');
    fireEvent.submit(form);
    const href = screen.getByRole('link', { name: /Open Email Draft/ }).getAttribute('href') ?? '';
    expect(href).toMatch(/^mailto:info@thehexasystems\.com\?/);
    expect(decodeURIComponent(href)).toContain('OCT 30, 2026');
    expect(decodeURIComponent(href)).toContain('Karachi (UTC+5)');
  });
});