import { useEffect, useLayoutEffect } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
import { useLocation } from "@tanstack/react-router";

export function useScrollEffects() {
  const location = useLocation();

  useIsoLayoutEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = motionPreference.matches;
    const revealTargets = [...document.querySelectorAll<HTMLElement>(
      '.hx-site [data-reveal], .hx-site .hx-heading, .hx-site .hx-about-manifesto, .hx-site .hx-service-detail>div, .hx-site .hx-offer-inner>div, .hx-site .hx-book-summary, .hx-site .hx-contact-aside, .hx-site .hx-contact-form, .hx-site .hx-faq-intro, .hx-site .hx-faq-item, .hx-site .hx-flow-node, .hx-site .hx-dashboard:not(.is-compact), .hx-site .hx-platform, .hx-site .hx-footer-grid>* , .hx-site .hx-footer-wordmark'
    )].filter(target => !target.parentElement?.closest('[data-reveal], .hx-service-detail>div, .hx-book-summary, .hx-contact-form'));
    const animations = new Set<Animation>();
    const counterTargets = [...document.querySelectorAll<HTMLElement>("[data-count]")];

    if (reduceMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      counterTargets.forEach((target) => {
        target.textContent = target.dataset["count"] ?? "";
      });
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          target.classList.remove("hx-pending");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    // Hide before first paint, then ease in with a soft stagger: no flash of visible-then-hidden content.
    revealTargets.forEach((target) => {
      const siblings = target.parentElement ? [...target.parentElement.children].filter(node => revealTargets.includes(node as HTMLElement)) : [];
      target.style.setProperty("--hx-reveal-delay", `${Math.max(0, siblings.indexOf(target) % 4) * 80}ms`);
      target.classList.add("hx-reveal", "hx-pending");
      revealObserver.observe(target);
    });
    const stopMotion = () => {
      if (motionPreference.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    motionPreference.addEventListener('change', stopMotion);

    const animateCounter = (element: HTMLElement) => {
      const label = element.dataset["count"] ?? "0";
      const numeric = Number(label.replace(/[^0-9.]/g, ""));
      const suffix = label.replace(/[0-9.]/g, "");
      const duration = 1200;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(numeric * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
        else element.textContent = label;
      };

      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target as HTMLElement);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.55 },
    );

    counterTargets.forEach((target) => counterObserver.observe(target));

    if (!location.hash) {
      window.scrollTo(0, 0);
    }

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      animations.forEach(animation => animation.cancel());
      revealTargets.forEach(target => target.classList.remove("hx-pending"));
      motionPreference.removeEventListener('change', stopMotion);
    };
  }, [location.pathname, location.hash]);
}

export function useHeroPointer() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return undefined;

    let frame = 0;

    const updatePosition = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        hero.style.setProperty("--hero-pointer-x", `${x}%`);
        hero.style.setProperty("--hero-pointer-y", `${y}%`);
        hero.style.setProperty("--hero-shift-x", `${(x - 50) * 2.6}px`);
        hero.style.setProperty("--hero-shift-y", `${(y - 50) * 1.9}px`);
        hero.style.setProperty("--hero-inverse-x", `${(50 - x) * 1.8}px`);
        hero.style.setProperty("--hero-inverse-y", `${(50 - y) * 1.35}px`);
        hero.style.setProperty("--hero-shift-x-soft", `${(x - 50) * 1.25}px`);
        hero.style.setProperty("--hero-shift-y-soft", `${(y - 50) * 0.95}px`);
        hero.style.setProperty("--hero-inverse-x-soft", `${(50 - x) * 1.1}px`);
        hero.style.setProperty("--hero-inverse-y-soft", `${(50 - y) * 0.85}px`);
      });
    };

    const resetPosition = () => {
      hero.style.setProperty("--hero-pointer-x", "50%");
      hero.style.setProperty("--hero-pointer-y", "42%");
      hero.style.setProperty("--hero-shift-x", "0px");
      hero.style.setProperty("--hero-shift-y", "0px");
      hero.style.setProperty("--hero-inverse-x", "0px");
      hero.style.setProperty("--hero-inverse-y", "0px");
      hero.style.setProperty("--hero-shift-x-soft", "0px");
      hero.style.setProperty("--hero-shift-y-soft", "0px");
      hero.style.setProperty("--hero-inverse-x-soft", "0px");
      hero.style.setProperty("--hero-inverse-y-soft", "0px");
    };

    hero.addEventListener("mousemove", updatePosition as EventListener, { passive: true });
    hero.addEventListener("mouseleave", resetPosition as EventListener, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", updatePosition as EventListener);
      hero.removeEventListener("mouseleave", resetPosition as EventListener);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
