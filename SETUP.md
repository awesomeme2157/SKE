# Setup and running on another computer

This guide covers a fresh checkout on macOS, Linux, or Windows. You do not need to recreate the Next.js project or install a database.

## Requirements

Install:

- **Git**, from [git-scm.com](https://git-scm.com/downloads).
- **Node.js with npm**, from [nodejs.org](https://nodejs.org/en/download). Use a currently supported LTS release. The installed Next.js package requires Node.js **20.9 or newer**.
- A modern web browser. An editor such as VS Code is optional.

The project has been checked locally with **Node.js 26.13.1**. Using the same Node.js major version across development computers helps avoid dependency differences. The package versions used by the application are recorded in `package-lock.json`.

Open Terminal on macOS/Linux, or PowerShell on Windows, and check:

```sh
node --version
npm --version
git --version
```

If a command is unavailable, finish installing it and open a new terminal. GitHub authentication is required if repository access is restricted.

## Get the project

In the folder where you keep your projects, run:

```sh
git clone https://github.com/awesomeme2157/SKE.git
cd SKE
npm ci
```

`npm ci` uses the existing lockfile and installs the dependencies needed for development and builds. Internet access is required for the initial download.

If you already cloned the repository, open that folder instead of cloning again. Keep your own edits safe before pulling updates.

### Moving the project using a ZIP or USB drive

Git clone is preferred. If you transfer a folder manually, include the source files, `public/`, `package.json`, `package-lock.json`, project configuration, and `.env.example`.

Do not transfer `node_modules/`, `.next/`, or `*.tsbuildinfo`; they are generated locally. Run `npm ci` on the destination system. GitHub ZIP downloads do not include your `.env.local` file. Configure it separately if you need to send email.

## Start the website

From the `SKE` folder:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser. If the terminal prints another port, use that URL. Keep the terminal running while using the site; **Ctrl+C** stops the server. Source edits update the development preview automatically.

To choose a different port explicitly:

```sh
npm run dev -- --port 3001
```

Then open [http://localhost:3001](http://localhost:3001).

No environment file is needed to browse the pages, filter products, open details, or view office contacts. Email delivery needs the next section.

## Configure enquiry emails

The current code uses **Resend**. You need your own authorized API key and sender configuration, or a securely shared key intended for this project. A successful submission sends an email; it does not save a database record.

### 1. Create a local environment file

Run this only if `.env.local` does not already exist, so you do not overwrite working settings.

**macOS / Linux:**

```sh
cp .env.example .env.local
```

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

Alternatively, duplicate `.env.example` in your editor and name the copy `.env.local`.

Keep it in the project root, alongside `package.json`, rather than inside `src/`. On Windows, ensure it is not accidentally named `.env.local.txt`.

### 2. Choose local testing or a verified sender

**For a quick local test**, create a [Resend account](https://resend.com), create an API key in its API Keys dashboard, and set:

```dotenv
RESEND_API_KEY=re_replace_with_your_actual_key
ENQUIRY_FROM_EMAIL=onboarding@resend.dev
ENQUIRY_TO_EMAIL=your_resend_account_email@example.com
```

Replace the key and recipient with real values. The test sender `onboarding@resend.dev` can only deliver to the email associated with that Resend account. This limitation applies even when the form runs on localhost. See [Resend's testing restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

**For sending enquiries to the business inbox**, verify a domain you control in Resend and use an address on that verified domain:

```dotenv
RESEND_API_KEY=re_replace_with_your_actual_key
ENQUIRY_FROM_EMAIL=website@your-verified-domain.example
ENQUIRY_TO_EMAIL=skesanjay9@gmail.com
```

The sender above is illustrative. Use the exact domain you verified. Verification means adding Resend's requested DNS records at the provider managing that domain's DNS. It is separate from moving the website to new hosting. See [Resend's domain guide](https://resend.com/docs/dashboard/domains/introduction).

`ENQUIRY_TO_EMAIL` currently accepts one recipient address. It can differ from the public email links shown on the page.

### 3. Restart and test

Stop the running development server with **Ctrl+C**, then restart:

```sh
npm run dev
```

Submit a clearly labelled test enquiry using an email address you control. Check the success message, recipient inbox and spam folder, and Resend's email logs. Verify that replying to the delivered enquiry targets the visitor's address.

The form requires name, email, and message. Company name, phone number, and product/service selection are optional. Selecting an enquiry link for a product preselects it in the form.

### Keep local settings private

- `.env.local` is already excluded by `.gitignore`; do not force-add it to Git.
- Share required credentials through a private, approved channel rather than the repository or screenshots.
- Do not rename these variables to start with `NEXT_PUBLIC_`; they are used only on the server.
- Each computer needs its own local settings. A hosting provider also needs its own environment configuration.
- When asking someone to troubleshoot, share the error message rather than the API key.

## Verify the project

Run these commands from the project root:

```sh
npm run lint
npm run typecheck
npm run build
```

There is no `npm test` script. Also check the following manually in a browser:

- Desktop and mobile navigation, including anchor links beneath the sticky header.
- Slideshow rotation every three seconds, pause/play, and previous/next controls. Move the pointer and keyboard focus away from the slider to allow automatic rotation. A reduced-motion preference disables autoplay by default.
- Category filters, equal-height cards, and product details appearing beneath the correct row at different screen widths.
- Product-specific links selecting the corresponding enquiry option.
- Email and telephone links, form validation, and actual email delivery when configured.

The **Spares** filter currently has no products assigned. Selecting it displays zero brands; this is a content task, not a missing installation step.

## Run the production build locally

Stop `npm run dev` before building in the same checkout, because both commands use generated Next.js files.

```sh
npm run build
npm start
```

Open the URL printed in the terminal. `npm start` requires a successful build; it does not rebuild after source changes. Stop it with **Ctrl+C**, rebuild, and restart when needed.

## Update an existing checkout

First check for your own uncommitted changes:

```sh
git status
```

Commit or otherwise preserve your edits before pulling. Then, from the project folder:

```sh
git pull
npm ci
npm run dev
```

Stop a running dev server before reinstalling dependencies. Your ignored `.env.local` stays local and is not replaced by `git pull`.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| `node`, `npm`, or `git` is not recognized | Install the missing tool and reopen the terminal. |
| PowerShell blocks `npm.ps1` | Use `npm.cmd ci` / `npm.cmd run dev`, or use Command Prompt. No execution-policy change is needed. |
| `package.json` cannot be found | Run commands inside the cloned `SKE` folder. |
| Unsupported Node.js engine error | Check `node --version` and switch to a supported Node.js release that meets the dependency requirements. |
| `npm ci` reports package/lockfile mismatch | Check that both package files came from the same repository revision. Do not delete the lockfile to bypass the error. |
| Dependency download fails | Check internet access and any required proxy or registry settings, then retry `npm ci`. |
| Port 3000 is occupied | Use the port printed by Next.js or start with `npm run dev -- --port 3001`. |
| Images work on one system but not another | Check the exact filename and case under `public/media/`; Linux filesystems are usually case-sensitive. |
| Form reports that it could not send | Check all three environment values, restart the server, and inspect Resend logs. Confirm test-recipient or verified-domain restrictions. |
| Slideshow does not advance automatically | Check pause state, hover/focus, tab visibility, and the device's reduced-motion setting. |
| `npm start` cannot find a production build | Run `npm run build` first. |
| Generated build files cause unexpected errors | Stop the server, remove only `.next/`, and restart. See commands below. |

To clear the generated Next.js cache, with the server stopped:

**macOS / Linux:**

```sh
rm -rf .next
npm run dev
```

**Windows PowerShell:**

```powershell
Remove-Item -Recurse -Force .next
npm.cmd run dev
```

These commands delete generated build files only. Do not delete `src/`, `public/`, `.env.local`, or `package-lock.json`.

## Deployment notes

The planned host is Vercel, but this repository also supports a compatible Node.js host using `npm run build` followed by `npm start`.

For Vercel:

1. Import the GitHub repository and select the Next.js framework preset, using the repository root.
2. Use the project's `npm run build` command and the dependency versions in `package-lock.json`.
3. Add `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL` in the hosting environment settings. Configure the environments you intend to test and deploy.
4. Deploy and verify the preview URL, including a real test enquiry. Redeploy after changing hosted environment variables.
5. Connect the business domain when the replacement site is approved. Preserve existing DNS and email settings while planning that change.
6. Remove the intentional `noindex`/`nofollow` metadata in `src/app/layout.tsx` when the completed production site should appear in search results.

A static HTML upload to a basic file host will not run the enquiry API. The live site's existing email handler is separate from this repository's Resend implementation and has not been reused yet.

This guide does not change the current live website or its DNS. Keep the current site available until the replacement deployment is ready.
