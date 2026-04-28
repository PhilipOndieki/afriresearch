export const siteConfig = {
  name: 'Insight AfriResearch Ltd',
  tagline: 'Design. Research. Training.',
  description:
    'Nairobi-based multidisciplinary firm specialising in Architectural Design, Engineering Services, Research and Consultancy, Training and Capacity Building, and Project Supervision.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://insightafriresearch.com',
  contact: {
    email: 'insightafri@gmail.com',
    phone: '020 800 5000',
    mobile: '0721 997 800',
    address: '4th Floor, Hughes Building, Kenyatta Avenue, Nairobi, Kenya',
  },
  social: {
    linkedin: 'https://linkedin.com/company/insight-afriresearch',
    twitter: 'https://twitter.com/insightafri',
  },
  credentials: {
    registrationNumber: 'BN/2018/034521',
    ncaRegistration: 'NCA/2018/1456',
    aakMembership: 'AAK/M/2018/0892',
  },
  ogImage: '/og-default.jpg',
} as const;
