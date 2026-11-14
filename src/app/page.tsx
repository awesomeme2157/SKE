import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="site-container">
          <p className="eyebrow"><span className="accent-line" /> Shree Krishnna Enterprises</p>
          <h1 id="hero-title">Working together.<br /><span>Supporting textile excellence.</span></h1>
          <div className="hero-bottom">
            <p>Textile machinery, spinning accessories, and technical expertise to support your mill’s everyday needs.</p>
            <a className="button-primary" href="#products">Explore our products <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="products-section" id="products" aria-labelledby="products-title">
        <div className="site-container">
          <div className="section-heading">
            <p className="eyebrow">What we offer</p>
            <h2 id="products-title">Solutions for the spinning industry.</h2>
          </div>
          <div className="product-grid">
            {[
              { title: "Textile machinery", description: "Fogging systems, compact spinning systems, and fancy yarn attachments." },
              { title: "Spares & accessories", description: "Sliver cans, cots, aprons, spindle tapes, rings, and travellers." },
              { title: "Technical consultancy", description: "Support for production, maintenance, servicing, and troubleshooting." },
            ].map((product, index) => (
              <article key={product.title} className="product-summary">
                <span className="product-number" aria-hidden="true">0{index + 1}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="site-container about-inner">
          <p className="eyebrow">About us</p>
          <div>
            <h2 id="about-title">Industry knowledge.<br />Personal commitment.</h2>
            <p>We bring experience across textile production, maintenance, and servicing, connecting spinning mills with quality products and practical technical guidance.</p>
            <a className="text-link" href="#contact">Talk to our team <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
