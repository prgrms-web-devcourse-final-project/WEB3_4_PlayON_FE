'use client';

import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';
import { gameSearchStore } from '../stores/gameSearchStore';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useEffect } from 'react';

export default function CustomPlayerState(props: { playerType: boolean[] }) {
  const playerTypes = ['멀티플레이', '싱글플레이'] as const;
  const { setPlayerType, getQuery, togglePlayerType } = gameSearchStore();
  const router = useRouter();

  useEffect(() => {
    setPlayerType(props.playerType);
  }, [props.playerType]);

  return (
    <CoolerCategoryMenu state={props.playerType} className="flex gap-2" type="single">
      {[...playerTypes].map((item, item_ind) => (
        <div
          key={`playerType_${item}`}
          onClick={() => {
            togglePlayerType(playerTypes[item_ind]);
            router.push(GAME_ROUTE.game_list + getQuery(), { scroll: false });
          }}
        >
          <TiltToggle label={item} toggle={props.playerType[item_ind]} />
        </div>
      ))}
    </CoolerCategoryMenu>
  );
}
