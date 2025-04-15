import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function MyPage() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
