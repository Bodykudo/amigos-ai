'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from 'ai/react';
import { Amigo, Message } from '@prisma/client';

import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import { ChatMessageProps } from './ChatMessage';

interface ChatClientProps {
  amigo: Amigo & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export default function ChatClient({ amigo }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(amigo.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${amigo.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: 'system',
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput('');
        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: 'user',
      content: input,
    };
    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader amigo={amigo} />
      <ChatMessages amigo={amigo} isLoading={isLoading} messages={messages} />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
