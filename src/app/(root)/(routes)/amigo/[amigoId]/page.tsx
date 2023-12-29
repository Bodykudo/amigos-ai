import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import AmigoForm from './_components/AmigoForm';
import prismadb from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';

interface AmigoPageProps {
  params: {
    amigoId: string;
  };
}

export async function generateMetadata({
  params: { amigoId },
}: AmigoPageProps): Promise<Metadata> {
  if (amigoId === 'new') {
    return {
      title: 'Amigos AI - Create Amigo',
      description: 'Create your own amigos using AI!',
      openGraph: {
        title: 'Amigos AI - Create Amigo',
        description: 'Create your own amigos using AI!',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/amigo/new`,
      },
      twitter: {
        title: 'Amigos AI - Create Amigo',
        description: 'Create your own amigos using AI!',
      },
    };
  }

  const amigo = await prismadb.amigo.findUnique({
    where: {
      id: amigoId,
    },
  });

  if (!amigo) {
    return {};
  }

  return {
    title: `Amigos AI - Edit Amigo: ${amigo.name}`,
    openGraph: {
      title: `Amigos AI - Edit Amigo: ${amigo.name}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/amigo/${amigoId}`,
    },
    twitter: {
      title: `Amigos AI - Edit Amigo: ${amigo.name}`,
    },
  };
}

export default async function AmigoPage({
  params: { amigoId },
}: AmigoPageProps) {
  const { userId } = auth();
  const isPro = await checkSubscription();

  const amigo = await prismadb.amigo.findUnique({
    where: {
      id: amigoId,
    },
  });

  const categories = await prismadb.category.findMany();

  // Check if user is logged in
  if (!userId) {
    redirectToSignIn();
  }

  // Check if user is pro or not
  if (!isPro) {
    redirect('/settings');
  }

  // Check if amigo exists and if it belongs to the user
  if ((!amigo && amigoId !== 'new') || (amigo && amigo.userId !== userId)) {
    redirect('/');
  }

  return <AmigoForm initialData={amigo} categories={categories} />;
}
