import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { postRegister } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

import { registerFormSchema, type RegisterFormSchema } from '../constants';

export const useRegisterForm = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
      password_confirm: ''
    }
  });

  const authStore = useAuth();
  const router = useRouter();
  const postRegisterMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: ({ data }) => {
      toast.success('Registered successfully');
      authStore.setAccessToken(data.result.access_token);
      authStore.setRefreshToken(data.result.refresh_token);
      router.navigate({ to: '/courses' });
    }
  });

  const onSubmit = ({ password_confirm, ...data }: RegisterFormSchema) => {
    postRegisterMutation.mutate({ data });
  };

  return {
    form,
    state: {
      isPending: postRegisterMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
