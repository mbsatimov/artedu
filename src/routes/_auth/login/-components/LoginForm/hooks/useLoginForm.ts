import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { postLogin } from '@/utils/api/requests';

import { loginFormSchema, type LoginFormSchema } from '../constants';

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone_number: '',
      password: ''
    }
  });

  const router = useRouter();
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      toast.success('Logged in successfully');
    },
    onError: () => {
      router.navigate({ to: '/courses' });
    }
  });

  const onSubmit = (data: LoginFormSchema) => {
    postLoginMutation.mutate({ data });
  };

  return {
    form,
    state: {
      isPending: postLoginMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
