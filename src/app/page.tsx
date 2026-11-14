import { ContactForm } from "@/components/contact-form";
import { BannerGallery } from "@/components/banner-gallery";
import { products } from "@/data/products";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span className="accent-line" /> Shree Krishnna Enterprises</p>
            <h1 id="hero-title">Working together.<br /><span>Supporting textile excellence.</span></h1>
            <div className="hero-bottom">
              <p>Textile machinery, accessories, and technical expertise to support your business’s everyday needs.</p>
              <a className="button-primary" href="#products">Explore our products <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <BannerGallery />
        </div>
      </section>
      <section className="products-section" id="products" aria-labelledby="products-title">
        <div className="site-container">
          <div className="section-heading">
            <p className="eyebrow">What we offer</p>
            <h2 id="products-title">Solutions for the textile industry.</h2>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article key={product.image} className="product-card">
                <div className="product-image"><Image src={`/media/products/${product.image}`} alt={`${product.name} brand and product artwork`} width={1920} height={1920} sizes="(max-width: 540px) calc(100vw - 40px), (max-width: 900px) 45vw, 380px" /></div>
                <div className="product-card-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a className="product-enquiry" href="#contact" aria-label={`Enquire about ${product.name}`}>Enquire <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="site-container about-inner">
          <div className="about-identity">
            <p className="eyebrow">About us</p>
          </div>
          <div>
            <h2 id="about-title">Industry knowledge.<br />Personal commitment.</h2>
            <p>With 30 years of experience in the textile industry, we support businesses across production, maintenance, servicing, and troubleshooting.</p>
            <p>Our aim is to supply quality products backed by practical technical consultancy, helping customers find solutions that meet their operational needs.</p>
            <a className="text-link" href="#contact">Talk to our team <span aria-hidden="true">↗</span></a>
            <div className="team-grid" aria-label="Meet our team">
              {[
                { name: "Mr. Sanjay Mhetar", image: "sanjay_mhetar.jpg" },
                { name: "Mr. Vipul Vanashetti", image: "vipul_vanashetti.jpg" },
              ].map((person) => (
                <figure className="team-member" key={person.image}>
                  <Image src={`/media/team/${person.image}`} alt={person.name} width={1200} height={1500} sizes="(max-width: 480px) calc(100vw - 40px), (max-width: 760px) 45vw, 300px" />
                  <figcaption>{person.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
