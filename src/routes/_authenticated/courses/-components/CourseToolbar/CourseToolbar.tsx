import { XIcon } from 'lucide-react';

import { SearchQueryInput } from '@/components/SearchQueryInput.tsx';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';

import { useCourseToolbar } from './hooks';

export const CourseToolbar = () => {
  const { state, functions } = useCourseToolbar();

  return (
    <div className='flex items-center gap-4'>
      <SearchQueryInput />
      <Select value={state.currentCategory} onValueChange={functions.setCurrentCategory}>
        <div className='flex gap-2'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          {state.currentCategory && (
            <Button
              size='icon'
              variant='destructive'
              onClick={() => functions.setCurrentCategory('')}
            >
              <XIcon />
            </Button>
          )}
        </div>
        <SelectContent>
          {state.categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
