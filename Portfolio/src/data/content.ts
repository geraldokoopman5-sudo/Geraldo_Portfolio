// Edit portfolio copy, image paths, project details and destinations here.
// Keep destinations null until you have real URLs. Null links are visibly disabled.
export interface Project {
  id: string
  name: string
  category: string
  year: string
  description: string
  image: string
  imageAlt?: string
  imageCaption?: string
  screenshots?: { src: string; alt: string; caption: string }[]
  color: string
  summary: string
  contribution: string
  contributionLabel?: string
  technologies: string[]
  technologiesVerified?: boolean
  demoUrl: string | null
}

// Accent colours keep each technology recognisable; darker text tones stay
// readable against the light page background.
export const technologyColors: Record<string, { accent: string; text: string }> = {
  'C#': { accent: '#9b4f96', text: '#803c7b' },
  'ASP.NET Core': { accent: '#512bd4', text: '#512bd4' },
  React: { accent: '#61dafb', text: '#087ea4' },
  TypeScript: { accent: '#3178c6', text: '#2865a6' },
  PostgreSQL: { accent: '#336791', text: '#336791' },
  'SQL Server': { accent: '#cc2927', text: '#b02321' },
  Git: { accent: '#f05032', text: '#b63620' },
}

export const portfolio = {
  name: 'Geraldo Koopman',
  role: 'Software Developer',
  location: { city: 'Cape Town', country: 'South Africa' },
  edition: '2026',
  portrait: {
    src: '/images/portrait.png',
    alt: 'Fictional model used as a placeholder portrait for Geraldo’s portfolio',
    caption: 'Placeholder portrait · Yours goes here',
  },
  introduction: 'I turn ideas into practical digital experiences.',
  description: 'I build web applications with C#, ASP.NET Core, React and TypeScript. Bringing structure to the complex, and care to the details people interact with.',
  biography: 'A Software Developer sprinter with hands-on experience contributing to an investor application and administration portal. Working across C#/.NET backend services, React interfaces and relational databases, with an interest in building maintainable applications, dependable APIs and intuitive user experiences.',
  technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'SQL Server', 'Git'],
  copy: {
    heroTagline: ['Independent thinking.', 'Thoughtful development.'],
    introductionLabel: 'A little introduction',
    workLabel: 'Selected work',
    workHeading: ['A few things', 'I’ve been building.'],
    workDescription: ['From an idea to an interface.', 'Three projects to explore.'],
    workNote: 'Selected projects. Some details and preview images are placeholders.',
    aboutLabel: 'The person behind the code',
    aboutHeading: ['Curious by nature.', 'Developer by craft.'],
    technologiesLabel: 'Tools of the trade',
    contactLabel: 'Have an idea in mind?',
    contactHeading: ['Let’s build', 'something together'],
    contactDescription: 'A conversation is a good place to start.',
    footerNote: 'Built with care & a little curiosity.',
  },
  links: [
    { label: 'Email', detail: 'geraldokoopman5@gmail.com', href: 'mailto:geraldokoopman5@gmail.com' },
    { label: 'GitHub', detail: 'geraldokoopman5-sudo', href: 'https://github.com/geraldokoopman5-sudo' },
    { label: 'LinkedIn', detail: 'Geraldo Koopman', href: 'https://www.linkedin.com/in/geraldo-koopman-53b0363a9/' },
    { label: 'Download CV', detail: 'Coming soon', href: null as string | null },
  ],
}

export const projects: Project[] = [
  {
    id: 'vehicle-booking', name: 'Vehicle Booking System', category: 'Vehicle Booking Application', year: '2026',
    description: 'Demo entry · Vehicle booking details to be added',
    image: '/images/vehicle-booking-preview.svg', color: '#BFA1AD',
    summary: 'Placeholder summary: a vehicle booking system. Replace this text with the actual purpose, booking features and context of your project. The interface shown is an illustrative demo, not a screenshot of the real product.',
    contribution: 'Placeholder: describe your role in the Vehicle Booking System, the parts you built and the decisions you made. Add only verified project details before publishing your final portfolio.',
    technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server'], demoUrl: null,
  },
  {
    id: 'g-stock', name: 'G-Stock', category: 'Inventory & Employee Management', year: '2026',
    description: 'Warehouse stock, low-stock alerts and employee access in one place',
    image: '/images/g-stock-preview.svg', color: '#EEDAE6',
    imageAlt: 'Illustrative G-Stock inventory interface, not a screenshot of the live application',
    imageCaption: 'Illustrative preview · Actual application screenshots to be added',
    screenshots: [], // Add captured images here: { src, alt, caption }.
    summary: 'G-Stock is a full-stack inventory and employee management application that gives teams one place to manage warehouse stock and staff accounts. Products are organised by warehouse and brand, with quantities, storage locations, product images and low-stock alerts. Employees record stock changes, stock managers organise inventory, and staff managers control employee access. Activity history records stock and account changes for traceability, while light and dark themes and workspace restoration support everyday use.',
    contributionLabel: 'Implementation',
    contribution: 'A typed React and TypeScript interface connects to an ASP.NET Core REST API and PostgreSQL database. Role permissions are enforced in the API and interface, with session revocation when account types change. Database transactions and stock validation protect concurrent updates and prevent deletion of inventory that still holds stock. Authentication uses JWT access tokens, HttpOnly refresh cookies, Argon2id password hashing and CSRF protection. Automated frontend tests and backend integration checks cover authentication, permissions, stock operations and account changes.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Npgsql', 'JWT', 'Argon2id', 'Docker', 'Vercel', 'Render'],
    technologiesVerified: true,
    demoUrl: 'https://g-stock-eight.vercel.app/',
  },
  {
    id: 'build-hire', name: 'Build & Hire', category: 'Construction Project Management', year: '2026',
    description: 'Connecting customers, construction companies and their teams',
    image: '/images/build-hire-preview.svg', color: '#BFA1AD',
    imageAlt: 'Illustrative Build & Hire construction concept, not a screenshot of the application',
    imageCaption: 'Illustrative preview · Actual application screenshots to be added',
    summary: 'Build & Hire is a full-stack construction project platform that connects customers with approved companies, from the first request to the final project update. Customers can discover companies, request work, accept quotes and track progress. Companies manage requests, assign workers and showcase completed projects, while administrators oversee company approvals, accounts and simulated EFT payment reviews. Payments are simulated; the application does not transfer money.',
    contributionLabel: 'Implementation',
    contribution: 'A responsive React and TypeScript frontend provides dedicated customer, company, administrator and super administrator workspaces. An ASP.NET Core REST API separates endpoints, application services, domain models and persistence, with Entity Framework Core and PostgreSQL for data storage. JWT authentication and role and ownership checks protect account-specific records. The project includes image uploads, regression and browser workflow checks, GitHub Actions verification and an API Dockerfile.',
    technologies: ['React', 'TypeScript', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core', 'JWT', 'CSS Modules', 'Docker', 'GitHub Actions'],
    technologiesVerified: true,
    demoUrl: null,
  },
]
