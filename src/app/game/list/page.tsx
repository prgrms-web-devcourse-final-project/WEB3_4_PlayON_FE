import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function GameList() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
