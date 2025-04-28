'use client';

import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';
import { gameSearchStore } from '../stores/gameSearchStore';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useEffect } from 'react';

export default function CustomReleaseStatus(props: { releaseStatus: boolean[] }) {
  const releaseStatuses = ['발매', '출시예정'] as const;
  const { setReleaseStatus, getQuery, toggleReleaseStatus } = gameSearchStore();
  const router = useRouter();

  useEffect(() => {
    setReleaseStatus(props.releaseStatus);
  }, [props.releaseStatus]);

  return (
    <CoolerCategoryMenu state={props.releaseStatus} className="flex gap-2" type="single">
      {[...releaseStatuses].map((item, item_ind) => (
        <div
          key={`releaseStatus_${item}`}
          onClick={() => {
            toggleReleaseStatus(releaseStatuses[item_ind]);
            router.push(GAME_ROUTE.game_list + getQuery(), { scroll: false });
          }}
        >
          <TiltToggle label={item} toggle={props.releaseStatus[item_ind]} />
        </div>
      ))}
    </CoolerCategoryMenu>
  );
}
