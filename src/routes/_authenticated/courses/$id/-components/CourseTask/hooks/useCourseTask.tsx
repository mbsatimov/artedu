import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { postCoursesTask } from '@/utils/api/requests/courses/task';

import type { CourseTaskSchema } from '../constants';

import { courseTaskSchema } from '../constants';

export const useCourseTask = (course: Course) => {
  const { id } = useParams({ from: '/_authenticated/courses/$id/' });
  const form = useForm<CourseTaskSchema>({
    resolver: zodResolver(courseTaskSchema(course.has_homework)),
    defaultValues: {
      quiz_answers: course.task.quiz.map((question) => ({
        question_id: question.id,
        selected_option_id: undefined
      })),
      homework: undefined
    }
  });

  const courseQuizFieldArray = useFieldArray({
    control: form.control,
    name: 'quiz_answers'
  });

  const getCoursesTaskMutation = useMutation({
    mutationFn: postCoursesTask,
    onSuccess: () => {
      toast.success('Tasks uploaded');
    }
  });

  const onSubmit = (data: CourseTaskSchema) => {
    getCoursesTaskMutation.mutate({
      id,
      data,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    });
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
