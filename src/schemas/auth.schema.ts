import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type SignInInput = z.infer<typeof signInSchema>;
