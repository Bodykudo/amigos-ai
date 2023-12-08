'use client';

import { useTheme } from 'next-themes';
import { BeatLoader } from 'react-spinners';
import { CopyIcon } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { useToast } from '@/src/components/ui/use-toast';
import UserAvatar from '@/src/components/UserAvatar';
import BotAvatar from '@/src/components/BotAvatar';

import { cn } from '@/src/lib/utils';

export interface ChatMessageProps {
  role: 'system' | 'user';
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export default function ChatMessage({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    toast({
      description: 'Message copied to clipboard',
    });
  };

  return (
    <div
      className={cn(
        'group flex items-start gap-x-3 py-4 w-full',
        role === 'user' && 'justify-end'
      )}
    >
      {role !== 'user' && src && <BotAvatar src={src} />}
      <div className='rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10'>
        {isLoading ? (
          <BeatLoader size={5} color={theme === 'light' ? 'black' : 'white'} />
        ) : (
          content
        )}
      </div>
      {role === 'user' && <UserAvatar />}
      {role !== 'user' && !isLoading && (
        <Button
          size='icon'
          variant='ghost'
          onClick={onCopy}
          className='opacity-0 group-hover:opacity-100 transition'
        >
          <CopyIcon className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
