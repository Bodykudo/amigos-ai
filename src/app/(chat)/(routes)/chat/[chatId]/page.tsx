import { redirect } from 'next/navigation';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import ChatClient from './_components/ChatClient';
import prismadb from '@/src/lib/prismadb';

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params: { chatId } }: ChatPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const amigo = await prismadb.amigo.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!amigo) {
    redirect('/');
  }

  return <ChatClient amigo={amigo} />;
}
