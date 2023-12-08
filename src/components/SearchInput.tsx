'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Search } from 'lucide-react';

import { Input } from './ui/input';
import { useDebounce } from '@/src/hooks/useDebounce';

export default function SearchInput() {
  const router = useRouter();
  const searchParmas = useSearchParams();

  const name = searchParmas.get('name');
  const categoryId = searchParmas.get('categoryId');

  const [value, setValue] = useState(name || '');
  const debouncedValue = useDebounce(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
      <Input
        value={value}
        onChange={onChange}
        placeholder='Search...'
        className='pl-10 bg-primary/10'
      />
    </div>
  );
}
