import { z } from 'zod';

export const courseQuizSchema = z.object({
  quiz_answers: z.array(
    z.object({
      question: z.number(),
      answer: z.number({ invalid_type_error: 'Answer is required' })
    })
  )
});

export type CourseQuizSchema = z.infer<typeof courseQuizSchema>;
