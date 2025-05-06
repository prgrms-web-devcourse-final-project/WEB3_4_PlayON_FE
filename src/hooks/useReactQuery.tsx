'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './getQueryClient';

export default function ReactQueryProviders({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
