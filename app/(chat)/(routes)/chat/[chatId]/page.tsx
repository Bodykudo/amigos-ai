import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ChatClient from './components/ChatClient';

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
