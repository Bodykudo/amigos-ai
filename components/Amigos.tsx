import { Amigo } from '@prisma/client';
import Image from 'next/image';

interface Props {
  data: (Amigo & {
    _count: {
      messages: number;
    };
  })[];
}

export default function Amigos({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
        <div className='relative w-60 h-60'>
          <Image src='/empty.png' alt='Empty' fill className='grayscale' />
        </div>
        <p className='text-sm text-muted-foreground'>No amigos found.</p>
      </div>
    );
  }
  return <div>Amigos</div>;
}
