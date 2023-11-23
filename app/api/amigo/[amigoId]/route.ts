import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { amigoId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.amigoId) {
      return new NextResponse('Amigo ID is required', { status: 400 });
    }

    const amigo = await prismadb.amigo.findUnique({
      where: {
        id: params.amigoId,
      },
    });

    if (!amigo) {
      return new NextResponse('Not Found', { status: 404 });
    }

    if (!user || !user.id || !user.firstName || amigo.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const updatedAmigo = await prismadb.amigo.update({
      where: {
        id: amigo.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.username || user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(updatedAmigo);
  } catch (error) {
    console.log('[AMIGO_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
