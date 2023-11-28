'use client';

import BotAvatar from '@/components/BotAvatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { Amigo, Message } from '@prisma/client';
import axios from 'axios';
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from 'lucide-react';
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
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/amigo/${amigo.id}`);

      toast({
        description: 'Amigo deleted successfully',
      });

      router.refresh();
      router.push('/');
    } catch (err) {
      toast({
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
      <div className='flex gap-x-2 items-center'>
        <Button size='icon' variant='ghost' onClick={() => router.back()}>
          <ChevronLeft className='h-8 w-8' />
        </Button>
        <BotAvatar src={amigo.src} />
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='font-bold'>{amigo.name}</p>
            <div className='flex items-center text-xs text-muted-foreground'>
              <MessagesSquare className='h-3 w-3 mr-1' />
              {amigo._count.messages}
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            Created by {amigo.userName}
          </p>
        </div>
      </div>
      {user?.id === amigo.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='secondary'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => router.push(`/amigo/${amigo.id}`)}>
              <Edit className='w-4 h-4 mr-2' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className='w-4 h-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
