'use client';

import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';

export default function CustomPlayerState(props: { playerType: boolean[] }) {
  const playerTypes = ['멀티플레이', '싱글플레이'] as const;

  return (
    <CoolerCategoryMenu state={props.playerType} className="flex gap-2" type="single">
      {[...playerTypes].map((item, item_ind) => (
        <TiltToggle label={item} toggle={props.playerType[item_ind]} key={`playerType_${item}`} />
      ))}
    </CoolerCategoryMenu>
  );
}
