'use client';

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Menu, Sparkle } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import ModeToggle from './ModeToggle';
import MobileSidebar from './MobileSidebar';
import { useProModal } from '@/hooks/useProModal';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface NavbarProps {
  isPro: boolean;
}

export default function Navbar({ isPro }: NavbarProps) {
  const proModal = useProModal();

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center'>
        <MobileSidebar isPro={isPro} />
        <Link href='/'>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            amigos.ai
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        {!isPro && (
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
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
}
