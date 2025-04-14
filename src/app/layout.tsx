import Header from '@/components/common/Header';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import ReactQueryProviders from '@/hooks/useReactQuery';
import { AlertModal } from '@/components/common/AlertModal';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <ReactQueryProviders>
          <Suspense>{children}</Suspense>
        </ReactQueryProviders>
        <Toaster />
        <AlertModal />
      </body>
    </html>
  );
}
