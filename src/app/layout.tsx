import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import AuthProvider from '../components/AuthProvider';
import ProModal from '@/components/ProModal';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amigos AI - Create your own companions using AI!',
  description:
    'Amigos AI: Create your own companions using AI! Chat with scientists, celebrities, football players, superheroes, or anyone you desire. Amigos AI allows you to craft personalized characters and engage in conversations with them whenever you want.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  authors: {
    name: 'Abdallah Magdy',
    url: 'https://www.linkedin.com/in/abdallahmagdy',
  },
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
    images: ['https://amigos-ai.vercel.app/mockup.png'],
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
    images: ['https://amigos-ai.vercel.app/mockup.png'],
  },
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('bg-secondary', inter.className)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            <ProModal />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
