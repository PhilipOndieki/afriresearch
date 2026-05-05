import type { ProjectCategory, ProjectWithRelations } from '@/types/project';
import { images } from '@/config/images';


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
    coverImage: images.projects.aljazeraResidency,
    heroImage: images.projects.aljazeraResidency,
    categoryId: 1,
    serviceId: 1,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    category: categories[0],
    images: [
      {
        id: 1,
        projectId: 1,
        url: images.projects.aljazeraResidency,
        alt: 'Aljazera Residency',
        caption: null,
        isCover: true,
        sortOrder: 0,
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
    coverImage: images.projects.speakersResidence,
    heroImage: images.projects.speakersResidence,
    categoryId: 4,
    serviceId: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    category: categories[3],
    images: [
      {
        id: 4,
        projectId: 2,
        url: images.projects.speakersResidence,
        alt: "Speaker's Residence",
        caption: null,
        isCover: true,
        sortOrder: 0,
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
    coverImage: images.projects.takbirThika,
    heroImage: images.projects.takbirThika,
    categoryId: 2,
    serviceId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-06-01T00:00:00.000Z',
    category: categories[1],
    images: [
      {
        id: 7,
        projectId: 3,
        url: images.projects.takbirThika,
        alt: 'Takbir Service Station Thika',
        caption: null,
        isCover: true,
        sortOrder: 0,
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
    coverImage: images.projects.takbirMandera,
    heroImage: images.projects.takbirMandera,
    categoryId: 2,
    serviceId: 1,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-06-01T00:00:00.000Z',
    category: categories[1],
    images: [
      {
        id: 10,
        projectId: 4,
        url: images.projects.takbirMandera,
        alt: 'Takbir Service Station Mandera',
        caption: null,
        isCover: true,
        sortOrder: 0,
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
