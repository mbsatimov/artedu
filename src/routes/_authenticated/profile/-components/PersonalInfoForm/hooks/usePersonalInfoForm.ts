import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { patchPersonalInfo } from '@/utils/api/requests';

import { personalInfoFormSchema, type PersonalInfoFormSchema } from '../constants';

export const usePersonalInfoForm = (defaultValues?: User) => {
  const form = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      first_name: defaultValues?.first_name || '',
      last_name: defaultValues?.last_name || '',
      phone_number: defaultValues?.phone_number || ''
    }
  });

  const patchPersonalInfoMutation = useMutation({
    mutationFn: patchPersonalInfo,
    onSuccess: () => {
      toast.success('Logged in successfully');
    }
  });

  const onSubmit = (data: PersonalInfoFormSchema) => {
    patchPersonalInfoMutation.mutate({ data });
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
