import AmigoForm from '@/components/AmigoForm';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

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

  if (!user || (amigo && amigo.userId !== user.id)) {
  }

  return <AmigoForm initialData={amigo} categories={categories} />;
}
