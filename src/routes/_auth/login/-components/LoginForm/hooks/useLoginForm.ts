import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { postLogin } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

import { loginFormSchema, type LoginFormSchema } from '../constants';

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone_number: '',
      password: ''
    }
  });

  const authStore = useAuth();
  const router = useRouter();
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      toast.success('Logged in successfully');
      authStore.setAccessToken(data.result.access_token);
      authStore.setRefreshToken(data.result.refresh_token);
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
