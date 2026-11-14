# Shree Krishnna Enterprises

Website for Shree Krishnna Enterprises, showcasing textile machinery, components, accessories, and technical services. Visitors can browse the product catalogue, view product details, and contact the team through the enquiry form or office contact links.

**New computer? Follow [SETUP.md](SETUP.md)** for installation, Windows/macOS/Linux commands, email configuration, and troubleshooting.

## Features

- Responsive navigation and layouts for desktop and mobile.
- Four-image hero slideshow with a three-second interval, manual navigation, and play/pause controls. Rotation pauses on hover, keyboard focus, and when the browser tab is hidden; reduced-motion preferences disable automatic rotation by default.
- Product category filters and equal-height product cards.
- Animated, full-width product details beneath the selected card's row.
- Product-specific enquiries that preselect the product in the contact form.
- Head Office and Branch Office addresses, clickable email addresses, and phone links.
- Server-side enquiry validation and email delivery through Resend.
- Locally hosted fonts and media; no database is required.

## Technology

| Tool | Version / purpose |
| --- | --- |
| Next.js | 16.4.6, App Router |
| React | 19.3.0 |
| TypeScript | Type checking |
| Tailwind CSS | 4.3.3, with custom stylesheets |
| npm | Dependency management using `package-lock.json` |
| Resend | Enquiry email delivery from the server |

Development and production builds use Webpack, as configured in `package.json`.

## Quick start

Install Git and a supported Node.js LTS release first. The installed Next.js version requires Node.js **20.9 or newer**; see [SETUP.md](SETUP.md#requirements) for the environment used to validate this project.

```sh
git clone https://github.com/awesomeme2157/SKE.git
cd SKE
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the URL printed in the terminal if that port is occupied. Stop the server with **Ctrl+C**.

The website can be browsed without environment variables. Sending enquiries requires the settings described in [the email setup guide](SETUP.md#configure-enquiry-emails).

## Commands

Run these from the project root, where `package.json` is located.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact dependencies in the lockfile |
| `npm run dev` | Start the development server with live updates |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate Next.js types and check TypeScript |
| `npm run build` | Create a production build |
| `npm start` | Serve an existing production build |

There is currently no automated test-suite command. Lint, type checks, and builds do not replace checking layouts and interactions in a browser.

## Project structure

```text
src/
  app/
    api/enquiry/route.ts       Enquiry validation and email delivery
    fonts/                    Local fonts and their licenses
    globals.css               Base layout, responsive styles, and interactions
    visual-refresh.css        Navy/copper visual styling and entrance animations
    layout.tsx                Shared layout, fonts, and page metadata
    page.tsx                  Home, products, About, and contact sections
  components/
    banner-gallery.tsx        Hero slideshow and playback controls
    product-catalogue.tsx     Filters, product cards, and card-height matching
    product-details.tsx       Animated details panel below a product row
    contact-form.tsx          Enquiry form and office contact details
    enquiry-provider.tsx      Selected product shared with the form
    site-header.tsx           Navigation and mobile menu
    site-footer.tsx           Copyright and back-to-top link
    scroll-effects.tsx        Scroll reveal effects
  data/products.ts            Product descriptions, ranges, and applications
  lib/enquiry-response.ts     Safe handling of enquiry responses
public/media/
  banners/                    Hero slides
  branding/                   Company branding
  products/                   Product and manufacturer artwork
  team/                       Team photographs
  partners/                   Reserved for partner assets
  brochures/                  Reserved for brochures
```

## Editing content

| Change | File |
| --- | --- |
| Product name, category, description, range, or application | `src/data/products.ts` |
| Available category filter buttons | `src/components/product-catalogue.tsx` |
| Office address, phone numbers, or public email links | `src/components/contact-form.tsx` |
| Hero copy and About section | `src/app/page.tsx` |
| Banner order, captions, and rotation interval | `src/components/banner-gallery.tsx` |
| Navigation | `src/components/site-header.tsx` |
| Site title, description, and indexing settings | `src/app/layout.tsx` |
| Base styling and responsive layouts | `src/app/globals.css` |
| Current visual theme | `src/app/visual-refresh.css` |

Media is tracked in Git. Use lowercase filenames with underscores, retain the `_logo` suffix for product artwork, and match filename case exactly. Files inside `public/` are referenced without `/public`, for example `/media/products/kanai_logo.jpg`.

Changing a public email link does **not** change where form submissions are sent. That destination is configured separately with `ENQUIRY_TO_EMAIL`.

## Enquiry delivery

The form sends JSON to `/api/enquiry`. The server validates it and sends a plain-text email using Resend. The visitor's email is set as the reply-to address. Submissions are not stored in a database or an application dashboard.

Required server-side settings:

```dotenv
RESEND_API_KEY=
ENQUIRY_FROM_EMAIL=
ENQUIRY_TO_EMAIL=
```

Use `.env.local` for local development and your hosting provider's environment settings for deployment. Never commit API keys or prefix these settings with `NEXT_PUBLIC_`. The repository includes a safe [`.env.example`](.env.example) template; `.env.local` is ignored by Git and must be configured separately on another computer.

Without these settings, the form reports a delivery error and provides direct contact details. Local delivery has been confirmed during development; a deployment must be tested separately. See [SETUP.md](SETUP.md#configure-enquiry-emails) for testing and verified-domain sender configuration.

The existing live website's email backend has not been integrated into this repository. Reusing it would require reviewing that backend and updating this implementation.

## Production and deployment

```sh
npm run build
npm start
```

Use hosting that supports a Next.js server, such as the planned Vercel deployment. A plain static-file upload will not run `/api/enquiry`.

See [the deployment notes](SETUP.md#deployment-notes) before connecting the existing domain. The current code deliberately sets `robots: { index: false, follow: false }` in `src/app/layout.tsx`; review this before launching the completed production site.

## Dependency maintenance

Commit `package-lock.json` whenever dependencies intentionally change. Do not copy `node_modules` between systems or delete the lockfile as a routine setup fix.

`package.json` overrides `minimatch` to `11.0.7` beneath `@typescript-eslint/typescript-estree` to address previously reported advisories. Reassess that override when updating the lint dependencies, and validate any dependency upgrade with the project checks.

For coding agents, read [AGENTS.md](AGENTS.md) and the relevant guides included with the installed Next.js package before changing application code.
