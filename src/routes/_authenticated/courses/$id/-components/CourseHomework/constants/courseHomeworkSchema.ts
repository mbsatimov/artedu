import { z } from 'zod';

export const courseHomeworkSchema = z.object({
  homework: z.instanceof(File, { message: 'File is required' })
});

export type CourseHomeworkSchema = z.infer<typeof courseHomeworkSchema>;
