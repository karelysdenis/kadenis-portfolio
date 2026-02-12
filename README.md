# Karelys Denis - Portfolio

A modern, responsive portfolio website showcasing my work as a Full-Stack Developer & UX Specialist. Built with React, Vite, and Tailwind CSS.

## Live Demo

Visit the live site: [kadenis.reakagency.com](https://kadenis.reakagency.com)

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Build:** Vite
- **Routing:** React Router DOM
- **Icons:** React Icons
- **SEO:** react-helmet-async
- **Form:** Formspree

## Project Structure

```
kadenis_portafolio/
├── public/
│   ├── images/              # Project screenshots and assets
│   ├── og-image.svg         # Open Graph image
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── components/          # UI components
│   │   ├── common/          # SEO, ErrorBoundary, SocialLinks, ScrollToTop, CTA
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── TechStack.jsx
│   │   ├── MetricsSection.jsx
│   │   ├── ContactForm.jsx
│   │   └── FilterDropdown.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── usePersonalInfo.js
│   │   ├── useImageState.js
│   │   ├── useClickOutside.js
│   │   └── useReducedMotion.js
│   ├── constants/           # Animation presets
│   ├── data/                # Projects, personal info, technologies
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Customization

Edit `src/data/projects.js` to update personal info, projects, experience, and education. Edit `src/data/technologies.js` for the tech stack display.

## Contact

- **Email:** karelys@reakagency.com
- **LinkedIn:** [linkedin.com/in/karelys-denis](https://www.linkedin.com/in/karelys-denis)
- **GitHub:** [github.com/karelysdenis](https://github.com/karelysdenis)
