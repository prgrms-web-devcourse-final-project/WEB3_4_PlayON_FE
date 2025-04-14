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
import BounceButton from '@/components/common/BounceButton';
import EmptyLottie from '@/components/common/EmptyLottie';
import Link from 'next/link';
import RetroButton from '@/components/common/RetroButton';
import { GUILD_ROUTE } from '@/constants/routes/guild';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const appId = Number(params.get('appId'));
    try {
      setIsLoading(true);
      const response = await guild.GetGuildList(
        {
          name: name,
          appids: appId ? [appId] : [],
          tags: [...partyStyle, ...skillLevel, ...gender, ...friendly],
        },
        page == 0 ? 1 : page,
        9,
        orderBy
      );

      if (!response) {
        setGuildList([]);
        setTotalItems(0);
        return;
      }

      setGuildList(response.guildList);
      setTotalItems(response.totalItems);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading
            ? [...Array(3)].map((_, idx) => <GuildHorizonSkeleton key={idx} className="" />)
            : guildList.length > 0 &&
              totalItems &&
              guildList.map((guild) => <GuildHorizon key={guild.guild_id} data={guild} />)}
          {/* {guildList.length > 0
            ? guildList.map((guild) => <GuildHorizon key={guild.guild_id} data={guild} />)
            : [...Array(3)].map((_, idx) => <GuildHorizonSkeleton key={idx} className="" />)} */}
        </div>
        {!isLoading && guildList.length <= 0 && (
          <div className="w-full text-center justify-self-center place-self-center">
            <EmptyLottie className="w-[400px]" text="원하는 길드가 없으신가요?">
              <Link href={GUILD_ROUTE.guild_create}>
                <RetroButton type="purple" className="mt-10 font-bold">
                  길드 만들기
                </RetroButton>
              </Link>
            </EmptyLottie>
          </div>
        )}
        {guildList.length > 0 && <CustomPagination totalItems={totalItems} pageSize={9} />}
        <BounceButton path={PATH.guild_create} type="guild" tootip="길드 만들기" />
      </section>
    </div>
  );
}
