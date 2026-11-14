"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "About us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navigation.map(({ href }) => document.getElementById(href.split("#")[1])).filter((section) => section !== null);
    let frame = 0;
    function update() {
      frame = 0;
      setScrolled(window.scrollY > 16);
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= Math.max(140, window.innerHeight * 0.3)) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) current = "contact";
      setActive(current);
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} onKeyDown={(event) => {
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
            <Link key={href} href={href} aria-current={active === href.split("#")[1] ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
