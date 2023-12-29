import { Metadata } from 'next';
import SubscriptionButton from './_components/SubscriptionButton';
import { checkSubscription } from '@/lib/subscription';

export const metadata: Metadata = {
  title: 'Amigos AI - Settings',
  openGraph: {
    title: 'Amigos AI - Settings',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  },
  twitter: {
    title: 'Amigos AI - Settings',
  },
};

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return (
    <div className='h-full p-4 space-y-2'>
      <h3 className='text-lg font-medium'>Settings</h3>
      <div className='text-muted-foreground text-sm'>
        {isPro
          ? 'You are currently on a pro plan.'
          : 'You are currently on a free plan.'}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
