import { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';
import { SendHorizonal } from 'lucide-react';

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}

export default function ChatForm({
  input,
  isLoading,
  handleInputChange,
  onSubmit,
}: ChatFormProps) {
  return (
    <form
      className='border-t border-primary/10 py-4 flex items-center gap-x-2'
      onSubmit={onSubmit}
    >
      <Input
        placeholder='Type a message'
        className='rounded-lg bg-primary/10'
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
      />
      <Button size='icon' variant='ghost' disabled={isLoading}>
        <SendHorizonal className='h-6 w-6' />
      </Button>
    </form>
  );
}
