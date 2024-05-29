import z from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8, 'Password too short'),
  confirmPassword: z.string().min(8, 'Password too short'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterIn = z.infer<typeof registerSchema>;