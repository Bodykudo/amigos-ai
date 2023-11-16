import AmigoForm from '@/components/AmigoForm';
import prismadb from '@/lib/prismadb';

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

  return <AmigoForm initialData={amigo} categories={categories} />;
}
