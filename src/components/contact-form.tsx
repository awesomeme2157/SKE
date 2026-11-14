"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ENQUIRY_ERROR_MESSAGE, readEnquiryResponse } from "@/lib/enquiry-response";
import { useEnquiry } from "@/components/enquiry-provider";
import { products } from "@/data/products";

// Keep the server-rendered form disabled until React attaches its handlers.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ContactForm() {
  const { selectedProduct, selectProduct } = useEnquiry();
  const ready = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || submitting.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    submitting.current = true;
    setPending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await readEnquiryResponse(response);
      if (!result.success) {
        setStatus({ type: "error", message: result.message });
        return;
      }
      setStatus({ type: "success", message: "Thank you. Your enquiry has been sent to our team." });
      form.reset();
      selectProduct("");
    } catch {
      setStatus({ type: "error", message: ENQUIRY_ERROR_MESSAGE });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="site-container">
        <div className="contact-heading" data-reveal>
          <p className="eyebrow">Let’s work together</p>
          <h2 id="contact-title">Get in touch.</h2>
          <p>Let’s find the right solution for your textile business. Send an enquiry or speak with our team directly.</p>
        </div>
        <div className="contact-inner">
          <form className="enquiry-form" method="post" action="/api/enquiry" onSubmit={handleSubmit} aria-label="Product and service enquiry" aria-busy={pending} data-reveal>
            <div className="form-heading">
              <h3>Send an enquiry</h3>
              <p className="form-note">Tell us a little about what you need. Fields marked * are required.</p>
            </div>
            <fieldset disabled={!ready || pending} className="form-fields">
              <legend className="sr-only">Your contact details and enquiry</legend>
              <label htmlFor="enquiry-name">Name *<input id="enquiry-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={100} /></label>
              <label htmlFor="enquiry-company">Company name <span>(optional)</span><input id="enquiry-company" name="company" autoComplete="organization" placeholder="Your company" maxLength={150} /></label>
              <label htmlFor="enquiry-email">Email *<input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
              <label htmlFor="enquiry-phone">Mobile <span>(optional)</span><input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your mobile number" maxLength={30} /></label>
              <label className="field-full" htmlFor="enquiry-product">Product or service <span>(optional)</span><select id="enquiry-product" name="product" value={selectedProduct} onChange={(event) => selectProduct(event.target.value)}><option value="">General enquiry / help me choose</option>{products.map((product) => <option key={product.name} value={product.name}>{product.name}</option>)}</select></label>
              <label className="field-full" htmlFor="enquiry-message">Message *<textarea id="enquiry-message" name="message" placeholder="Tell us about the product or support you’re looking for…" required rows={5} maxLength={3000} /></label>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="enquiry-website">Leave this field empty<input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="field-full form-submit">
                <button className="button-primary" type="submit" disabled={!ready || pending}>{pending ? "Sending…" : "Send Enquiry"}<span aria-hidden="true">↗</span></button>
                <p>We’ll use your details to respond to your enquiry.</p>
              </div>
            </fieldset>
            <div aria-live="polite" aria-atomic="true">
              {status && <p className={`form-status ${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
            </div>
            <noscript><p>Please enable JavaScript to use this form, email <a href="mailto:skesanjay9@gmail.com">skesanjay9@gmail.com</a>, or call <a href="tel:+919881552345">+91 98815 52345</a>.</p></noscript>
          </form>
          <div className="office-list" role="group" aria-label="Our offices">
            <section className="office-details" aria-labelledby="head-office-title" data-reveal>
              <h3 id="head-office-title">Head Office</h3>
              <address>
                <p>Radha Krishnna Koshti Wada,<br />A/P Kabnur, Ichalkaranji – 416115.<br />Dist. Kolhapur, Maharashtra, India.</p>
                <div className="office-links">
                  <p><span>Email</span><a href="mailto:slmkabin@yahoo.co.in">slmkabin@yahoo.co.in</a><a href="mailto:skesanjay9@gmail.com">skesanjay9@gmail.com</a></p>
                  <p><span>Mobile</span><a href="tel:+919881552345">(+91) 9881552345</a><a href="tel:+919456085555">(+91) 9456085555</a><a href="tel:+917972090954">(+91) 7972090954</a></p>
                </div>
              </address>
            </section>
            <section className="office-details" aria-labelledby="branch-office-title" data-reveal>
              <h3 id="branch-office-title">Branch Office</h3>
              <address>
                <p>CS No. 373/2, Mahalaxmi Residency,<br />Flat No. 403, E Ward, Ambai Defence Colony,<br />Near CSIBER Chowk, Kolhapur – 416005.<br />Maharashtra, India.</p>
                <div className="office-links">
                  <p><span>Email</span><a href="mailto:vavanashetti@gmail.com">vavanashetti@gmail.com</a></p>
                  <p><span>Mobile</span><a href="tel:+919370021501">(+91) 9370021501</a></p>
                </div>
              </address>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
