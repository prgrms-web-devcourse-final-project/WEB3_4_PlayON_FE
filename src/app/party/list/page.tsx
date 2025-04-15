import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function PartyList() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
