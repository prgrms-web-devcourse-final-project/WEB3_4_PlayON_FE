import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function LoginSteam() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
