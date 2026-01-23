# Karelys Denis - Portfolio

A modern, responsive portfolio website showcasing my work as a Fullstack Developer and Project Manager. Built with React, Vite, and Tailwind CSS.

## Live Demo

Visit the live site: [kadenis.reakagency.com](https://kadenis.reakagency.com)

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Form Handling:** Formspree (optional)

## Features

- Modern, dark-themed design with professional aesthetics
- Fully responsive (mobile-first approach)
- Smooth animations and transitions using Framer Motion
- Multi-page navigation with React Router
- Project showcase with filtering capabilities
- Contact form with validation
- SEO optimized with meta tags
- Performance optimized for Lighthouse scores 90+

## Project Structure

```
kadenis_portafolio/
├── public/
│   └── images/           # Project screenshots (placeholders)
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── TechStack.jsx
│   │   ├── MetricsSection.jsx
│   │   └── ContactForm.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── data/             # Data files
│   │   └── projects.js   # Projects and personal info
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles with Tailwind
├── index.html            # HTML template with SEO tags
├── package.json
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── vite.config.js        # Vite configuration
```

## Installation

### Prerequisites

- Node.js (v20.18.0 or higher)
- npm (v11.4.2 or higher)

### Steps

1. Clone the repository or navigate to the project directory:
   ```bash
   cd kadenis_portafolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Formspree for contact form:
   - Sign up at [formspree.io](https://formspree.io)
   - Create a new form and get your form ID
   - Open `src/components/ContactForm.jsx`
   - Replace `YOUR_FORM_ID` with your actual Formspree form ID

## Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Build for Production

Build the project:

```bash
npm run build
```

The optimized production files will be in the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your deployment

### Alternative: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and configure build settings
5. Deploy!

### Build Configuration

The following build settings are automatically configured for Vite:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Customization

### Update Personal Information

Edit `src/data/projects.js` to update:
- Personal details (name, email, phone, etc.)
- Projects information
- Tech stack
- Experience timeline
- Education

### Update Styling

Modify `tailwind.config.js` to customize:
- Colors
- Fonts
- Breakpoints
- Other design tokens

### Add New Pages

1. Create a new page component in `src/pages/`
2. Add a route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

## SEO

The site includes optimized meta tags in `index.html`:
- Title and description tags
- Open Graph tags for social sharing
- Twitter Card tags
- Theme color for mobile browsers

Update these tags to match your personal branding.

## Performance Optimization

The project is optimized for performance:
- Vite's fast HMR and optimized build
- Tailwind CSS purges unused styles in production
- Lazy loading ready (can be added to routes if needed)
- Optimized animations with Framer Motion
- Responsive images support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Contact

- **Email:** karelys@reakagency.com
- **LinkedIn:** [linkedin.com/in/karelys-denis](https://linkedin.com/in/karelys-denis)
- **Location:** Chile / Spain / France

---

Built with React, Vite and Tailwind CSS
