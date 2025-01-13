import { CheckIcon } from '@radix-ui/react-icons';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CommandIcon } from 'lucide-react';

import { AppHeaderThemeSwitch, Main } from '@/components/Layout';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const HomePage = () => {
  return (
    <div>
      <header className='sticky left-0 top-0 z-50 gap-3 bg-background h-16'>
        <div className='flex items-center justify-between px-4 max-w-7xl mx-auto gap-3 h-full'>
          <Link to='/'>
            <div className='flex gap-1 items-center justify-center'>
              <CommandIcon />
              <h1 className='text-xl font-medium'>ARTEDU</h1>
            </div>
          </Link>
          <div className='ml-auto flex items-center space-x-4'>
            <AppHeaderThemeSwitch />
            <Button asChild>
              <Link to='/login'>Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <Main>
        <div className='grid h-full grid-cols-1 bg-primary py-10 md:py-14 lg:py-20 rounded-[40px] px-8 lg:px-16 xl:px-32 sm:gap-8 md:gap-16 lg:gap-24 items-center md:grid-cols-2'>
          <div className='text-center md:text-start text-white'>
            <h1 className='text-2xl lg:text-4xl py-4 font-bold'>
              Join the ARTEDU courses and learn new skills
            </h1>
            <p className='text-white leading-7'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid at commodi
              debitis dolores ea eaque enim ex facere harum inventore minima odio odit, quia
              quisquam quos reiciendis reprehenderit voluptas.
            </p>
            <Button asChild className='mt-6' size='lg' variant='secondary'>
              <Link to='/register'>Register now</Link>
            </Button>
          </div>
          <div className='hidden md:block'>
            <img alt='Hero Image' className='aspect-square' src='/hero-img.png' />
          </div>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-5 py-10 sm:mt-6 sm:py-0'>
          <Card>
            <CardHeader>
              <div className='flex size-12 items-center justify-center rounded-[16px] bg-primary text-white'>
                <CheckIcon className='size-6' />
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <CardTitle className='italic'>Lorem ipsum.</CardTitle>
              <CardDescription>
                Loremk ipsum dolor sit amet, consectetur adipisicing elit. Animi, ducimus.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className='flex size-12 items-center justify-center rounded-[16px] bg-primary text-white'>
                <CheckIcon className='size-6' />
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <CardTitle className='italic'>Lorem ipsum.</CardTitle>
              <CardDescription>
                Loremk ipsum dolor sit amet, consectetur adipisicing elit. Animi, ducimus.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className='flex size-12 items-center justify-center rounded-[16px] bg-primary text-white'>
                <CheckIcon className='size-6' />
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <CardTitle className='italic'>Lorem ipsum.</CardTitle>
              <CardDescription>
                Loremk ipsum dolor sit amet, consectetur adipisicing elit. Animi, ducimus.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Main>
    </div>
  );
};

export const Route = createLazyFileRoute('/')({
  component: HomePage
});
