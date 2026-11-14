"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "About us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    }}>
      <div className="site-container header-inner">
        <Link href="/#home" className="brand" onClick={() => setMenuOpen(false)} aria-label="Shree Krishnna Enterprises home">
          <span className="brand-logo"><Image src="/media/branding/ske_logo.jpg" alt="Shree Krishnna Enterprises — Working Together" width={1920} height={1920} sizes="(max-width: 760px) 180px, 240px" loading="eager" /></span>
        </Link>
        <button id="menu-toggle" type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close menu" : "Menu"}
          <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
        </button>
        <nav id="main-navigation" aria-label="Main navigation" className={`main-navigation ${menuOpen ? "is-open" : ""}`}>
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
