import { z } from 'zod';

export const courseTaskSchema = (hasHomework: boolean) =>
  z.object({
    quiz_answers: z.array(
      z.object({
        question_id: z.number(),
        selected_option_id: z.number({ invalid_type_error: 'Answer is required' })
      })
    ),
    homework: hasHomework
      ? z.instanceof(File, { message: 'File is required' })
      : z.instanceof(File).optional()
  });

export type CourseTaskSchema = z.infer<ReturnType<typeof courseTaskSchema>>;
