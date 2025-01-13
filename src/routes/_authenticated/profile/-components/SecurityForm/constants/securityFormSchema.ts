import { z } from 'zod';

export const securityFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    password_confirm: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
  })
  .refine(
    (data) => data.password === data.password_confirm,
    () => ({
      message: 'Passwords do not match',
      path: ['password_confirm']
    })
  );

export type SecurityFormSchema = z.infer<typeof securityFormSchema>;
