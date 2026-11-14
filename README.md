# Shree Krishnna Enterprises

Company website built with Next.js App Router, TypeScript, and Tailwind CSS.
The layout and enquiry form are implemented. Final content, media, and email service configuration are still pending.

## Local development

Use a Node.js version supported by the installed Next.js release and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Validation

```sh
npm run typecheck
npm run build
```

ESLint is configured and available with `npm run lint`.

`package.json` pins `minimatch` to `11.0.7` only beneath
`@typescript-eslint/typescript-estree` to address the reported dependency
advisories. Remove this override when an upstream TypeScript ESLint release
depends on a patched version. Lint and project-service parsing were checked
with this override.

## Structure

- `src/app/`: pages, shared layout, metadata, and global styles.
- `public/media/`: company logos, product photos, team photos, and brochures. Reference files as `/media/filename.jpg`.
- `@/*`: import alias for `src/*`.

Use descriptive, lowercase media filenames. Browsing the site requires no credentials.

## Enquiry emails

The contact form posts to `/api/enquiry`, which validates input and sends plain-text emails through [Resend](https://resend.com/docs/api-reference/emails/send-email). No database is used. Company and phone are optional; name, email, and message are required.

Copy `.env.example` to `.env.local`. Set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` (a sender on a domain verified in Resend), and `ENQUIRY_TO_EMAIL`. Restart the development server after changing these. Set the same server-side environment variables in Vercel before deployment. Never prefix these variables with `NEXT_PUBLIC_` or commit the API key.

Until configured, submission returns a clear error with direct contact details; it never reports success without email-service acceptance. Live delivery has not been verified. Before public launch, configure platform-level rate limiting for `/api/enquiry`; the built-in honeypot and same-origin check are only basic spam deterrents.

## Planned deployment

Connect the Git repository to Vercel and use its Next.js preset from the project root. Review a preview deployment before connecting `shreekrishnna.in`. No deployment or DNS changes have been made yet.

The starter disables search indexing in `src/app/layout.tsx`. Remove that robots restriction when the completed production site is ready for launch.

Development and builds use Webpack with Tailwind’s PostCSS integration for compatibility with the local execution environment.
