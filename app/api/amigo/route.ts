import prismadb from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
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

    const amigo = await prismadb.amigo.create({
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

    return NextResponse.json(amigo);
  } catch (error) {
    console.log('[AMIGO_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
