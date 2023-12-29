import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amigos AI - Sign Up',
  openGraph: {
    title: 'Amigos AI - Sign Up',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/sign-up`,
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
