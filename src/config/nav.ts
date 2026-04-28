export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const navItems: NavItem[] = [
  { label: 'Services', href: '/services', description: 'What we do' },
  { label: 'Projects', href: '/projects', description: 'Selected work' },
  { label: 'About', href: '/about', description: 'Who we are' },
  { label: 'Training', href: '/training', description: 'Capacity building' },
  { label: 'Contact', href: '/contact', description: 'Get in touch' },
];

export const footerLinks = {
  services: [
    { label: 'Architectural Design', href: '/services#architectural-design' },
    { label: 'Engineering Services', href: '/services#engineering-services' },
    { label: 'Research and Consultancy', href: '/services#research-consultancy' },
    { label: 'Training and Capacity Building', href: '/services#training-capacity-building' },
    { label: 'Project Supervision', href: '/services#project-supervision' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Training', href: '/training' },
    { label: 'Contact', href: '/contact' },
  ],
};
