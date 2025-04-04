'use client';
import HeroTypingBanner from '@/components/common/HeroTypingBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import SearchBar from '@/components/common/SearchBar';
import GuildHorizon from '@/components/guild/guild-horizon';
// import { gameSimple } from '@/types/games';
import { guild } from '@/types/guild';
import { dummyGameSimple, dummyGuild } from '@/utils/dummyData';
import { useState } from 'react';

const banner = [
  {
    title: 'Together!',
    img_src: './img/hero/bg_guild_main.webp',
  },
];

export default function Guild() {
  const [query, setQuery] = useState<string>('');
  const handleChange = (value: string) => {
    setQuery(value);
    console.log(query);
  };
  const handleSearch = () => {
    alert('search click!');
  };

  const dummyGuildList: guild[] = Array(3).fill(dummyGuild);
  // const dummyGameList: gameSimple[] = Array(4).fill(dummyGameSimple);
  return (
    <div className="space-y-20 pb-20">
      <section className="w-full h-[400px]">
        <HeroTypingBanner data={banner} isStatic>
          <SearchBar onChange={handleChange} onSearch={handleSearch} className="w-[640px]" />
        </HeroTypingBanner>
      </section>
      <section className="wrapper space-y-20">
        <div className="flex justify-between items-end">
          {/* <SectionTitle
            title="활동량 TOP 길드"
            subtitle="혼자서 게임하지 마세요!"
            icon_src="./img/icons/pixel_box.svg"
          >
            <RetroButton type="purple" className="w-[344px] h-[48px]">
              더 많은 길드 찾기
            </RetroButton>
          </SectionTitle> */}
          <div className="flex">
            {/* <PixelCharacter char="mage" motion="attack" />
            <PixelCharacter char="archer" motion="attack" />
            <PixelCharacter char="warrior" motion="attack" /> */}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {dummyGuildList.map((guild) => (
            <GuildHorizon key={guild.guild_name} data={guild} />
          ))}
        </div>
      </section>
      <section>
        <PlayOnRollingBanner duration={20} direction="left" />
        <div className="w-full h-6 bg-purple-300"></div>
        <PlayOnRollingBanner duration={20} direction="right" />
      </section>

      <section className="wrapper">
        {/* <SectionTitle
            title="인기 게임별 길드"
            subtitle="인기 게임을 즐기는 길드를 찾고 있다면, 여기에 다 있어요!"
          >
          </SectionTitle> */}
        <div
          className="w-full lg:aspect-[213/100] grid lg:grid-cols-4 lg:grid-rows-[repeat(2,_minmax(0,_1fr))] md:grid-cols-2 md:grid-rows-[repeat(7,_minmax(0,_100px))] gap-6 bg-slate-100
        sm:grid-cols-2 sm:grid-rows-[repeat(7,_minmax(0,_100px))]"
        >
          <div className="bg-purple-300 lg:row-span-2 lg:col-span-2 md:row-span-3 md:col-span-2 sm:row-span-3 sm:col-span-2">
            <div
              style={{
                backgroundImage: `url(${dummyGameSimple.img_src})`,
              }}
              className="w-full h-full bg-center bg-cover"
            >
              <div className="w-full h-full bg-gradient-to-t from-black/40 to-black/0 px-9 py-5 flex items-end">
                <p className="text-white text-5xl font-extrabold">{dummyGameSimple.title}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-200 lg:row-span-1 lg:col-span-2 md:row-span-2 md:col-span-2 md:row-start-4 sm:row-span-2 sm:col-span-2 sm:row-start-4" />
          <div className="bg-purple-200 lg:row-span-1 lg:col-span-1 md:row-span-2 md:col-span-1 md:row-start-6 md:col-start-1 sm:row-span-2 sm:col-span-1 sm:row-start-6 sm:col-start-1" />
          <div className="bg-purple-200 lg:row-span-1 lg:col-span-1 md:row-span-2 md:col-span-1 md:row-start-6 md:col-start-2 sm:row-span-2 sm:col-span-1 sm:row-start-6 sm:col-start-2" />
        </div>
        {/* <div className="w-[300px] h-[300px]"></div> */}
      </section>

      <section className="wrapper">
        <div className="w-full h-48 bg-purple-200"></div>
        {/* <SectionBanner
          description="성향 및 목표가 같은 동료들과 함께하고 싶다면"
          highlight="지금 바로 나만의 길드를 만들어보세요!"
          onClick={() => alert('click')}
          className="bg-purple-400"
        >
          <img src="./img/3d_object/castle.webp" alt="icon" className="h-[180px]" />
        </SectionBanner> */}
      </section>
    </div>
  );
}
