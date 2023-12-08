export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className='mx-auto max-w-6xl h-full w-full'>{children}</main>;
}
