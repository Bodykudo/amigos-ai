export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-center flex-col gap-4 justify-center h-full '>
      {children}
    </div>
  );
}
