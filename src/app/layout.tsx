import Header from '@/components/common/Header';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Suspense>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  );
}
