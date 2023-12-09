'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SignIn } from '@clerk/nextjs';

export default function Signinpage() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className='relative h-16 w-64'>
        <Image
          src={resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
          alt='logo'
          fill
        />
      </div>
      <SignIn />
    </>
  );
}
