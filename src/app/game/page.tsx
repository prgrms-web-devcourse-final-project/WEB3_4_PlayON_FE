'use client';

import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import SearchBar from '@/components/common/SearchBar';
import SectionTitle from '@/components/common/SectionTitle';
import PickCard from '@/components/game/PickCard';
import PopularCard from '@/components/game/PopularCard';
import SteamCard from '@/components/game/SteamCard';
import { dummyGameDetail, dummyGameSimple, dummyUserSimple } from '@/utils/dummyData';
import styles from './game.module.css';

export default function Game() {
  const imageList = [
    { title: 'Split Fiction', img_src: '/img/hero/bg_game_1.webp' },
    { title: 'Unravel Two', img_src: '/img/hero/bg_game_3.webp' },
    { title: "No Man's Sky", img_src: '/img/hero/bg_game_2.webp' },
  ];

  return (
    <main className="mb-20 space-y-20">
      <section>
        <div className="bg-purple-400/20 w-full h-[800px]">
          <div className="w-screen relative">
            <div className="w-full h-[520px] mt-[68px] relative">
              <HeroSwiperBanner data={imageList} />
            </div>
            <div className="w-[1280px] absolute left-1/2 -translate-x-1/2 top-48 z-10 space-y-7">
              <SearchBar
                className="w-[640px] place-self-center mb-20"
                placeholder="게임 이름으로 검색하세요"
                onChange={() => console.log('change')}
                onSearch={() => alert('click')}
              />
              <div className={`box-content w-[340px] bg-white rounded-xl place-self-center ${styles.chatBubble}`}>
                <div className="py-3 space-y-2 ">
                  <p className="font-suit text-base font-medium leading-5 text-center">플레이온 유저들의 선택</p>
                  <p className="font-suit text-4xl font-black text-purple-700 text-center">BEST CHOICE</p>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-3 gap-6 pt-4">
                <PopularCard data={dummyGameSimple} />
                <PopularCard data={dummyGameSimple} />
                <PopularCard data={dummyGameSimple} />
              </div>
            </div>
          </div>
        </div>
        <PlayOnRollingBanner duration={20} direction="left" />
      </section>

      <section className="wrapper">
        <SectionTitle
          title="파티원 PICK"
          subtitle="최근 함께 파티에 참여한 유저들이 플레이했어요"
          icon_src="/img/icons/pixel_chat_heart.svg"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
          <PickCard data={dummyGameDetail} />
          <PickCard data={dummyGameDetail} />
          <PickCard data={dummyGameDetail} />
          <PickCard data={dummyGameDetail} />
        </div>
      </section>

      <section className="w-full">
        <div className="bg-[url('/img/hero/bg_gameList_5.webp')] bg-cover bg-center size-full">
          <div className="bg-purple-800/60 size-full backdrop-blur-md">
            <div className="wrapper py-12 space-y-8">
              <p className="text-5xl font-suit font-bold text-white">STEAM RANKING</p>

              <div className="flex gap-6">
                <div className="w-[845px] h-[394px] space-y-8">
                  <div className="relative pt-3">
                    <img src={dummyGameSimple.img_src} className="w-full rounded-xl bg-neutral-400 object-cover" />
                    <div className="absolute top-0 left-0 pt-6 pl-3 w-32">
                      <img src="/img/laurel/laurel_1st.png" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="font-suit text-5xl font-bold text-white"> {dummyGameSimple.title}</p>
                    <p className="text-lg text-white font-medium"> {dummyGameSimple.genre.join(', ')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 w-[411px]">
                  <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                  <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                  <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                  <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper space-y-20">
        <div className="space-y-8">
          <SectionTitle
            title={`${dummyUserSimple.nickname}님 맞춤 추천`}
            subtitle="내가 좋아하는 장르 위주로"
            icon_src="/img/icons/pixel_present.svg"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PickCard data={dummyGameDetail} />
            <PickCard data={dummyGameDetail} />
            <PickCard data={dummyGameDetail} />
            <PickCard data={dummyGameDetail} />
          </div>
        </div>

        <div className="space-y-8">
          <SectionTitle
            title="플레이타임 긴 게임들"
            subtitle="오래해도 떨어지지 않는 재미"
            icon_src="/img/icons/pixel_box.svg"
          />
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            <PopularCard data={dummyGameSimple} />
            <PopularCard data={dummyGameSimple} />
            <PopularCard data={dummyGameSimple} />
          </div>
        </div>
      </section>
    </main>
  );
}
