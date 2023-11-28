'use client';

import { Amigo, Message } from '@prisma/client';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import { ElementRef, useEffect, useRef, useState } from 'react';

interface Props {
  amigo: Amigo & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  messages: ChatMessageProps[];
  isLoading: boolean;
}

export default function ChatMessages({ amigo, messages, isLoading }: Props) {
  const [isFakeLoading, setIsFakeLoading] = useState(messages.length === 0);
  const scrollRef = useRef<ElementRef<'div'>>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFakeLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className='flex-1 overflow-y-auto pr-4'>
      <ChatMessage
        src={amigo.src}
        isLoading={isFakeLoading}
        role='system'
        content={`Hello, I am ${amigo.name}, ${amigo.description}.`}
      />
      {messages.map((message, i) => (
        <ChatMessage
          key={i}
          role={message.role}
          content={message.content}
          src={amigo.src}
        />
      ))}
      {isLoading && <ChatMessage role='system' src={amigo.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}
