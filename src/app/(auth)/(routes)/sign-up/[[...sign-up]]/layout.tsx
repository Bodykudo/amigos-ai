import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amigos AI - Sign Up',
  openGraph: {
    title: 'Amigos AI - Sign Up',
    url: 'https://amigos-ai.vercel.app/sign-up',
  },
  twitter: {
    title: 'Amigos AI - Sign Up',
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
