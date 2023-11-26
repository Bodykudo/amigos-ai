import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className='max-auto max-w-4xl h-full w-full'>{children}</main>;
}
