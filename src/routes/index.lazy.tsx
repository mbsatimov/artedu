import { AvatarIcon, CheckIcon } from '@radix-ui/react-icons';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { CommandIcon } from 'lucide-react';

import { AppHeaderThemeSwitch, Main } from '@/components/Layout';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { useAuth } from '@/utils/stores';

const HomePage = () => {
  const { accessToken } = useAuth();
  return (
    <div>
      <header className='sticky left-0 top-0 z-50 h-16 gap-3 bg-background'>
        <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4'>
          <Link to='/'>
            <div className='flex items-center justify-center gap-1'>
              <CommandIcon />
              <h1 className='text-xl font-medium'>ARTEDU</h1>
            </div>
          </Link>
          <div className='ml-auto flex items-center space-x-4'>
            <AppHeaderThemeSwitch />
            {accessToken ? (
              <Button asChild size='iconSm' variant='secondary'>
                <Link to='/courses'>
                  <AvatarIcon className='!size-5' />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to='/login'>Kirish</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <Main>
        <div className='grid h-full grid-cols-1 items-center rounded-[40px] bg-primary px-8 py-10 sm:gap-8 md:grid-cols-2 md:gap-16 md:py-14 lg:gap-24 lg:px-16 lg:py-20 xl:px-32'>
          <div className='order-2 text-center text-white md:order-1 md:text-start'>
            <h1 className='py-4 text-2xl font-bold lg:text-4xl'>
              ARTEDU – Onlayn ta&apos;limning yangi darajasi!
            </h1>
            <p className='leading-7 text-white'>
              Ushbu platforma bo&apos;lajak muhandislarga qo&apos;lda va kompyuterda chizmalar
              yaratishning ilmiy asoslari, terminologiyasi va xalqaro standartlari bilan qulay
              tanishish imkonini beradi.
            </p>
            <Button asChild className='mt-6' size='lg' variant='secondary'>
              <Link to='/register'>Hozir ro&apos;yxatdan o&apos;ting</Link>
            </Button>
          </div>
          <div className='order-1 mx-auto w-full max-w-[350px] md:order-2 md:max-w-none'>
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
              <CardTitle className='italic'>Video darslar</CardTitle>
              <CardDescription>
                Har bir mavzu uchun sifatli va tushunarli dars materiallari.
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
              <CardTitle className='italic'>Moslashuvchan o&apos;qish</CardTitle>
              <CardDescription>
                Har qanday qurilmada, istalgan joyda o&apos;rganing.
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
              <CardTitle className='italic'>Test topshiriqlar</CardTitle>
              <CardDescription>
                Bilimlaringizni mustahkamlash uchun interaktiv testlar.
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
