import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Spinner
} from '@/components/ui';

import { useCourseTask } from './hooks';

interface Props {
  course: Course;
}

export const CourseTask = ({ course }: Props) => {
  const { form, state, functions } = useCourseTask(course);

  return (
    <Form {...form}>
      <form
        className='pl-4 border-l-2 border-primary my-10'
        onSubmit={form.handleSubmit(functions.onSubmit)}
      >
        <h2 className='text-xl pb-4 font-semibold'>Quiz</h2>
        {course.task.quiz.map((question, index) => (
          <div key={question.id}>
            <div className='flex items-center group/question gap-3'>
              <div className='rounded-full shrink-0 bg-primary text-sm text-primary-foreground size-5 grid place-items-center'>
                {index + 1}
              </div>
              <div className='flex-1' dangerouslySetInnerHTML={{ __html: question.question }} />
            </div>
            <div className='space-y-3 ml-5 py-3'>
              <FormField
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormControl>
                      <RadioGroup
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        {question.options.map((option) => (
                          <FormItem
                            key={option.id}
                            className='flex items-center space-x-3 space-y-0'
                          >
                            <FormControl>
                              <RadioGroupItem
                                id={`${question.id}-${option.id}`}
                                value={String(option.id)}
                              />
                            </FormControl>
                            <span className='font-semibold'>{option.id}.</span>
                            <FormLabel
                              className='font-normal'
                              htmlFor={`${question.id}-${option.id}`}
                            >
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={`quiz_answers.${index}.selected_option_id`}
                control={form.control}
              />
            </div>
          </div>
        ))}
        {course.has_homework && (
          <>
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
                  <FormDescription>
                    Please upload your homework. This is important form your academic performance!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              name='homework'
              control={form.control}
            />
          </>
        )}
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
