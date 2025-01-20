import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { patchMe } from '@/utils/api/requests';

import { type SecurityFormSchema, securityFormSchema } from '../constants';

export const useSecurityForm = () => {
  const form = useForm<SecurityFormSchema>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      password: '',
      password_confirm: ''
    }
  });

  const patchPersonalInfoMutation = useMutation({
    mutationFn: patchMe,
    onSuccess: () => {
      toast.success('Password updated successfully');
      form.reset();
    }
  });

  const onSubmit = (data: SecurityFormSchema) => {
    patchPersonalInfoMutation.mutate({
      data: { password: data.password }
    });
  };

  return {
    form,
    state: {
      isPending: patchPersonalInfoMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
