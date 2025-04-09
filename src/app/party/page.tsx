'use client';
import { useParty } from '@/api/party';
import HeroTypingBanner from '@/components/common/HeroTypingBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import RetroButton from '@/components/common/RetroButton';
import SearchBar from '@/components/common/SearchBar';
import SectionBanner from '@/components/common/SectionBanner';
import SectionTitle from '@/components/common/SectionTitle';
import PartyCard from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
import { PATH } from '@/constants/routes';
import { gameSimple } from '@/types/games';
import { party, partyLog } from '@/types/party';
import { dummyParty, dummyPartyLog } from '@/utils/dummyData';
import Link from 'next/link';

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
  const party = useParty();
  party.GetParty(1);
  const [query, setQuery] = useState<string>('');
  const handleChange = (value: string) => {
    setQuery(value);
    console.log(query);
  };
  const handleSearch = () => {
    alert('search click!');
  };

  const dummyPartyList: party[] = Array(6).fill(dummyParty);
  const dummyPartyLogList: partyLog[] = Array(3).fill(dummyPartyLog);
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to top, #f3e8ff 0%, rgba(255,255,255,0) 100%)',
        backgroundSize: '100% 40%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
      className="space-y-20 pb-20 pt-[68px]"
    >
      <section className="w-full h-[400px]">
        <HeroTypingBanner data={popularGames}>
          <SearchBar onChange={handleChange} onSearch={handleSearch} className="w-[640px]" />
        </HeroTypingBanner>
      </section>

      <section className="wrapper space-y-20">
        <div className="flex justify-between items-end">
          <SectionTitle
            title="지금 모집중인 파티"
            subtitle="구인중인 파티를 확인하고 빠르게 게임을 시작하세요"
            icon_src="./img/icons/pixel_swords.svg"
          >
            <RetroButton type="purple" className="w-[344px] h-[48px]">
              파티 상세 검색
            </RetroButton>
          </SectionTitle>
          <div className="flex">
            <PixelCharacter char="mage" motion="attack" />
            <PixelCharacter char="archer" motion="attack" />
            <PixelCharacter char="warrior" motion="attack" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {dummyPartyList.map((party, idx) => (
            <PartyCard key={idx} data={party} />
          ))}
        </div>
      </section>

      <section>
        <PlayOnRollingBanner duration={20} direction="left" />
      </section>

      <section className="wrapper">
        <Link href={PATH.party_create}>
          <SectionBanner
            introText="딱 맞는 파티를 찾기 어려운가요?"
            description="성향 및 목표가 같은 동료들과 함께하고 싶다면"
            highlight="지금 바로 나만의 파티를 만들어보세요!"
          >
            <img src="./img/3d_object/sword.webp" alt="icon" className="h-[180px] blur-[2px] -rotate-[30deg]" />
            <img src="./img/3d_object/crystal_ball.webp" alt="icon" className="h-[180px]" />
          </SectionBanner>
        </Link>
      </section>

      <section className="wrapper space-y-20">
        <SectionTitle title="최신 파티 로그 살펴보기" subtitle="최근 플레이한 유저들의 플레이 기록을 보고 싶다면?">
          <RetroButton type="purple" className="w-[344px] h-[48px]">
            최신 파티 로그 살펴보기
          </RetroButton>
        </SectionTitle>
        <div className="grid grid-cols-3 gap-6">
          {dummyPartyLogList.map((partyLog, idx) => (
            <PartyLogCard key={partyLog.party_info.party_name + idx} data={partyLog} />
          ))}
        </div>
      </section>
    </div>
  );
}
