import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';

import { Toaster } from '@/src/components/ui/toaster';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import ProModal from '@/src/components/ProModal';

import { cn } from '@/src/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amigos AI - Create your own companions using AI!',
  description:
    'Amigos AI: Create your own companions using AI! Chat with scientists, celebrities, football players, superheroes, or anyone you desire. Amigos AI allows you to craft personalized characters and engage in conversations with them whenever you want.',
  authors: { name: 'Abdallah Magdy' },
  keywords: [
    'AI Companions',
    'Chat with Celebrities',
    'Character Creation',
    'Conversational AI',
    'Personalized Amigos',
  ],
  openGraph: {
    title: 'Amigos AI - Create your own companions using AI!',
    type: 'website',
    images: ['/mockup.png'],
    url: 'https://amigos-ai.vercel.app/',
    description:
      'Amigos AI: Create your own companions using AI! Chat with scientists, celebrities, football players, superheroes, or anyone you desire. Amigos AI allows you to craft personalized characters and engage in conversations with them whenever you want.',
  },
  twitter: {
    title: 'Amigos AI - Create your own companions using AI!',
    description:
      'Amigos AI: Create your own companions using AI! Chat with scientists, celebrities, football players, superheroes, or anyone you desire. Amigos AI allows you to craft personalized characters and engage in conversations with them whenever you want.',
    card: 'summary_large_image',
    creator: 'a_m_s666',
    images: ['/mockup.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn('bg-secondary', inter.className)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
