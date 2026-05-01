import type { ProjectCategory, ProjectWithRelations } from '@/types/project';

export const categories: ProjectCategory[] = [
  {
    id: 1,
    name: 'Residential',
    slug: 'residential',
    description: 'Housing and residential developments',
  },
  {
    id: 2,
    name: 'Commercial',
    slug: 'commercial',
    description: 'Commercial and mixed-use buildings',
  },
  {
    id: 3,
    name: 'Infrastructure',
    slug: 'infrastructure',
    description: 'Roads, utilities, and public infrastructure',
  },
  {
    id: 4,
    name: 'Institutional',
    slug: 'institutional',
    description: 'Government and public sector buildings',
  },
];

const STATIC_IMAGES = {
  interior:
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop',
  detail:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85&auto=format&fit=crop',
};

export const projects: ProjectWithRelations[] = [
  {
    id: 1,
    slug: 'aljazera-residency-south-c',
    title: 'Aljazera Residency',
    subtitle: 'Contemporary residential development in the heart of Nairobi',
    description:
      'A premium residential development in South C, Nairobi, comprising 24 units across four floors. The design prioritises natural ventilation, generous living spaces, and a material palette that references East African architectural heritage while meeting contemporary standards. Completed in 2023.',
    status: 'PUBLISHED',
    featured: true,
    year: 2023,
    location: 'South C, Nairobi',
    client: 'Aljazera Properties Ltd',
    coverImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85&auto=format&fit=crop',
    categoryId: 1,
    serviceId: 1,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    category: categories[0],
    images: [
      {
        id: 1,
        projectId: 1,
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85&auto=format&fit=crop',
        alt: 'Aljazera Residency',
        caption: null,
        isCover: true,
        sortOrder: 0,
      },
      {
        id: 2,
        projectId: 1,
        url: STATIC_IMAGES.interior,
        alt: 'Aljazera Residency interior',
        caption: null,
        isCover: false,
        sortOrder: 1,
      },
      {
        id: 3,
        projectId: 1,
        url: STATIC_IMAGES.detail,
        alt: 'Aljazera Residency detail',
        caption: null,
        isCover: false,
        sortOrder: 2,
      },
    ],
  },
  {
    id: 2,
    slug: 'speakers-residence-mandera',
    title: "Speaker's Residence",
    subtitle: 'Official residence for the Speaker of the Mandera County Assembly',
    description:
      'Designed and supervised for the Mandera County Government, this official residence balances security requirements with a dignified architectural character appropriate for the county capital. The design incorporates passive cooling strategies suited to the hot, semi-arid Mandera climate. Completed in 2024.',
    status: 'PUBLISHED',
    featured: true,
    year: 2024,
    location: 'Mandera Town, Mandera County',
    client: 'Mandera County Government',
    coverImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&auto=format&fit=crop',
    categoryId: 4,
    serviceId: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    category: categories[3],
    images: [
      {
        id: 4,
        projectId: 2,
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85&auto=format&fit=crop',
        alt: "Speaker's Residence",
        caption: null,
        isCover: true,
        sortOrder: 0,
      },
      {
        id: 5,
        projectId: 2,
        url: STATIC_IMAGES.interior,
        alt: "Speaker's Residence interior",
        caption: null,
        isCover: false,
        sortOrder: 1,
      },
      {
        id: 6,
        projectId: 2,
        url: STATIC_IMAGES.detail,
        alt: "Speaker's Residence detail",
        caption: null,
        isCover: false,
        sortOrder: 2,
      },
    ],
  },
  {
    id: 3,
    slug: 'takbir-service-station-thika',
    title: 'Takbir Service Station',
    subtitle: 'Full-service fuel and automotive complex on the Thika Superhighway',
    description:
      'A modern fuel and service station on the Thika Superhighway corridor. The canopy structure draws on the geometry of traditional Swahili rooflines while incorporating high-performance steel and polycarbonate materials. Includes workshop bays, a convenience store, and a small quick-service restaurant. Completed in 2025.',
    status: 'PUBLISHED',
    featured: true,
    year: 2025,
    location: 'Thika Road, Kiambu County',
    client: 'Takbir Investments Ltd',
    coverImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop',
    categoryId: 2,
    serviceId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-06-01T00:00:00.000Z',
    category: categories[1],
    images: [
      {
        id: 7,
        projectId: 3,
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
        alt: 'Takbir Service Station Thika',
        caption: null,
        isCover: true,
        sortOrder: 0,
      },
      {
        id: 8,
        projectId: 3,
        url: STATIC_IMAGES.interior,
        alt: 'Takbir Service Station interior',
        caption: null,
        isCover: false,
        sortOrder: 1,
      },
      {
        id: 9,
        projectId: 3,
        url: STATIC_IMAGES.detail,
        alt: 'Takbir Service Station detail',
        caption: null,
        isCover: false,
        sortOrder: 2,
      },
    ],
  },
  {
    id: 4,
    slug: 'takbir-service-station-mandera',
    title: 'Takbir Service Station Mandera',
    subtitle: 'Fuel and service complex serving the Mandera commercial corridor',
    description:
      'A sister project to the Thika station, this facility serves the busy commercial corridor in Mandera Town. The design adapts to the local climate with deep overhangs and cross-ventilated service bays. Completed in 2025.',
    status: 'PUBLISHED',
    featured: false,
    year: 2025,
    location: 'Mandera Town, Mandera County',
    client: 'Takbir Investments Ltd',
    coverImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=85&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=85&auto=format&fit=crop',
    categoryId: 2,
    serviceId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-06-01T00:00:00.000Z',
    category: categories[1],
    images: [
      {
        id: 10,
        projectId: 4,
        url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=85&auto=format&fit=crop',
        alt: 'Takbir Service Station Mandera',
        caption: null,
        isCover: true,
        sortOrder: 0,
      },
      {
        id: 11,
        projectId: 4,
        url: STATIC_IMAGES.interior,
        alt: 'Takbir Mandera interior',
        caption: null,
        isCover: false,
        sortOrder: 1,
      },
      {
        id: 12,
        projectId: 4,
        url: STATIC_IMAGES.detail,
        alt: 'Takbir Mandera detail',
        caption: null,
        isCover: false,
        sortOrder: 2,
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectWithRelations | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectWithRelations[] {
  return projects.filter((p) => p.featured && p.status === 'PUBLISHED');
}

export function getPublishedProjects(): ProjectWithRelations[] {
  return projects.filter((p) => p.status === 'PUBLISHED');
}

export function getRelatedProjects(
  categoryId: number,
  excludeSlug: string,
): ProjectWithRelations[] {
  return projects
    .filter(
      (p) => p.status === 'PUBLISHED' && p.categoryId === categoryId && p.slug !== excludeSlug,
    )
    .slice(0, 3);
}
