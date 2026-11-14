"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { products, type ProductCategory } from "@/data/products";
import { useEnquiry } from "@/components/enquiry-provider";

const categories: ("All products" | ProductCategory)[] = ["All products", "Systems", "Components", "Spares", "Material handling", "Services"];

export function ProductCatalogue() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All products");
  const { selectProduct } = useEnquiry();
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleCount = products.filter((product) => category === "All products" || category === product.category).length;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let disposed = false;
    let width = -1;

    function matchCardHeights() {
      if (disposed || !grid) return;
      // Measure natural heights without the previous minimum or row stretching.
      grid.classList.add("is-measuring");
      const cards = grid.querySelectorAll<HTMLElement>(".product-card:not([hidden]):not(:has(.product-details[open]))");
      const height = Math.max(0, ...Array.from(cards, (card) => card.offsetHeight));
      grid.style.setProperty("--product-card-height", `${height}px`);
      grid.classList.remove("is-measuring");
    }

    matchCardHeights();
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width !== width) {
        width = entry.contentRect.width;
        matchCardHeights();
      }
    });
    observer.observe(grid);
    grid.addEventListener("toggle", matchCardHeights, true);
    document.fonts.addEventListener("loadingdone", matchCardHeights);
    void document.fonts.ready.then(matchCardHeights);
    return () => {
      disposed = true;
      observer.disconnect();
      grid.removeEventListener("toggle", matchCardHeights, true);
      document.fonts.removeEventListener("loadingdone", matchCardHeights);
    };
  }, [category]);

  return (
    <section className="products-section" id="products" aria-labelledby="products-title">
      <div className="site-container">
        <div className="catalogue-heading" data-reveal>
          <div><p className="eyebrow">Our product portfolio</p><h2 id="products-title">The right products.<br /><span>For your textile business.</span></h2></div>
          <p>Explore machinery, components, and services from the brands we work with. Our team can help you choose the right solution.</p>
        </div>
        <div className="catalogue-toolbar">
          <div className="category-filters" role="group" aria-label="Filter products by category">
            {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <p className="catalogue-count" role="status" aria-atomic="true">{visibleCount} {visibleCount === 1 ? "brand" : "brands"}</p>
        </div>
        <div className="product-grid" ref={gridRef}>
          {products.map((product) => (
            <article key={product.image} className="product-card" hidden={category !== "All products" && category !== product.category} data-reveal>
              <div className="product-image"><Image src={`/media/products/${product.image}`} alt={`${product.name} brand and product artwork`} width={1920} height={1920} sizes="(max-width: 540px) calc(100vw - 40px), (max-width: 900px) 90vw, 560px" /></div>
              <div className="product-card-content">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3><p>{product.description}</p>
                <details className="product-details">
                  <summary>View product details <span className="details-toggle" aria-hidden="true" /></summary>
                  <div className="product-detail-body">
                    <div className="product-detail-columns">
                      <div><h4>Product range</h4><ul>{product.range.map((item) => <li key={item}>{item}</li>)}</ul></div>
                      <div><h4>Applications</h4><ul>{product.applications.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    </div>
                    <p className="product-availability">Contact our team to confirm the suitable model, specifications, and availability.</p>
                  </div>
                </details>
                <a className="product-enquiry" href="#contact" onClick={() => selectProduct(product.name)} aria-label={`Enquire about ${product.name}`}>{product.category === "Services" ? "Enquire about a service" : "Enquire about this product"}<span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="catalogue-assistance"><div><h3>Not sure which product you need?</h3><p>Tell us about your machinery or requirement. We’ll help you find the right starting point.</p></div><a className="button-primary" href="#contact">Talk to our team <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}
