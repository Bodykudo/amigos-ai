import AmigoForm from '@/components/AmigoForm';
import prismadb from '@/lib/prismadb';
import { auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    amigoId: string;
  };
}

export default async function AmigoPage({ params: { amigoId } }: Props) {
  const { userId } = auth();

  const amigo = await prismadb.amigo.findUnique({
    where: {
      id: amigoId,
    },
  });

  const categories = await prismadb.category.findMany();

  if (!userId) {
    redirectToSignIn();
  }

  if (!amigo && amigoId !== 'new') {
    redirect('/');
  }

  if (amigo && amigo.userId !== userId) {
    redirect('/');
  }

  return <AmigoForm initialData={amigo} categories={categories} />;
}
