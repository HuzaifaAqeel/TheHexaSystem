// Real booking via Calendly (inline widget). The visitor picks a time and
// books inside Calendly itself — the site takes no booking details and
// fakes no availability. If the Calendly script cannot load, the fallback
// link sends the visitor to the same Calendly event page in a new tab.
import { useEffect, useRef, useState } from 'react';
import { contactConfig } from '../content';

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
let scriptPromise: Promise<void> | null = null;

function loadWidgetScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly widget failed to load'));
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export default function CalendlyEmbed() {
  const url = contactConfig.bookingUrl;
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadWidgetScript()
      .then(() => {
        if (cancelled) return;
        if (hostRef.current && window.Calendly) {
          window.Calendly.initInlineWidget({ url, parentElement: hostRef.current });
        } else {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="hx-calendly">
      <div ref={hostRef} className="calendly-inline-widget" data-url={url} style={{ minWidth: '320px', height: '700px' }} />
      <p className="hx-calendly-fallback">
        {failed
          ? 'The booking calendar could not be loaded here. '
          : 'Prefer a new tab? '}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Open the booking calendar in Calendly ↗
        </a>
      </p>
    </div>
  );
}
