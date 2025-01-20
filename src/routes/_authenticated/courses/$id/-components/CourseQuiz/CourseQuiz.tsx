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
        className='pl-4 border-l-2 border-primary my-10'
        onSubmit={form.handleSubmit(functions.onSubmit)}
      >
        <h2 className='text-xl pb-4 font-semibold'>Quiz</h2>
        <div className='space-y-4 [&_img]:rounded-sm'>
          {course.questions.map((question, index) => (
            <div key={question.id}>
              <div className='flex group/question gap-3'>
                <div className='rounded-full shrink-0 bg-primary text-sm text-primary-foreground size-6 grid place-items-center'>
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
