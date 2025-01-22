import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  PhoneInput
} from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { usePersonalInfoForm } from './hooks';

interface Props {
  defaultValues?: User;
}

export const PersonalInfoForm = ({ defaultValues }: Props) => {
  const { form, state, functions } = usePersonalInfoForm(defaultValues);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(functions.onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Personal info</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='first_name'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='last_name'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder='+998 XX XXX XX XX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='phone_number'
              control={form.control}
            />
          </CardContent>
          <CardFooter className='border-t px-5 py-3'>
            <Button type='submit' loading={state.isPending}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
