"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { products, type ProductCategory } from "@/data/products";
import { useEnquiry } from "@/components/enquiry-provider";
import { ProductDetails } from "@/components/product-details";

const categories: ("All products" | ProductCategory)[] = ["All products", "Systems", "Components", "Spares", "Material handling", "Services"];

export function ProductCatalogue() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All products");
  const { selectProduct } = useEnquiry();
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [columns, setColumns] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleProducts = products.filter((product) => category === "All products" || category === product.category);
  const visibleCount = visibleProducts.length;
  const selectedProduct = visibleProducts.find((product) => product.name === selectedName);
  const selectedIndex = selectedProduct ? visibleProducts.indexOf(selectedProduct) : -1;
  const revealOrder = (Math.min(visibleCount, Math.ceil((selectedIndex + 1) / columns) * columns) - 1) * 2 + 1;
  function closeDetails() {
    const trigger = products.find((product) => product.name === selectedName);
    setSelectedName(null);
    if (trigger) document.getElementById(`details-${trigger.image}`)?.focus();
  }

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let disposed = false;
    let width = -1;

    function matchCardHeights() {
      if (disposed || !grid) return;
      // Measure natural heights without the previous minimum or row stretching.
      grid.classList.add("is-measuring");
      const cards = grid.querySelectorAll<HTMLElement>(".product-card:not([hidden])");
      const height = Math.max(0, ...Array.from(cards, (card) => card.offsetHeight));
      grid.style.setProperty("--product-card-height", `${height}px`);
      grid.classList.remove("is-measuring");
    }

    matchCardHeights();
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width !== width) {
        width = entry.contentRect.width;
        setColumns(getComputedStyle(grid).gridTemplateColumns.split(" ").length);
        matchCardHeights();
      }
    });
    observer.observe(grid);
    document.fonts.addEventListener("loadingdone", matchCardHeights);
    void document.fonts.ready.then(matchCardHeights);
    return () => {
      disposed = true;
      observer.disconnect();
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
            {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setSelectedName(null); setCategory(item); }}>{item}</button>)}
          </div>
          <p className="catalogue-count" role="status" aria-atomic="true">{visibleCount} {visibleCount === 1 ? "brand" : "brands"}</p>
        </div>
        <div className="product-grid" ref={gridRef}>
          {products.map((product) => (
            <article key={product.image} className="product-card" style={{ order: visibleProducts.indexOf(product) * 2 }} hidden={category !== "All products" && category !== product.category} data-reveal>
              <div className="product-image"><Image src={`/media/products/${product.image}`} alt={`${product.name} brand and product artwork`} width={1920} height={1920} sizes="(max-width: 540px) calc(100vw - 40px), (max-width: 900px) 90vw, 560px" /></div>
              <div className="product-card-content">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3><p>{product.description}</p>
                <div className="product-details"><button type="button" className="product-details-trigger" id={`details-${product.image}`} aria-expanded={selectedName === product.name} aria-controls={selectedName === product.name ? "product-row-details" : undefined} onClick={() => {
                  if (selectedName === product.name) {
                    document.querySelector<HTMLButtonElement>("#product-row-details .product-row-close")?.click();
                  } else {
                    setSelectedName(product.name);
                  }
                }}>View product details <span aria-hidden="true">{selectedName === product.name ? "−" : "+"}</span></button></div>
                <a className="product-enquiry" href="#contact" onClick={() => selectProduct(product.name)} aria-label={`Enquire about ${product.name}`}>{product.category === "Services" ? "Enquire about a service" : "Enquire about this product"}<span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
          {selectedProduct && <ProductDetails key={selectedProduct.name} product={selectedProduct} order={revealOrder} onClose={closeDetails} />}
        </div>
        <div className="catalogue-assistance"><div><h3>Not sure which product you need?</h3><p>Tell us about your machinery or requirement. We’ll help you find the right starting point.</p></div><a className="button-primary" href="#contact">Talk to our team <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}
