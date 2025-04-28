'use client';

import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';
import { gameSearchStore } from '../stores/gameSearchStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';

export default function CustomGenres(props: { genre: boolean[] }) {
  const genres = ['액션', '인디', '어드벤처', '시뮬레이션', 'RPG', '전략', '캐주얼'] as const;
  const { setGenre, getQuery, toggleGenre } = gameSearchStore();
  const router = useRouter();

  useEffect(() => {
    setGenre(props.genre);
  }, [props.genre]);

  return (
    <CoolerCategoryMenu state={props.genre} className="flex gap-2" type="multiple">
      {['전체', ...genres].map((item, item_ind) => (
        <div
          key={`genre_${item}`}
          onClick={() => {
            if (item_ind === 0) {
              setGenre([true, ...genres.map(() => false)]);
            } else {
              toggleGenre(genres[item_ind - 1]);
            }
            router.push(GAME_ROUTE.game_list + getQuery(), { scroll: false });
          }}
        >
          <TiltToggle label={item} toggle={props.genre[item_ind]} />
        </div>
      ))}
    </CoolerCategoryMenu>
  );
}
