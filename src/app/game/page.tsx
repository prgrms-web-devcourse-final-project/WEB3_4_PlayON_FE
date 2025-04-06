'use client';

import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import SearchBar from '@/components/common/SearchBar';
import PickCard from '@/components/game/PickCard';
import PopularCard from '@/components/game/PopularCard';
import SteamCard from '@/components/game/SteamCard';
import { dummyGameSimple, dummyUserSimple } from '@/utils/dummyData';

// import Chat from "@/components/guildUser/Chat";
// import GuildUser from "@/components/guildUser/GuildUser";
// import GuildUserCard from "@/components/guildUser/GuildUserCard";

export default function Game() {
  const imageList = [
    { title: 'Split Fiction', img_src: '/img/hero/bg_game_1.webp' },
    { title: 'Unravel Two', img_src: '/img/hero/bg_game_3.webp' },
    { title: "No Man's Sky", img_src: '/img/hero/bg_game_2.webp' },
  ];

  return (
    <main>
      <section>
        <div className="w-screen relative">
          <section className="w-full h-[520px] pt-16">
            <HeroSwiperBanner data={imageList}></HeroSwiperBanner>
          </section>
          {/* <img src="/img/hero/bg_game_2.webp" className="w-full h-[520px] object-cover" /> */}
          <div className="w-[1280px] absolute left-1/2 -translate-x-1/2 top-[196px]">
            <div className="top-[196px] place-self-center">
              <SearchBar className="w-[640px]" placeholder="게임 이름으로 검색하세요" />
            </div>

            <div className="pt-20">
              <div className="box-content w-[340px] h-20 bg-white rounded-xl place-self-center">
                <div className="py-2">
                  <p className="font-suit text-base font-medium leading-5 text-center">플레이온 유저들의 선택</p>
                  <p className="font-suit text-4xl font-black text-purple-700 text-center">BEST CHOICE</p>
                </div>
              </div>
              <img src="/img/icons/Polygon 2.svg" className="place-self-center" />
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 pt-4">
              <PopularCard data={dummyGameSimple} />
              <PopularCard data={dummyGameSimple} />
              <PopularCard data={dummyGameSimple} />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-72">
        <PlayOnRollingBanner duration={20} direction="left" />
      </div>

      <section className="wrapper">
        <div className="pt-24">
          <p className="font-suit text-2xl font-medium">최근 함께 파티에 참여한 유저들이 플레이했어요</p>
          <div className="flex gap-5  pt-1">
            <p className="font-suit text-6xl font-extrabold text-purple-700">파티원 PICK</p>
            <img src="/img/icons/pixel_chat_heart.svg" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
          <PickCard data={dummyGameSimple} />
          <PickCard data={dummyGameSimple} />
          <PickCard data={dummyGameSimple} />
          <PickCard data={dummyGameSimple} />
        </div>
      </section>

      <section>
        <div className="w-screen relative pt-20">
          <img src="/hero1.png" className="w-full h-[692px] blur-[30px] object-cover bg-[#23243DCC]" />

          <div className="wrapper">
            <div className="w-[1280px] absolute left-1/2 -translate-x-1/2 top-32">
              <p className="text-5xl font-suit font-extrabold text-white">STEAM RANKING</p>

              <div className="flex flex-row pt-7 gap-7">
                <div className="w-[845px] h-[394px]">
                  <div className="relative">
                    <img src={dummyGameSimple.img_src} className="w-full rounded-xl bg-neutral-400 object-cover" />
                    <div className="absolute top-0 left-0 pt-3 pl-3 w-32">
                      <img src="/img/laurel/laurel_1st.png" />
                    </div>
                  </div>

                  <p className="mt-4 font-suit text-5xl font-extrabold text-white"> {dummyGameSimple.title}</p>
                  <p className="mt-2 text-lg text-white font-medium"> {dummyGameSimple.genre.join(', ')}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 w-[411px]">
                  <SteamCard data={dummyGameSimple} className="text-white" />
                  <SteamCard data={dummyGameSimple} className="text-white" />
                  <SteamCard data={dummyGameSimple} className="text-white" />
                  <SteamCard data={dummyGameSimple} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper">
        <div className="pt-28">
          <p className="font-suit text-2xl font-medium">내가 좋아하는 장르 위주로</p>
          <div className="flex gap-5  pt-1">
            <p className="font-suit text-6xl font-extrabold text-purple-700">{dummyUserSimple.nickname}님 맞춤 추천</p>
            <img src="/img/icons/pixel_present.svg" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-16">
          <PickCard data={dummyGameSimple} />
          <PickCard data={dummyGameSimple} />
          <PickCard data={dummyGameSimple} />
          <PickCard data={dummyGameSimple} />
        </div>

        <div className="pt-32">
          <p className="font-suit text-2xl font-medium">오래해도 떨어지지 않는 재미</p>
          <div className="flex gap-5 pt-1">
            <p className="font-suit text-6xl font-extrabold text-purple-700">플레이타임 긴 게임들</p>
            <img src="/img/icons/pixel_box.svg" alt="" />
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 pt-6">
          <PopularCard data={dummyGameSimple} />
          <PopularCard data={dummyGameSimple} />
          <PopularCard data={dummyGameSimple} />
        </div>
      </section>
    </main>
  );
}
