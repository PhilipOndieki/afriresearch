import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(30).optional(),
  organization: z.string().max(200).optional(),
  serviceInterest: z
    .enum([
      'architectural-design',
      'engineering-services',
      'research-consultancy',
      'training-capacity-building',
      'project-supervision',
      'other',
    ])
    .optional(),
  message: z.string().min(10, 'Please provide a little more detail').max(5000),
  attachmentUrl: z.string().url().optional(),
});

export const enquiryUpdateSchema = z.object({
  status: z.enum(['NEW', 'READ', 'REPLIED', 'CLOSED']).optional(),
  notes: z.string().max(5000).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryUpdateInput = z.infer<typeof enquiryUpdateSchema>;
