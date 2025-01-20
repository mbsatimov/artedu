import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { handleFormServerErrors } from '@/lib/utils.ts';
import { postCoursesHomework } from '@/utils/api/requests';

import { courseHomeworkSchema, type CourseHomeworkSchema } from '../constants';

export const useCourseHomework = () => {
  const { id } = useParams({ from: '/_authenticated/courses/$id/' });
  const form = useForm<CourseHomeworkSchema>({
    resolver: zodResolver(courseHomeworkSchema),
    defaultValues: {
      homework: undefined
    }
  });

  const getCoursesTaskMutation = useMutation({
    mutationFn: postCoursesHomework,
    onSuccess: () => {
      toast.success('Tasks uploaded');
    },
    onError: (error) => {
      handleFormServerErrors(error, form.setError);
    }
  });

  const onSubmit = (data: CourseHomeworkSchema) => {
    const fd = new FormData();
    fd.append('file', data.homework);
    getCoursesTaskMutation.mutate({ id, data: fd });
  };

  return {
    form,
    state: {
      isPending: getCoursesTaskMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
