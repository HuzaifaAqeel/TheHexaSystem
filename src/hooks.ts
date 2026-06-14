import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollEffects() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const counterTargets = [...document.querySelectorAll<HTMLElement>("[data-count]")];

    if (reduceMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      counterTargets.forEach((target) => {
        target.textContent = target.dataset.count ?? "";
      });
      return undefined;
    }

    revealTargets.forEach((t) => t.classList.remove("is-visible"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -70px 0px" },
    );

    revealTargets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
      revealObserver.observe(target);
    });

    const animateCounter = (element: HTMLElement) => {
      const label = element.dataset.count ?? "0";
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
