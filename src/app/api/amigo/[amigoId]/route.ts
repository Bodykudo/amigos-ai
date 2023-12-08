import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';

import prismadb from '@/src/lib/prismadb';
import { checkSubscription } from '@/src/lib/subscription';

export async function PATCH(
  req: Request,
  { params: { amigoId } }: { params: { amigoId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!amigoId) {
      return new NextResponse('Amigo ID is required', { status: 400 });
    }

    const amigo = await prismadb.amigo.findUnique({
      where: {
        id: amigoId,
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

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse('Pro subscription required', { status: 403 });
    }

    const updatedAmigo = await prismadb.amigo.update({
      where: {
        id: amigo.id,
        userId: user.id,
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

export async function DELETE({
  params: { amigoId },
}: {
  params: { amigoId: string };
}) {
  try {
    const { userId } = auth();

    if (!amigoId) {
      return new NextResponse('Amigo ID is required', { status: 400 });
    }

    const amigo = await prismadb.amigo.findUnique({
      where: {
        id: amigoId,
      },
    });

    if (!amigo) {
      return new NextResponse('Not Found', { status: 404 });
    }

    if (!userId || amigo.userId !== userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prismadb.amigo.delete({
      where: {
        userId,
        id: amigo.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log('[AMIGO_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
