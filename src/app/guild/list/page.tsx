'use client';
import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import GuildHorizon, { GuildHorizonSkeleton } from '@/components/guild/guild-horizon';
import { guild } from '@/types/guild';
import GuildSearchComponent from '@/components/guild/guild-search-component';
import { ChevronDown } from 'lucide-react';
import CustomPagination from '@/components/common/CustomPagination';
import { useGuild } from '@/api/guild';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PATH } from '@/constants/routes';
import Link from 'next/link';
import styles from '@/app/party/[partyid]/partyDetail.module.css';
const sortOptions: SortOption[] = [
  { id: 'latest', label: '최신순' },
  { id: 'activity', label: '활동순' },
  { id: 'members', label: '인원순' },
];

const imageList = [
  { title: 'Ultimate Chicken Horse', img_src: '/img/hero/bg_guild_1.webp' },
  { title: 'Content Warning', img_src: '/img/hero/bg_guild_3.webp' },
  { title: 'BATTLEGROUNDS', img_src: '/img/hero/bg_guild_2.webp' },
];

export default function GuildList() {
  const guild = useGuild();
  const params = useSearchParams();

  const [guildList, setGuildList] = useState<guild[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  function splitTag(params: URLSearchParams, paramName: string, type: string): { type: string; value: string }[] {
    const raw = params.get(paramName) ?? '전체';
    if (!raw) {
      return [];
    }
    return raw.split(',').map((value) => ({ type: type, value: value }));
  }

  const fetchData = useCallback(async (params: URLSearchParams) => {
    const partyStyle = splitTag(params, 'partyStyle', '파티 스타일');
    const skillLevel = splitTag(params, 'skillLevel', '게임 실력');
    const gender = splitTag(params, 'gender', '성별');
    const friendly = splitTag(params, 'friendly', '친목');
    const name = params.get('name') ?? '';
    const orderBy = params.get('sort') ?? 'latest';
    const page = Number(params.get('page'));
    // const appids = params.get('genres')?.split(',');
    const response = await guild.GetGuildList(
      {
        name: name,
        appids: [],
        tags: [...partyStyle, ...skillLevel, ...gender, ...friendly],
      },
      page == 0 ? 1 : page,
      9,
      orderBy
    );
    if (!response) return;
    setGuildList(response.guildList);
    setTotalItems(response.totalItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(params);
  }, [params, fetchData]);

  return (
    <div className="relative space-y-16 mb-24 pt-[68px]">
      <section className="w-full h-[520px]">
        <HeroSwiperBanner data={imageList}>
          <div className="wrapper">
            <p className="font-helvetica text-[160px] text-white font-normal absolute -bottom-[46px] tracking-wider">
              GUILD LIST
            </p>
          </div>
        </HeroSwiperBanner>
      </section>

      <section className="wrapper group space-y-6 min-h-16">
        <label className="inline-flex gap-8 items-center">
          <input type="checkbox" className="peer hidden" />
          <p className="text-4xl font-extrabold text-neutral-900">필터</p>
          <ChevronDown size={32} className="peer-checked:rotate-180 transition-transform" />
        </label>
        <div className="w-full max-h-[500px] duration-500 ease-in-out group-has-[input:checked]:max-h-0 group-has-[input:checked]:overflow-hidden">
          <GuildSearchComponent className="w-full group-has-[input:checked]:opacity-0 transition-all duration-300 ease-in-out" />
        </div>
      </section>

      <section className="wrapper space-y-10">
        <SortRadioGroup options={sortOptions} />
        <div className="grid grid-cols-3 gap-6">
          {guildList.length > 0
            ? guildList.map((guild) => <GuildHorizon key={guild.guild_id} data={guild} />)
            : [...Array(3)].map((_, idx) => <GuildHorizonSkeleton key={idx} className="" />)}
        </div>
        <CustomPagination totalItems={totalItems} pageSize={9} />
        <CreateButton />
      </section>
    </div>
  );
}

const CreateButton = () => {
  return (
    <div className="fixed right-8 bottom-8 z-50 animate-bounce delay-150">
      <Link href={PATH.guild_create} className="relative group">
        <p
          className={`${styles.chatBubble} opacity-0 translate-y-12 transition-all duration-300 
    text-white text-center font-dgm bg-purple-500 py-2 px-3 shadow-md rounded-lg
    group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-6 mb-5 -translate-x-3
  `}
        >
          길드 만들기
        </p>
        <img
          className="group-hover:scale-[120%] group-hover:-rotate-12 transition-all w-[60px]"
          src="/img/3d_object/balloon.svg"
          alt="balloon"
        />
      </Link>
    </div>
  );
};
