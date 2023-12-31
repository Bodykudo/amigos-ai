import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amigos AI - Sign In',
  openGraph: {
    title: 'Amigos AI - Sign In',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/sign-in`,
  },
  twitter: {
    title: 'Amigos AI - Sign In',
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
