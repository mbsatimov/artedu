import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { handleFormServerErrors } from '@/lib/utils.ts';
import { postCoursesQuiz } from '@/utils/api/requests';

import { courseQuizSchema, type CourseQuizSchema } from '../constants';

export const useCourseQuiz = (course: Course) => {
  const { id } = useParams({ from: '/_authenticated/courses/$id/' });
  const form = useForm<CourseQuizSchema>({
    resolver: zodResolver(courseQuizSchema),
    defaultValues: {
      quiz_answers: course.questions.map((question) => ({
        question: question.id,
        answer: undefined
      }))
    }
  });

  const courseQuizFieldArray = useFieldArray({
    control: form.control,
    name: 'quiz_answers'
  });

  const getCoursesTaskMutation = useMutation({
    mutationFn: postCoursesQuiz,
    onSuccess: () => {
      toast.success('Tasks uploaded');
    },
    onError: (error) => {
      handleFormServerErrors(error, form.setError);
    }
  });

  const onSubmit = (data: CourseQuizSchema) => {
    getCoursesTaskMutation.mutate({ id, data: data.quiz_answers });
  };

  return {
    form,
    courseQuizFieldArray,
    state: {
      isPending: getCoursesTaskMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
