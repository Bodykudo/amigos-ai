'use client';

import { Amigo, Message } from '@prisma/client';
import ChatHeader from './ChatHeader';

interface ChatClientProps {
  amigo: Amigo & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export function ChatClient({ amigo }: ChatClientProps) {
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader amigo={amigo} />
    </div>
  );
}
