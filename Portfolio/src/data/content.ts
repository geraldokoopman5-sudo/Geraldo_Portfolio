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
  technologies: string[]
  demoUrl: string | null
  sourceUrl: string | null
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
  biography: 'I’m Geraldo, a software developer based in Cape Town, South Africa. I’m interested in the space where thoughtful interfaces meet well-structured code — and in turning everyday problems into useful digital experiences.',
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
    biographyNote: 'Placeholder biography — ready for your own story.',
    technologiesLabel: 'Tools of the trade',
    contactLabel: 'Have an idea in mind?',
    contactHeading: ['Let’s build', 'something together'],
    contactDescription: 'A conversation is a good place to start.',
    contactNote: 'Demo contact details — destinations will be added here.',
    footerNote: 'Built with care & a little curiosity.',
  },
  links: [
    { label: 'Email', href: null as string | null },
    { label: 'GitHub', href: null as string | null },
    { label: 'LinkedIn', href: null as string | null },
    { label: 'Download CV', href: null as string | null },
  ],
}

export const projects: Project[] = [
  {
    id: 'vehicle-booking', name: 'Vehicle Booking System', category: 'Vehicle Booking Application', year: 'Year — TBD',
    description: 'Demo entry · Vehicle booking details to be added',
    image: '/images/vehicle-booking-preview.svg', color: '#BFA1AD',
    summary: 'Placeholder summary: a vehicle booking system. Replace this text with the actual purpose, booking features and context of your project. The interface shown is an illustrative demo, not a screenshot of the real product.',
    contribution: 'Placeholder: describe your role in the Vehicle Booking System, the parts you built and the decisions you made. Add only verified project details before publishing your final portfolio.',
    technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server'], demoUrl: null, sourceUrl: null,
  },
  {
    id: 'g-stock', name: 'G-Stock', category: 'Inventory Management', year: 'Year — TBD',
    description: 'Inventory management · Explore the live application',
    image: '/images/g-stock-preview.svg', color: '#EEDAE6',
    imageAlt: 'Illustrative G-Stock inventory interface, not a screenshot of the live application',
    imageCaption: 'Illustrative preview · Actual application screenshots to be added',
    screenshots: [], // Add captured images here: { src, alt, caption }.
    summary: 'G-Stock is an inventory management web application. Explore the deployed application using the live project link.',
    contribution: 'Placeholder: add your contribution to the interface, application logic or data layer, along with any relevant design and development decisions.',
    technologies: ['React', 'TypeScript', 'ASP.NET Core', 'PostgreSQL'], demoUrl: 'https://g-stock-eight.vercel.app/', sourceUrl: null,
  },
  {
    id: 'build-hire', name: 'Build & Hire', category: 'Web Application', year: 'Year — TBD',
    description: 'Demo entry · Project details to be added',
    image: '/images/build-hire-preview.svg', color: '#BFA1AD',
    summary: 'Placeholder summary: a web application concept for Build & Hire. Add the real project background and intended user journey here. This visual is a demo direction, not a claim about the finished application.',
    contribution: 'Placeholder: explain your responsibilities, the features you implemented and how you approached building the application.',
    technologies: ['React', 'TypeScript', 'C#', 'ASP.NET Core', 'Git'], demoUrl: null, sourceUrl: null,
  },
]
