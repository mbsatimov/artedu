import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner
} from '@/components/ui';

import { useCourseHomework } from './hooks';

export const CourseHomework = () => {
  const { form, state, functions } = useCourseHomework();

  return (
    <Form {...form}>
      <form
        className='pl-4 border-l-2 border-primary my-10'
        onSubmit={form.handleSubmit(functions.onSubmit)}
      >
        <h2 className='text-xl pt-2 pb-4 font-semibold'>Homework</h2>
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Homework file(PDF, Excel, PPT, Zip)</FormLabel>
              <FormControl>
                <Input
                  accept='.pdf,.xls,.xlsx,.ppt,.pptx,.zip'
                  type='file'
                  onChange={(e) => e.target.files && field.onChange(e.target.files[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='homework'
          control={form.control}
        />
        <div className='mt-4 gap-2'>
          <Button disabled={state.isPending} size='lg' type='submit'>
            <Spinner show={state.isPending} />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
