"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerReducedMotion = () => true;

const banners = [
  { src: "banner_3.jpg", alt: "Textile production machinery and control systems", caption: "Textile machinery" },
  { src: "banner_1.jpg", alt: "SKE fogging systems and SRM product and monitoring system artwork", caption: "Systems & accessories" },
  { src: "banner_2.jpg", alt: "Rotorcraft Green Compact system artwork", caption: "Compact systems" },
  { src: "banner_4.jpg", alt: "Saurer textile components and maintenance equipment", caption: "Components & maintenance" },
];

export function BannerGallery() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [autoplay, setAutoplay] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerReducedMotion);
  const playing = autoplay ?? !reducedMotion;
  const rotating = playing && !hovered && !focused;
  const banner = banners[selected];

  useEffect(() => {
    if (!rotating) return;
    let timer: ReturnType<typeof setTimeout>;
    function schedule() {
      clearTimeout(timer);
      if (!document.hidden) {
        timer = setTimeout(() => setSelected((current) => (current + 1) % banners.length), 3000);
      }
    }
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [rotating, selected]);

  return (
    <div className="banner-gallery" role="region" aria-roledescription="carousel" aria-label="Textile products and systems"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}>
      <div className="banner-image">
        {banners.map((item, index) => (
          <div key={item.src} className={`banner-slide${selected === index ? " is-active" : ""}`} aria-hidden={selected !== index}>
            <Image src={`/media/banners/${item.src}`} alt={item.alt} width={3200} height={1540} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1244px) 55vw, 620px" preload={index === 0} />
          </div>
        ))}
      </div>
      <div className="banner-controls">
        <p aria-live={rotating ? "off" : "polite"} aria-atomic="true"><span className="banner-count">0{selected + 1} / 04</span>{banner.caption}</p>
        <div className="banner-buttons">
          <button type="button" aria-label={playing ? "Pause slideshow" : "Play slideshow"} onClick={() => setAutoplay(!playing)}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span></button>
          <button type="button" aria-label="Previous banner" onClick={() => setSelected((current) => (current + banners.length - 1) % banners.length)}>←</button>
          <button type="button" aria-label="Next banner" onClick={() => setSelected((current) => (current + 1) % banners.length)}>→</button>
        </div>
      </div>
      <div className="banner-selectors" aria-label="Choose a banner">
        {banners.map((item, index) => (
          <button key={item.src} type="button" aria-label={`Show ${item.caption}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><span /></button>
        ))}
      </div>
    </div>
  );
}
