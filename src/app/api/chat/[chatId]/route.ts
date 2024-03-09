import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { StreamingTextResponse, LangChainStream } from 'ai';
import { Replicate } from 'langchain/llms/replicate';
import { CallbackManager } from 'langchain/callbacks';

import prismadb from '@/lib/prismadb';
import { MemoryManager } from '@/lib/memory';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(
  request: Request,
  { params: { chatId } }: { params: { chatId: string } }
) {
  try {
    const { prompt } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const identifier = request.url + '-' + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    const amigo = await prismadb.amigo.update({
      where: {
        id: chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: 'user',
            userId: user.id,
          },
        },
      },
    });

    if (!amigo) {
      return new NextResponse('Amigo not found', { status: 404 });
    }

    const name = amigo.id;
    const amigoFileName = name + '.txt';

    const amigoKey = {
      amigoName: name,
      userId: user.id,
      modelName: 'llama2-13b',
    };

    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(amigoKey);

    if (records.length === 0) {
      await memoryManager.seedChatHistory(amigo.seed, '\n\n', amigoKey);
    }

    await memoryManager.writeToHistory(`User: ${prompt}\n`, amigoKey);

    const recentChatHistory = await memoryManager.readLatestHistory(amigoKey);

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      amigoFileName
    );

    let releveantHistory = '';

    if (!!similarDocs && similarDocs.length > 0) {
      releveantHistory = similarDocs.map((doc) => doc.pageContent).join('\n');
    }

    const { handlers } = LangChainStream();

    const model = new Replicate({
      model:
        'meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d',
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN!,
      callbacks: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true;

    const response = String(
      await model
        .call(
          `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${name}: prefix, just send the content of the message, don't send any extra information either at the beginning of the message or at the end of the message, send the whole message at once as you are ${name} and you are speaking to the user.

        ${amigo.instructions}

        Below are the relevant details about ${name}'s past and the conversation you are in.
        ${releveantHistory}

        ${recentChatHistory}\n${name}
      `
        )
        .catch(console.error)
    );

    const finalResponse = response.replaceAll(',', '');

    await memoryManager.writeToHistory('' + finalResponse.trim(), amigoKey);
    var Readable = require('stream').Readable;

    let s = new Readable();
    s.push(finalResponse);
    s.push(null);

    if (finalResponse !== undefined && finalResponse.length > 1) {
      memoryManager.writeToHistory('' + finalResponse.trim(), amigoKey);
      await prismadb.amigo.update({
        where: {
          id: chatId,
        },
        data: {
          messages: {
            create: {
              content: finalResponse.trim(),
              role: 'system',
              userId: user.id,
            },
          },
        },
      });

      return new StreamingTextResponse(s);
    }
  } catch (error) {
    console.log('[CHAT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
