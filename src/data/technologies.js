export const allTechnologies = [
  {
    iconName: 'FaWordpress',
    iconLibrary: 'fa',
    name: 'WordPress',
    description: 'Custom themes & plugins, E-commerce, High-traffic sites'
  },
  {
    iconName: 'FaReact',
    iconLibrary: 'fa',
    name: 'React 18',
    description: 'Modern web apps, Interactive interfaces, Custom hooks'
  },
  {
    iconName: 'FaNodeJs',
    iconLibrary: 'fa',
    name: 'Node.js',
    description: 'Backend APIs, Authentication, Real-time data'
  },
  {
    iconName: 'SiExpress',
    iconLibrary: 'si',
    name: 'Express.js',
    description: 'REST APIs, OAuth 2, JWT authentication'
  },
  {
    iconName: 'SiMysql',
    iconLibrary: 'si',
    name: 'MySQL',
    description: 'Database management, WordPress sites, Data storage'
  },
  {
    iconName: 'SiBootstrap',
    iconLibrary: 'si',
    name: 'Bootstrap',
    description: 'Responsive design, Component libraries, Client projects'
  },
  {
    iconName: 'SiTailwindcss',
    iconLibrary: 'si',
    name: 'Tailwind CSS',
    description: 'Modern styling, Custom designs, Fast development'
  },
  {
    iconName: 'FaServer',
    iconLibrary: 'fa',
    name: 'Azure Cloud',
    description: 'Cloud hosting, Performance, Scalability'
  },
  {
    iconName: 'FaGitAlt',
    iconLibrary: 'fa',
    name: 'Git & GitHub',
    description: 'Version control, Collaboration, Project management'
  },
  {
    iconName: 'SiJavascript',
    iconLibrary: 'si',
    name: 'JavaScript',
    description: 'Modern ES6+, Async programming, API integrations'
  }
];

// For Home page - exclude Express.js and Git & GitHub
export const homeTechnologies = allTechnologies.filter(
  tech => tech.name !== 'Express.js' && tech.name !== 'Git & GitHub'
);

export const aboutTechnologies = allTechnologies;
