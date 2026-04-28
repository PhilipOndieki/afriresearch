import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(2).max(300),
  subtitle: z.string().max(500).optional(),
  description: z.string().min(10),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  year: z.number().int().min(1990).max(2100),
  location: z.string().min(2).max(200),
  client: z.string().max(200).optional(),
  coverImage: z.string().url(),
  heroImage: z.string().url().optional(),
  categoryId: z.number().int().positive(),
  serviceId: z.number().int().positive().optional(),
});

export const projectUpdateSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
