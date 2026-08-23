# Contact Form — one-time setup

Your "Get in Touch" section now delivers messages two ways.

## 1. Send Message  →  your email

Messages go to **opbhardwaj88@gmail.com** through [FormSubmit](https://formsubmit.co),
a free relay that lets a static site send email without a backend.

### The one step you must do

FormSubmit will not forward mail to an address it hasn't verified.

1. Put the site online (GitHub Pages, Netlify, Vercel — anything with `http://`
   or `https://`). **This will not work from a `file://` page opened by
   double-clicking `index.html`** — the browser blocks the request.
2. Fill in the form yourself and press **Send Message**.
3. FormSubmit emails `opbhardwaj88@gmail.com` an activation link. Click it once.

That's it. Every message after that arrives in your inbox automatically, with the
visitor's name, email and message laid out in a table. Hitting **Reply** replies
straight to the visitor, because their address is set as the reply-to.

Until you click the activation link, visitors see a polite notice instead of a
success message, so nothing looks broken.

### Optional: hide your address from spam bots

Right now your email sits in the page source, where scrapers can find it. After
activating, log in at [formsubmit.co](https://formsubmit.co), copy your random
alias (looks like `a1b2c3d4e5f6...`), and replace it in **two** places:

- `index.html` → the form's `action="https://formsubmit.co/<alias>"`
- `main.js` → `FORM_ENDPOINT = "https://formsubmit.co/ajax/<alias>"`

## 2. Send on WhatsApp  →  your phone

The green button opens WhatsApp with a chat to **+91 93064 07069**, pre-filled
with whatever the visitor typed:

```
Hi OP, I found you through your portfolio.

Name: Riya Sharma
Email: riya@company.com

Message:
Hi, I would like to hire you for a landing page.
```

They just press send. Works on mobile (opens the app) and desktop
(opens WhatsApp Web/Desktop). No setup, no third party, nothing to activate.

## Changing your details later

Everything lives at the top of the contact block in `main.js`:

```js
const MY_EMAIL    = "opbhardwaj88@gmail.com";
const MY_WHATSAPP = "919306407069";   // country code + number, digits only
```

Note that `MY_WHATSAPP` takes no `+`, spaces or dashes — digits only, country
code first. Also update the matching `mailto:`, `tel:` and `wa.me` links in
`index.html` if you change them.

## What else the form does

- Validates name, a real-looking email, and a message of 10+ characters, showing
  a styled banner instead of the browser's default grey tooltip.
- Disables the buttons and shows a spinner while sending, so nobody double-sends.
- If the request fails (offline, service down, opened as a local file), it shows
  your email address and points the visitor at the WhatsApp button.
- Includes a hidden honeypot field. Bots fill it in and get a fake success
  message; their spam never reaches you.
- Still works with JavaScript disabled — the form has a real `action`, so it
  falls back to a normal POST and FormSubmit's own thank-you page.
