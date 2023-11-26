import AmigoForm from '@/components/AmigoForm';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    amigoId: string;
  };
}

export default async function AmigoPage({ params: { amigoId } }: Props) {
  // TODO: Check subscription

  const amigo = await prismadb.amigo.findUnique({
    where: {
      id: amigoId,
    },
  });

  const categories = await prismadb.category.findMany();

  const user = await currentUser();

  if (!amigo && amigoId !== 'new') {
    redirect('/');
  }

  if (!user || (amigo && amigo.userId !== user.id)) {
    redirect('/');
  }

  return <AmigoForm initialData={amigo} categories={categories} />;
}
