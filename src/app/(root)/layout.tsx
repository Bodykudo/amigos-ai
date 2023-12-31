import { auth } from '@clerk/nextjs';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

import { checkSubscription } from '@/lib/subscription';
import { cn } from '@/lib/utils';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const isPro = await checkSubscription();

  return (
    <div className='h-full'>
      <Navbar isUser={userId !== null} isPro={isPro} />
      {userId && (
        <div className='hidden md:flex mt-16 w-20 flex-col fixed inset-y-0'>
          <Sidebar isPro={isPro} />
        </div>
      )}
      <main className={cn('pt-16 h-full', userId !== null && 'md:pl-20')}>
        {children}
      </main>
    </div>
  );
}
