'use client';

import { Button } from '@/components/ui/button';
import { Amigo, Message } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  amigo: Amigo & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export default function ChatHeader({ amigo }: Props) {
  const router = useRouter();
  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
      <div className='flex gap-x-2 items-center'>
        <Button size='icon' variant='ghost' onClick={() => router.back()}>
          <ChevronLeft className='h-8 w-8' />
        </Button>
      </div>
    </div>
  );
}
