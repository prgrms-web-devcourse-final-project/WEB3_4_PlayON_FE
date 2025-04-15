import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function Community() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
