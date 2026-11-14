"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });

    // Content is visible by default, including when JavaScript is unavailable.
    for (const element of elements) {
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    }

    function showAll() {
      if (motion.matches) {
        observer.disconnect();
        elements.forEach((element) => element.classList.remove("reveal-pending"));
      }
    }
    motion.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", showAll);
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);

  return null;
}
