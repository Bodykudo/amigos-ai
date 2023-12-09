'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { useTheme } from 'next-themes';
import { UserButton } from '@clerk/nextjs';
import { Sparkle } from 'lucide-react';

import { Button } from './ui/button';
import ModeToggle from './ModeToggle';
import MobileSidebar from './MobileSidebar';
import { useProModal } from '@/src/hooks/useProModal';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface NavbarProps {
  isUser: boolean;
  isPro: boolean;
}

export default function Navbar({ isUser, isPro }: NavbarProps) {
  const router = useRouter();
  const proModal = useProModal();
  const { resolvedTheme } = useTheme();

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center'>
        <MobileSidebar isPro={isPro} />
        <Link href='/'>
          <div className='relative w-14 h-14 md:h-16 md:w-64'>
            <Image
              src={
                resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'
              }
              alt='amigos.ai'
              className='hidden md:block'
              fill
            />
            <Image
              src='/favicon-light.png'
              alt='logo'
              fill
              className='block md:hidden'
            />
          </div>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        {isUser && !isPro && (
          <Button
            variant='premium'
            size='sm'
            className='hover:opacity-90'
            onClick={proModal.onOpen}
          >
            Upgrade
            <Sparkle className='h-4 w-4 fill-white text-white ml-2' />
          </Button>
        )}
        {!isUser && (
          <>
            <Button
              variant='default'
              size='sm'
              className='hover:opacity-90'
              onClick={() => router.push('/sign-in')}
            >
              Sign in
            </Button>
            <Button
              variant='premium'
              size='sm'
              className='hover:opacity-90'
              onClick={() => router.push('/sign-up')}
            >
              Sign up
            </Button>
          </>
        )}
        <ModeToggle />
        {isUser && <UserButton afterSignOutUrl='/' />}
      </div>
    </div>
  );
}
