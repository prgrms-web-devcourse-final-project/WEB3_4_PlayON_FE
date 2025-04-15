import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function LinkSteam() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
