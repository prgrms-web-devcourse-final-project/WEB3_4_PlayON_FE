'use client';
import HeroTypingBanner from '@/components/common/HeroTypingBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import RetroButton from '@/components/common/RetroButton';
import SearchBar from '@/components/common/SearchBar';
import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
import { gameSimple } from '@/types/games';
import { useState } from 'react';

const popularGames: gameSimple[] = [
  {
    title: 'Counter Strike 2',
    genre: ['몰라요'],
    img_src: 'hero1.png',
    background_src: 'hero1.png',
  },
  {
    title: 'BATTLEGROUNDS',
    genre: ['몰라요'],
    img_src: './img/hero/bg_guild_2.webp',
    background_src: 'hero1.png',
  },
];

export default function Party() {
  const [query, setQuery] = useState<string>('');
  const handleChange = (value: string) => {
    setQuery(value);
    console.log(query);
  };
  const handleSearch = () => {
    alert('search click!');
  };
  return (
    <div className="space-y-20">
      <div className="w-full h-[400px]">
        <HeroTypingBanner data={popularGames}>
          <SearchBar onChange={handleChange} onSearch={handleSearch} className="w-[640px]" />
        </HeroTypingBanner>
      </div>
      <section className="wrapper flex justify-between items-end">
        <div>
          <p className="text-neutral-900 text-2xl font-medium">구인중인 파티를 확인하고 빠르게 게임을 시작하세요.</p>
          <div className="flex gap-6 items-center">
            <p className="text-purple-700 text-6xl font-extrabold mt-2 mb-6">지금 모집중인 파티</p>
            <div>아이콘자리</div>
          </div>
          <RetroButton type="purple" className="w-[344px] h-[48px]">
            파티 상세 검색
          </RetroButton>
        </div>
        <div className="flex">
          {/* <PixelCharacter char="mage" motion="attack" />
          <PixelCharacter char="archer" motion="attack" />
          <PixelCharacter char="warrior" motion="attack" /> */}
        </div>
      </section>
      <PlayOnRollingBanner duration={20} direction="left" />
    </div>
  );
}
