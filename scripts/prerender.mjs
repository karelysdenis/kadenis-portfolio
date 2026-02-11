import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Import data directly from source (use file:// URL for Windows compatibility)
const dataPath = pathToFileURL(join(root, 'src/data/projects.js')).href;
const { projects, personalInfo } = await import(dataPath);

const distDir = join(root, 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

const SITE_URL = 'https://kadenis.reakagency.com';
const featuredProjects = projects.filter(p => p.featured);

// -- Route definitions --

const routes = [
  {
    path: '/',
    title: 'Karelys Denis - Full-Stack Developer & UX Specialist | React, Node.js',
    description: 'Full-stack developer and UX specialist with 10+ years building web applications. Product-first approach across healthcare, e-commerce, legal, and cultural sectors.',
    canonical: SITE_URL,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Karelys Denis',
      jobTitle: 'Full-Stack Developer & UX Specialist',
      description: personalInfo.bio,
      url: SITE_URL,
      email: personalInfo.email,
      image: `${SITE_URL}/images/profile.jpg`,
      sameAs: [personalInfo.linkedin, personalInfo.github],
      knowsAbout: ['React', 'Node.js', 'JavaScript', 'WordPress', 'MySQL', 'Azure Cloud', 'Tailwind CSS', 'Express.js', 'UX Design'],
    },
    content: `
      <header>
        <h1>Karelys Denis - Full-Stack Developer &amp; UX Specialist</h1>
        <p>${personalInfo.heroTagline}</p>
      </header>
      <section>
        <h2>About</h2>
        <p>${personalInfo.bio}</p>
        <p><strong>Location:</strong> ${personalInfo.location}</p>
        <p><strong>Languages:</strong> ${personalInfo.languages.map(l => `${l.name} (${l.level})`).join(', ')}</p>
        <p><strong>${personalInfo.availability}</strong></p>
      </section>
      <section>
        <h2>Services</h2>
        <ul>
          ${Object.entries(personalInfo.whatICanDo).map(([cat, skills]) =>
            `<li><strong>${cat}</strong> - ${skills.join(', ')}</li>`
          ).join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>Featured Projects</h2>
        <ul>
          ${featuredProjects.map(p =>
            `<li><strong>${p.url ? `<a href="${p.url}">${p.title}</a>` : p.title}</strong> - ${p.shortDescription}</li>`
          ).join('\n          ')}
        </ul>
        <p><a href="${SITE_URL}/projects">View all ${projects.length}+ projects</a></p>
      </section>
      <section>
        <h2>Experience</h2>
        <ul>
          ${personalInfo.experience.map(e =>
            `<li><strong>${e.title}</strong>${e.company ? ` at ${e.company}` : ''} (${e.period}) - ${e.description.split('.')[0]}.</li>`
          ).join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>Tech Stack</h2>
        <p>React, Node.js, Express.js, JavaScript, Tailwind CSS, WordPress, MySQL, Azure Cloud</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Email: <a href="mailto:${personalInfo.email}">${personalInfo.email}</a></p>
        <p>LinkedIn: <a href="${personalInfo.linkedin}">linkedin.com/in/karelys-denis</a></p>
        <p>GitHub: <a href="${personalInfo.github}">github.com/faiskare</a></p>
      </section>`,
  },
  {
    path: '/about',
    title: 'About - Karelys Denis | Full-Stack Developer & UX Specialist',
    description: `Full-stack developer and UX specialist with 10+ years building web applications. ${personalInfo.bio.split('.')[0]}.`,
    canonical: `${SITE_URL}/about`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Karelys Denis',
        jobTitle: 'Full-Stack Developer & UX Specialist',
        url: SITE_URL,
        image: `${SITE_URL}/images/profile.jpg`,
        sameAs: [personalInfo.linkedin, personalInfo.github],
        knowsAbout: ['React', 'Node.js', 'JavaScript', 'WordPress', 'MySQL', 'Azure Cloud', 'UX Design'],
        hasCredential: personalInfo.education.map(e => ({
          '@type': 'EducationalOccupationalCredential',
          name: e.degree,
        })),
      },
    },
    content: `
      <h1>About - Karelys Denis</h1>
      <section>
        <h2>Full-Stack Developer &amp; UX Specialist</h2>
        <p>${personalInfo.bio}</p>
        <p><strong>Location:</strong> ${personalInfo.location}</p>
        <p><strong>Languages:</strong> ${personalInfo.languages.map(l => `${l.name} (${l.level})`).join(', ')}</p>
      </section>
      <section>
        <h2>What I Do</h2>
        <p>${personalInfo.aboutWhatIDo}</p>
      </section>
      <section>
        <h2>Who I Work With</h2>
        <p>${personalInfo.aboutWhoIWorkWith}</p>
      </section>
      <section>
        <h2>Professional Experience</h2>
        ${personalInfo.experience.map(e => `
        <article>
          <h3>${e.title}${e.company ? ` - ${e.company}` : ''}</h3>
          <p><em>${e.period}${e.location ? ` | ${e.location}` : ''}</em></p>
          <p>${e.description}</p>
        </article>`).join('')}
      </section>
      <section>
        <h2>Education &amp; Certifications</h2>
        <ul>
          ${personalInfo.education.map(e =>
            `<li><strong>${e.degree}</strong> - ${e.institution} (${e.year})</li>`
          ).join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>Skills</h2>
        ${Object.entries(personalInfo.whatICanDo).map(([cat, skills]) =>
          `<h3>${cat}</h3><ul>${skills.map(s => `<li>${s}</li>`).join('')}</ul>`
        ).join('\n        ')}
      </section>
      <section>
        <h2>Contact</h2>
        <p>Email: <a href="mailto:${personalInfo.email}">${personalInfo.email}</a></p>
        <p>LinkedIn: <a href="${personalInfo.linkedin}">linkedin.com/in/karelys-denis</a></p>
      </section>`,
  },
  {
    path: '/projects',
    title: 'Projects Portfolio - Karelys Denis | Full-Stack Developer',
    description: `Browse ${projects.length}+ production projects delivered across healthcare, e-commerce, legal, and cultural sectors. Full-stack development with React, Node.js, and user-centered design.`,
    canonical: `${SITE_URL}/projects`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects Portfolio - Karelys Denis',
      description: `${projects.length}+ production projects across healthcare, e-commerce, legal, and cultural sectors.`,
      url: `${SITE_URL}/projects`,
      author: { '@type': 'Person', name: 'Karelys Denis' },
    },
    content: `
      <h1>All Projects - Karelys Denis</h1>
      <p>${projects.length}+ production projects across healthcare, e-commerce, legal, and cultural sectors.</p>
      ${projects.map(p => `
      <article>
        <h2>${p.url ? `<a href="${p.url}">${p.title}</a>` : p.title}</h2>
        <p><em>${p.subtitle}</em></p>
        <p>${p.shortDescription}</p>
        <p><strong>Category:</strong> ${p.category} | <strong>Industry:</strong> ${p.industry} | <strong>Year:</strong> ${p.year}</p>
        <p><strong>Tech:</strong> ${p.tech.join(', ')}</p>
        <p><strong>Role:</strong> ${p.role} | <strong>Duration:</strong> ${p.duration}</p>
        ${p.results ? `<p><strong>Results:</strong> ${p.results.join('. ')}.</p>` : ''}
      </article>`).join('')}
      <section>
        <h2>Contact</h2>
        <p>Email: <a href="mailto:${personalInfo.email}">${personalInfo.email}</a></p>
        <p>LinkedIn: <a href="${personalInfo.linkedin}">linkedin.com/in/karelys-denis</a></p>
      </section>`,
  },
  {
    path: '/contact',
    title: 'Contact - Karelys Denis | Full-Stack Developer & UX Specialist',
    description: 'Get in touch for project collaborations. Full-stack developer and UX specialist available for remote work.',
    canonical: `${SITE_URL}/contact`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Karelys Denis',
      url: `${SITE_URL}/contact`,
      mainEntity: {
        '@type': 'Person',
        name: 'Karelys Denis',
        email: personalInfo.email,
        url: SITE_URL,
        sameAs: [personalInfo.linkedin, personalInfo.github],
      },
    },
    content: `
      <h1>Contact - Karelys Denis</h1>
      <p>Open to project collaborations. If you have something that needs building, let's talk.</p>
      <section>
        <h2>Get in Touch</h2>
        <p><strong>Email:</strong> <a href="mailto:${personalInfo.email}">${personalInfo.email}</a></p>
        <p><strong>LinkedIn:</strong> <a href="${personalInfo.linkedin}">linkedin.com/in/karelys-denis</a></p>
        <p><strong>GitHub:</strong> <a href="${personalInfo.github}">github.com/faiskare</a></p>
        <p><strong>Location:</strong> ${personalInfo.location}</p>
        <p><strong>${personalInfo.availability}</strong></p>
      </section>
      <section>
        <h2>What I Can Help With</h2>
        <ul>
          <li>Custom web application development (React, Node.js)</li>
          <li>E-commerce platforms and payment integration</li>
          <li>WordPress sites, themes, and plugins</li>
          <li>UX design and user research</li>
          <li>Cloud infrastructure and performance optimization</li>
        </ul>
      </section>`,
  },
];

// -- Generate HTML --

function generatePage(route) {
  let html = template;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${route.description}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${route.canonical}"`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${route.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${route.description}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${route.canonical}"`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${route.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${route.description}"`
  );

  // Add JSON-LD before </head>
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`;
  html = html.replace('</head>', `    ${jsonLdScript}\n  </head>`);

  // Replace root content (match root div closing before </body>)
  // Wrap in visually-hidden div: crawlers read it, users don't see the flash
  const hiddenStyle = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)';
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>\s*(?=\n\s*<\/body>)/,
    `<div id="root"><div aria-hidden="true" style="${hiddenStyle}">${route.content}\n      </div>\n    </div>`
  );

  return html;
}

// -- Write files --

for (const route of routes) {
  const html = generatePage(route);
  const outDir = route.path === '/' ? distDir : join(distDir, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`Pre-rendered: ${route.path}`);
}

console.log(`Done. ${routes.length} pages pre-rendered.`);
