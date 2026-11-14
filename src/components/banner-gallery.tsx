"use client";

import Image from "next/image";
import { useState } from "react";

const banners = [
  { src: "banner_3.jpg", alt: "Textile production machinery and control systems", caption: "Textile machinery" },
  { src: "banner_1.jpg", alt: "SKE fogging systems and SRM product and monitoring system artwork", caption: "Systems & accessories" },
  { src: "banner_2.jpg", alt: "Rotorcraft Green Compact system artwork", caption: "Compact systems" },
  { src: "banner_4.jpg", alt: "Saurer textile components and maintenance equipment", caption: "Components & maintenance" },
];

export function BannerGallery() {
  const [selected, setSelected] = useState(0);
  const banner = banners[selected];

  return (
    <div className="banner-gallery" role="region" aria-roledescription="carousel" aria-label="Textile products and systems">
      <div className="banner-image">
        <Image src={`/media/banners/${banner.src}`} alt={banner.alt} width={3200} height={1540} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1244px) 55vw, 620px" preload={selected === 0} />
      </div>
      <div className="banner-controls">
        <p aria-live="polite" aria-atomic="true"><span className="banner-count">0{selected + 1} / 04</span>{banner.caption}</p>
        <div className="banner-buttons">
          <button type="button" aria-label="Previous banner" onClick={() => setSelected((selected + banners.length - 1) % banners.length)}>←</button>
          <button type="button" aria-label="Next banner" onClick={() => setSelected((selected + 1) % banners.length)}>→</button>
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
