import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const personalInfoFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number')
});

export type PersonalInfoFormSchema = z.infer<typeof personalInfoFormSchema>;
