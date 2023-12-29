import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import ChatClient from './_components/ChatClient';
import prismadb from '@/lib/prismadb';

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export async function generateMetadata({
  params: { chatId },
}: ChatPageProps): Promise<Metadata> {
  const amigo = await prismadb.amigo.findUnique({
    where: {
      id: chatId,
    },
  });

  if (!amigo) {
    return {};
  }

  return {
    title: `Amigos AI - Chat With ${amigo.name}`,
    description: `Chat with ${amigo.name}, a ${amigo.description} using Amigos AI`,
    openGraph: {
      title: `Amigos AI - Chat With ${amigo.name}`,
      description: `Chat with ${amigo.name}, a ${amigo.description} using Amigos AI`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/chat/${chatId}`,
      images: [amigo.src, `${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
    },
    twitter: {
      title: `Amigos AI - Chat With ${amigo.name}`,
      description: `Chat with ${amigo.name}, a ${amigo.description} using Amigos AI`,
      card: 'summary',
      images: [amigo.src, `${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`],
    },
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
