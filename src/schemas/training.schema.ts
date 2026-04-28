import { z } from 'zod';

export const trainingProgramSchema = z.object({
  title: z.string().min(2).max(300),
  description: z.string().min(10),
  duration: z.string().min(1).max(100),
  targetGroup: z.string().min(2).max(300),
  heroImage: z.string().url(),
  isActive: z.boolean().default(true),
});

export const trainingSessionSchema = z.object({
  programId: z.number().int().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().min(2).max(300),
  venue: z.string().max(300).optional(),
  fee: z.number().positive(),
  currency: z.string().length(3).default('KES'),
  capacity: z.number().int().positive(),
  status: z.enum(['OPEN', 'FULL', 'CANCELLED', 'COMPLETED']).default('OPEN'),
});

export const trainingRegistrationSchema = z.object({
  sessionId: z.number().int().positive(),
  name: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  organization: z.string().max(200).optional(),
});

export type TrainingProgramInput = z.infer<typeof trainingProgramSchema>;
export type TrainingSessionInput = z.infer<typeof trainingSessionSchema>;
export type TrainingRegistrationInput = z.infer<typeof trainingRegistrationSchema>;
