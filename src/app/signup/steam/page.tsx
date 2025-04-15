import { Suspense } from 'react';
import InnerPage from './innerPage';

export default function SignupSteam() {
  return (
    <Suspense>
      <InnerPage />
    </Suspense>
  );
}
