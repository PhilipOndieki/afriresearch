export type ProjectStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ProjectCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
};

export type ProjectImage = {
  id: number;
  projectId: number;
  url: string;
  alt: string;
  caption: string | null;
  sortOrder: number;
  isCover: boolean;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  status: ProjectStatus;
  featured: boolean;
  year: number;
  location: string;
  client: string | null;
  coverImage: string;
  heroImage: string | null;
  categoryId: number;
  serviceId: number | null;
  createdAt: string;
  updatedAt: string;
  category?: ProjectCategory;
  images?: ProjectImage[];
};

export type ProjectWithRelations = Project & {
  category: ProjectCategory;
  images: ProjectImage[];
};
