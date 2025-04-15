import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function GuildList() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
