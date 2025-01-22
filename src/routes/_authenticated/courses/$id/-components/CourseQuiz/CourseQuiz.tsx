import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Spinner
} from '@/components/ui';

import { useCourseQuiz } from './hooks';

interface Props {
  course: Course;
}

export const CourseQuiz = ({ course }: Props) => {
  const { form, state, functions } = useCourseQuiz(course);

  return (
    <Form {...form}>
      <form
        className='my-10 border-l-2 border-primary pl-4'
        onSubmit={form.handleSubmit(functions.onSubmit)}
      >
        <h2 className='pb-4 text-xl font-semibold'>Quiz</h2>
        <div className='space-y-4 [&_img]:rounded-sm'>
          {course.questions.map((question, index) => (
            <div key={question.id}>
              <div className='group/question flex gap-3'>
                <div className='grid size-6 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground'>
                  {index + 1}
                </div>
                <div className='flex-1' dangerouslySetInnerHTML={{ __html: question.question }} />
              </div>
              <div className='ml-5 space-y-3 py-3'>
                <FormField
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormControl>
                        <RadioGroup
                          value={String(field.value)}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          {question.answers.map((option, index) => (
                            <FormItem
                              key={option.id}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <span className='font-semibold'>{index + 1}</span>
                              <FormControl>
                                <RadioGroupItem
                                  id={`${question.id}-${option.id}`}
                                  value={String(option.id)}
                                />
                              </FormControl>
                              <FormLabel
                                className='font-normal'
                                htmlFor={`${question.id}-${option.id}`}
                              >
                                {option.answer}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={`quiz_answers.${index}.answer`}
                  control={form.control}
                />
              </div>
            </div>
          ))}
        </div>
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
