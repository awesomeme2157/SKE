"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { Product } from "@/data/products";
import { useEnquiry } from "@/components/enquiry-provider";

export function ProductDetails({ product, order, onClose }: {
  product: Product;
  order: number;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const closingRef = useRef(false);
  const { selectProduct } = useEnquiry();

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus({ preventScroll: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gap = getComputedStyle(panel.parentElement!).rowGap;
    const animation = panel.animate(
      { height: ["0px", `${panel.offsetHeight}px`], opacity: [0, 1], marginTop: [`-${gap}`, "0px"] },
      { duration: 380, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" },
    );
    animationRef.current = animation;
    animation.onfinish = () => animation.cancel();
    return () => { animationRef.current?.cancel(); };
  }, []);

  function close() {
    const panel = panelRef.current;
    if (!panel || closingRef.current) return;
    closingRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    const height = panel.getBoundingClientRect().height;
    const gap = getComputedStyle(panel.parentElement!).rowGap;
    animationRef.current?.cancel();
    const animation = panel.animate(
      { height: [`${height}px`, "0px"], opacity: [1, 0], marginTop: ["0px", `-${gap}`] },
      { duration: 260, easing: "ease-in-out", fill: "both" },
    );
    animationRef.current = animation;
    animation.onfinish = onClose;
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="product-row-reveal" id="product-row-details" style={{ order }} ref={panelRef} tabIndex={-1}>
      <section className="product-row-panel" aria-labelledby="product-row-title">
        <div className="product-row-image"><Image src={`/media/products/${product.image}`} alt={`${product.name} product artwork`} width={1920} height={1920} sizes="(max-width: 760px) 90vw, 440px" /></div>
        <div className="product-row-content">
          <div className="product-row-heading">
            <div><p className="eyebrow">Product details</p><h3 id="product-row-title">{product.name}</h3></div>
            <button type="button" className="product-row-close" aria-label="Close product details" onClick={close}>×</button>
          </div>
          <div className="product-detail-body">
            <div className="product-detail-columns">
              <div><h4>Product range</h4><ul>{product.range.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h4>Applications</h4><ul>{product.applications.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <p className="product-availability">Contact our team to confirm the suitable model, specifications, and availability.</p>
          </div>
          <a className="product-enquiry" href="#contact" onClick={() => selectProduct(product.name)}>{product.category === "Services" ? "Enquire about a service" : "Enquire about this product"}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </div>
  );
}
