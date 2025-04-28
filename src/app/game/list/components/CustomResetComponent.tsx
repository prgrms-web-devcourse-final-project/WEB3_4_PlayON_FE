'use client';

import RotateFillSVG from '@/components/svg/rotate_fill';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CustomResetComponent() {
  const [resetHovered, setResetHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="w-5 h-5 ml-5"
      onMouseEnter={() => setResetHovered(true)}
      onMouseLeave={() => setResetHovered(false)}
      onClick={() => {
        router.push(GAME_ROUTE.game_list, { scroll: false });
      }}
      style={resetHovered ? { animation: 'spin 1s infinite', animationDirection: 'reverse' } : {}}
    >
      <RotateFillSVG
        fill={resetHovered ? '#f21f54' : `#404040`}
        className={`transition-colors duration-300 ease-in-out`}
      />
    </div>
  );
}
