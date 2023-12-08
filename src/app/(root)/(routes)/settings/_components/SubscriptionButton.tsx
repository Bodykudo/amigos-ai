'use client';

import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { useToast } from '@/src/components/ui/use-toast';

type SubscriptionButtonProps = {
  isPro: boolean;
};

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false); // [1
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size='sm'
      variant={isPro ? 'default' : 'premium'}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Sparkles className='h-4 w-4 ml-2 fill-white' />}
    </Button>
  );
}
