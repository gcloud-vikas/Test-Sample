# Northbeam IT: sample website

A static, single-page website for a fictional small IT services company. Built with plain HTML, CSS and JavaScript. There are no frameworks, dependencies or build step.

## Structure

```
sample-site/
├── index.html        Home page: header/nav, hero, 3 service cards, about, contact form, footer
├── css/
│   └── style.css     All styles. Theme colours are CSS variables on :root, with dark mode from prefers-color-scheme
├── js/
│   └── main.js       Mobile menu toggle, smooth in-page scrolling, contact form validation
├── assets/
│   └── logo.svg      Logo and favicon (the other graphics are inline SVG in index.html)
└── README.md
```

## Features

- **Responsive** from 360px wide upward. Below 760px the navigation collapses into a menu button.
- **Mobile menu**: the toggle button uses `aria-expanded`/`aria-controls`. The menu closes on Escape, when you click outside it, and when you pick a link. Without JavaScript it stays visible.
- **Light and dark mode**: the page follows the operating system setting through `prefers-color-scheme`. All colours are variables, so you can re-theme it by editing the two `:root` blocks at the top of `style.css`.
- **Accessibility**: semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link, labelled form fields and a visible `:focus-visible` outline. Errors are announced through `aria-live` and marked with `aria-invalid`. The page also respects `prefers-reduced-motion`.
- **Contact form**: validates name, email, service choice and message length in the browser. It then shows an on-page success message. **Nothing is sent anywhere.** To make it live, add an `action` URL and remove the `preventDefault()` in the submit handler of `js/main.js`, or post the data with `fetch`.

## Running it

No install needed. Choose one:

1. **Open the file directly**: double-click `index.html`. Everything works from `file://`.
2. **Serve it locally**, which is closer to real hosting. From inside `sample-site/`:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
   Then open http://localhost:8000.

To check the mobile layout, open your browser's dev tools, turn on device emulation and set the width to 360px. To check dark mode, switch your OS theme, or in Chrome DevTools use Rendering → "Emulate CSS prefers-color-scheme".

## Deploying

Upload the folder's contents to any static host, such as GitHub Pages, Netlify, Cloudflare Pages or an S3 bucket. No configuration is needed.
