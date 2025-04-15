'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParty } from '@/api/party';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { gameSimple } from '@/types/games';
import { getMainPendingPartyRes, getPartyRes } from '@/types/party';
import HeroTypingBanner from '@/components/common/HeroTypingBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import RetroButton from '@/components/common/RetroButton';
import SectionBanner from '@/components/common/SectionBanner';
import SectionTitle from '@/components/common/SectionTitle';
import PartyCard, { PartyCardSkeleton } from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
import GameSearch from '@/components/common/GameSearch';
import EmptyLottie from '@/components/common/EmptyLottie';

const popularGames: gameSimple[] = [
  {
    title: 'Counter Strike 2',
    genre: [''],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
    background_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
  },
  {
    title: 'BATTLEGROUNDS',
    genre: [''],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
    background_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
  },
  {
    title: 'Team Fortress 2',
    genre: [''],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/440/header.jpg',
    background_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/440/header.jpg',
  },
  {
    title: 'APEX LEGENDS',
    genre: [''],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg',
    background_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg',
  },
];

export default function Party() {
  const party = useParty();
  const router = useRouter();
  const [pendingParties, setPendingParties] = useState<getMainPendingPartyRes[]>([]);
  const [loggedParties, setLoggedParties] = useState<getPartyRes[]>([]);
  const handleSearch = (appId: number | string) => {
    router.push(`${PATH.party_list}?appId=${appId}`);
  };

  useEffect(() => {
    const fetchParty = async () => {
      const pendingRes = await party.MainPendingParty(6);
      if (pendingRes) {
        setPendingParties(pendingRes);
      }
      const loggedRes = await party.MainLoggedParty(3);
      if (loggedRes) {
        setLoggedParties(loggedRes);
      }
    };
    fetchParty();
  }, []);

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
          <div className="w-[640px] bg-white rounded-lg">
            <GameSearch
              className="py-2 h-12"
              onSelect={(game) => {
                handleSearch(game.appid);
              }}
            ></GameSearch>
          </div>
        </HeroTypingBanner>
      </section>

      <section className="wrapper space-y-20">
        <div className="flex justify-between items-end">
          <SectionTitle
            title="지금 모집중인 파티"
            subtitle="구인중인 파티를 확인하고 빠르게 게임을 시작하세요"
            icon_src="./img/icons/pixel_swords.svg"
          >
            <Link href={PATH.party_list}>
              <RetroButton type="purple" className="w-[344px] h-[48px]">
                파티 상세 검색
              </RetroButton>
            </Link>
          </SectionTitle>
          <div className="flex">
            <PixelCharacter char="mage" motion="attack" />
            <PixelCharacter char="archer" motion="attack" />
            <PixelCharacter char="warrior" motion="attack" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {pendingParties.length > 0
            ? pendingParties.map((party, idx) => <PartyCard key={'party' + idx} data={party} />)
            : Array.from({ length: 6 }).map((_, idx) => <PartyCardSkeleton key={idx} />)}
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
        <SectionTitle
          title="최신 파티 로그 살펴보기"
          subtitle="최근 플레이한 유저들의 플레이 기록을 보고 싶다면?"
        ></SectionTitle>
        {loggedParties.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {loggedParties.map((party, idx) => (
              <PartyLogCard key={party.partyId + idx} data={party} />
            ))}
          </div>
        )}
        {loggedParties.length === 0 && (
          <div className="text-center">
            <EmptyLottie className="w-[400px]">
              <RetroButton
                type="purple"
                className="mt-8"
                callback={() => {
                  router.push(PATH.party_list);
                }}
              >
                파티 하러 가기!
              </RetroButton>
            </EmptyLottie>
          </div>
        )}
      </section>
    </div>
  );
}
