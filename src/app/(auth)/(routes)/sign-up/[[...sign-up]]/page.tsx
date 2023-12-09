'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className='relative w-14 h-14 md:h-16 md:w-64'>
        <Image
          src={resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
          alt='logo'
          fill
        />
      </div>
      <SignUp />
    </>
  );
}
