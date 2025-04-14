import GameSearch from '@/components/common/GameSearch';
import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useRouter } from 'next/navigation';
import styles from './game.module.css';
import PopularCardSection from './popular-card-section';

export default function HeroSections() {
  const router = useRouter();

  const imageList = [
    { title: 'Split Fiction', img_src: '/img/hero/bg_game_1.webp' },
    { title: 'Unravel Two', img_src: '/img/hero/bg_game_3.webp' },
    { title: "No Man's Sky", img_src: '/img/hero/bg_game_2.webp' },
  ];
  return (
    <div className="bg-purple-400/20 w-full h-[800px]">
      <div className="w-screen relative">
        <div className="w-full h-[520px] mt-[68px] relative">
          <HeroSwiperBanner data={imageList} />
        </div>
        <div className="w-[1280px] absolute left-1/2 -translate-x-1/2 top-48 z-10 space-y-7">
          <div className="w-[640px] place-self-center mb-10 bg-white rounded-lg">
            <GameSearch onSelect={(value) => router.push(GAME_ROUTE.game_list + `?name=${value.name}`)} />
          </div>
          <div className={`box-content w-[340px] bg-white rounded-xl place-self-center ${styles.chatBubble}`}>
            <div className="py-3 space-y-2 ">
              <p className="font-suit text-base font-medium leading-5 text-center">플레이온 유저들의 선택</p>
              <p className="font-suit text-4xl font-black text-purple-700 text-center">BEST CHOICE</p>
            </div>
          </div>
          <PopularCardSection />
        </div>
      </div>
    </div>
  );
}
