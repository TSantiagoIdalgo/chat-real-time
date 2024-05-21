import z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(3, 'Email are required').email('Invalid email'),
  password: z.string().min(8, 'Password is required')
});

export type signInSchema = z.infer<typeof loginSchema>