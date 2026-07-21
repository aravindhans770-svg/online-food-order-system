# Spice & Ember — Order Online

A single-page, front-end food ordering experience for a fictional street-food-turned-favorite eatery. Customers can browse the menu, build a live cart, place an order, and get a printable ticket + GST invoice — all client-side, no backend required.

🔗 **Live Demo:** _add your deployed link here (e.g. GitHub Pages, Netlify, Vercel)_

![Made with HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Made with CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📖 About

Spice & Ember is a warm, editorial-style ordering page with a maroon-and-gold "roadside kitchen" aesthetic. It walks a customer through four steps — menu → cart → details → order ticket & bill — entirely in the browser using vanilla JavaScript.

## ✨ Features

- 🍽️ **Menu grid** with quantity steppers and add-to-order checkboxes
- 🛒 **Live running cart** that updates instantly as items/quantities change, with per-line remove buttons
- ✅ **Form validation** for name, 10-digit mobile number, address, and item selection
- 🎟️ **Perforated order ticket** (pure-CSS scalloped/notched edges) summarizing the order
- 🧾 **Auto-generated invoice** with subtotal, 5% GST, invoice number, and date
- 🖨️ **Print/Save Bill** button with dedicated print stylesheet (hides everything except the invoice)
- 🔁 **"Order Again"** reset flow to start a fresh order
- 📱 **Fully responsive**, mobile-friendly layout
- 🎨 Custom theme built with CSS variables (maroon, gold, chili, paper tones)

## 🗂 Project Structure

```
.
├── index.html      # Page markup and content
├── styles.css      # All styling (theme variables, layout, ticket/bill design, print styles)
├── script.js       # All interactivity (menu render, cart logic, validation, ticket/bill generation, print)
└── README.md       # You're here
```

## 🛠 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (CSS variables) for theming, Grid/Flexbox layouts, `mask-image` for the ticket's notched edges, `@media print` for the invoice
- **Vanilla JavaScript** — DOM manipulation, event delegation, regex-based form validation, no external libraries or frameworks
- **Google Fonts** — [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), [Space Mono](https://fonts.google.com/specimen/Space+Mono)

## 🚀 Getting Started

### Run locally

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Open `index.html` directly in your browser, or serve it locally:
   ```bash
   # Python
   python3 -m http.server 8000

   # Node
   npx serve .
   ```
3. Visit `http://localhost:8000` in your browser.

### Deploy

This is a static site, so it can be deployed anywhere for free:

- **GitHub Pages** — enable Pages in repo Settings → Pages → deploy from `main` branch
- **Netlify** — drag and drop the folder or connect the repo
- **Vercel** — import the repo as a static project

## 🧾 How Ordering Works

1. Select items from the **Menu** by checking "Add" and adjusting quantity with the `+` / `−` stepper
2. Watch the **Running Total** cart update live (items can also be removed directly from the cart)
3. Fill in **Name**, **Mobile Number**, and **Address** — validated on submit
4. Click **Order Pannunga** to generate the **Order Ticket** and **Invoice** (with 5% GST)
5. Use **Print / Save Bill** to print or save the invoice as a PDF
6. Use **Innoru Order Podunga** ("place another order") to reset everything

## ⚙️ Customization

- **Menu items:** edit the `MENU` array at the top of `script.js` (`id`, `name`, `price`, `icon`)
- **Tax rate:** change the `0.05` multiplier in the GST calculation inside `script.js`
- **Colors & theme:** edit the CSS variables inside `:root` at the top of `styles.css`
- **Copy/branding:** update the header, about section, and footer text directly in `index.html`

## 📬 Contact

- **Email:** [aravindhans770@gmail.com](mailto:aravindhans770@gmail.com)

## 📄 License

This project is open source. Feel free to fork it and adapt it for your own restaurant, cloud kitchen, or ordering demo.

---

⭐ If you found this useful as a template, consider giving the repo a star!
