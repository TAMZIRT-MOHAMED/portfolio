# Mohamed TAMZIRT — Portfolio

A modern, responsive personal portfolio website built with vanilla HTML, CSS & JavaScript.

## Features

- Dark / Light theme toggle
- Smooth scroll animations (custom AOS)
- Typewriter hero effect
- Project filter tabs
- Animated stat counters
- Custom cursor (desktop)
- Fully responsive (mobile-first)
- Contact form (front-end demo)

---

## Free Deployment Guide

### Option 1 — GitHub Pages (Recommended)

1. **Create a GitHub account** at https://github.com if you don't have one.

2. **Create a new repository**  
   - Go to https://github.com/new  
   - Name it `portfolio` (or `<your-username>.github.io` for a root domain)  
   - Set it to **Public**  
   - Click **Create repository**

3. **Push your code**
   ```bash
   cd /path/to/portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose `main` branch and `/ (root)` folder
   - Click **Save**

5. **Your site is live!**  
   Visit `https://<your-username>.github.io/portfolio/`

---

### Option 2 — Netlify

1. Go to https://app.netlify.com/signup and sign up with GitHub.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Connect your GitHub repo.
4. Leave build settings empty (it's a static site).
5. Click **Deploy site**.
6. Your site will be at `https://<random-name>.netlify.app`  
   *(You can set a custom subdomain in Site settings → Domain management)*

---

### Option 3 — Vercel

1. Go to https://vercel.com/signup and sign up with GitHub.
2. Click **"Add New"** → **"Project"**.
3. Import your GitHub repo.
4. Framework Preset: select **Other**.
5. Click **Deploy**.
6. Your site will be at `https://<project-name>.vercel.app`

---

### Option 4 — Cloudflare Pages

1. Go to https://pages.cloudflare.com/ and sign up.
2. Click **Create a project** → **Connect to Git**.
3. Select your GitHub repo.
4. Build settings: leave blank (static site).
5. Click **Save and Deploy**.
6. Your site will be at `https://<project-name>.pages.dev`

---

## Customization

- **Social Links**: Update `href` attributes in `index.html` for GitHub, LinkedIn, etc.
- **Resume PDF**: Place your resume as `assets/Mohamed_TAMZIRT_Resume.pdf`
- **Project Links**: Replace `#` placeholders with actual project/repo URLs
- **Contact Form**: To make it functional, integrate with [Formspree](https://formspree.io) (free) by changing:
  ```html
  <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
  ```
- **Colors**: Edit the CSS variables in `css/style.css` under `:root`
- **Favicon**: Add a `favicon.ico` to the root folder

---

## Project Structure

```
portfolio/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # All interactions
├── assets/             # Images, resume PDF, etc.
└── README.md           # This file
```

## License

MIT — Feel free to use and modify.
