import prismadb from '@/lib/prismadb';
import Amigos from '@/components/Amigos';
import Categories from '@/components/Categories';
import SearchInput from '@/components/SearchInput';

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function RootPage({
  searchParams: { categoryId, name },
}: RootPageProps) {
  const data = await prismadb.amigo.findMany({
    where: {
      categoryId,
      name: {
        search: name,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Amigos data={data} />
    </div>
  );
}
