import { redirect } from 'next/navigation';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import AmigoForm from './_components/AmigoForm';
import prismadb from '@/src/lib/prismadb';
import { checkSubscription } from '@/src/lib/subscription';

interface AmigoPageProps {
  params: {
    amigoId: string;
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
