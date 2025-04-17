import Header from '@/components/common/Header';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProviders from '@/hooks/useReactQuery';
import { AlertModal } from '@/components/common/AlertModal';
import { InviteModal } from '@/components/common/invite-modal';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <link rel="icon" href="/img/icons/ghost.svg" />
        <title>PLAY ON</title>
      </head>
      <body className="overflow-x-hidden">
        <ReactQueryProviders>
          <Header />
          {children}
        </ReactQueryProviders>
        <Toaster />
        <AlertModal />
        <InviteModal />
      </body>
    </html>
  );
}
