'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Plus, Settings } from 'lucide-react';

import { useProModal } from '@/src/hooks/useProModal';
import { cn } from '@/src/lib/utils';
import { useUser } from '@clerk/nextjs';

interface SidebarProps {
  isPro: boolean;
}

const routes = [
  {
    icon: Home,
    href: '/',
    label: 'Home',
    pro: false,
  },
  {
    icon: Plus,
    href: '/amigo/new',
    label: 'Create',
    pro: true,
  },
  { icon: Settings, href: '/settings', label: 'Settings', pro: false },
];

export default function Sidebar({ isPro }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const proModal = useProModal();

  const onNavigate = (url: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }

    router.push(url);
  };

  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex flex-1 justify-center'>
        <div className='space-y-2'>
          {routes.map((route) => (
            <div
              key={route.href}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div
                className='flex flex-col gap-y-2 items-center flex-1'
                onClick={() => onNavigate(route.href, route.pro)}
              >
                <route.icon className='h-5 w-5' />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}