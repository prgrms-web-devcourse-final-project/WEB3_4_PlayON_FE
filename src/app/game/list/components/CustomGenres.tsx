'use client';

import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';

export default function CustomGenres(props: { genre: boolean[] }) {
  const genres = ['액션', '인디', '어드벤처', '시뮬레이션', 'RPG', '전략', '캐주얼'] as const;

  return (
    <CoolerCategoryMenu state={props.genre} className="flex gap-2" type="multiple" enableAll>
      {['전체', ...genres].map((item, item_ind) => (
        <TiltToggle label={item} toggle={props.genre[item_ind]} key={`genre_${item}`} />
      ))}
    </CoolerCategoryMenu>
  );
}
