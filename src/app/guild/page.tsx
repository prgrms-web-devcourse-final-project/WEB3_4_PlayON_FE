'use client';
import HeroTypingBanner from '@/components/common/HeroTypingBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import RetroButton from '@/components/common/RetroButton';
import SearchBar from '@/components/common/SearchBar';
import SectionBanner from '@/components/common/SectionBanner';
import SectionTitle from '@/components/common/SectionTitle';
import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
import { gameSimple } from '@/types/games';
import { dummyGameSimple } from '@/utils/dummyData';
import PopularGameList from './components/PopularGameList';
import SearchGuildWithGame from '@/components/common/search-guild-with-game';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { useGuild } from '@/api/guild';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import PopularGuildListSkeleton from './components/PopularGuildListSkeleton';
import PopularGuildList from './components/PopularGuildList';

const banner = [
  {
    title: 'Together!',
    img_src: '/img/hero/bg_guild_main.webp',
  },
];

export default function Guild() {
  const router = useRouter();
  const Guild = useGuild();

  const { data: popularGuildList } = useSuspenseQuery({
    queryKey: ['PopularGuilds'],
    queryFn: () => Guild.GetGuildPopular(),
  });

  const handleSearch = (value: string) => {
    router.push(`${PATH.guild_list}?keyword=${value}`);
  };

  const dummyGameList: gameSimple[] = Array(4).fill(dummyGameSimple);

  return (
    <div className="space-y-20 pb-20 pt-[68px]">
      <section className="w-full h-[400px]">
        <HeroTypingBanner data={banner} isStatic>
          <SearchBar onChange={() => {}} onSearch={handleSearch} className="w-[640px]" />
        </HeroTypingBanner>
      </section>
      <section className="wrapper space-y-20">
        <div className="flex justify-between items-end">
          <SectionTitle title="활동량 TOP 길드" subtitle="혼자서 게임하지 마세요!" icon_src="./img/icons/pixel_box.svg">
            <RetroButton type="purple" className="w-[344px] h-[48px]" callback={() => router.push(PATH.guild_list)}>
              더 많은 길드 찾기
            </RetroButton>
          </SectionTitle>
          <div className="flex">
            <PixelCharacter char="mage" motion="attack" />
            <PixelCharacter char="archer" motion="attack" />
            <PixelCharacter char="warrior" motion="attack" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6"></div>
        <Suspense fallback={<PopularGuildListSkeleton />}>
          <PopularGuildList data={popularGuildList} />
        </Suspense>
      </section>
      <section>
        <PlayOnRollingBanner duration={20} direction="left" />
        <SearchGuildWithGame
          leftCarouselTitle={<p className="text-5xl font-bold text-purple-50 mb-9">보유 게임으로 길드 탐색</p>}
          theme="dark"
        />
        <PlayOnRollingBanner duration={20} direction="right" />
      </section>

      <section className="wrapper space-y-10">
        <SectionTitle title="인기 게임별 길드" subtitle="인기 게임을 즐기는 길드를 찾고 있다면, 여기에 다 있어요!" />
        <PopularGameList data={dummyGameList} />
      </section>

      <section className="wrapper">
        <SectionBanner
          description="성향 및 목표가 같은 동료들과 함께하고 싶다면"
          highlight="지금 바로 나만의 길드를 만들어보세요!"
          onClick={() => router.push(PATH.guild_create)}
          className="bg-purple-400"
        >
          <img src="./img/3d_object/castle.webp" alt="icon" className="h-[180px]" />
        </SectionBanner>
      </section>
    </div>
  );
}
