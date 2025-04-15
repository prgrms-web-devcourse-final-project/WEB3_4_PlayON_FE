'use client';

import { useParty } from '@/api/party';
import BounceButton from '@/components/common/BounceButton';
import CustomPagination from '@/components/common/CustomPagination';
import EmptyLottie from '@/components/common/EmptyLottie';
import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import RetroButton from '@/components/common/RetroButton';
import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import PartySearchComponent from '@/components/party/party-search-component';
import PartyCard from '@/components/party/PartyCard';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PATH } from '@/constants/routes';
import { PARTY_ROUTE } from '@/constants/routes/party';
import { useAuthStore } from '@/stores/authStore';
import { party } from '@/types/party';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const sortOptions: SortOption[] = [
  { id: 'popular', label: '인기순' },
  { id: 'createdAt', label: '최신순' },
  { id: 'partyAt', label: '마감임박' },
  { id: 'personal', label: '인원순' },
];

const imageList = [
  { title: 'Gang Beast', img_src: '/img/hero/bg_party_1.webp' },
  { title: 'It Takes Two', img_src: '/img/hero/bg_party_2.webp' },
  { title: 'Dead by Daylight', img_src: '/img/hero/bg_party_3.webp' },
];

export default function InnerPage() {
  const { user } = useAuthStore();
  const party = useParty();
  const params = useSearchParams();

  const [parties, setParties] = useState<party[]>([]);
  const [totalItems, setTotalItem] = useState(0);
  // const [isMacSupported, setIsMacSupported] = useState(false);
  const userName = user?.nickname ?? '플레이어';

  function splitTag(params: URLSearchParams, paramName: string, type: string): { type: string; value: string }[] {
    const raw = params.get(paramName) ?? '';
    if (!raw) {
      return [];
    }
    return raw.split(',').map((value) => ({ type: type, value: value }));
  }
  const handleMacToggle = (checked: boolean) => {
    const macParams = new URLSearchParams(window.location.search);
    if (checked) {
      macParams.set('isMacSupported', 'true');
    } else {
      macParams.delete('isMacSupported');
    }
    const newUrl = `${window.location.pathname}?${macParams.toString()}`;
    if (window.location.href !== newUrl.toString()) window.history.pushState({}, '', newUrl);
  };
  const fetchData = useCallback(
    async (params: URLSearchParams) => {
      console.log('fecthData callback', params);

      const partyStyle = splitTag(params, 'partyStyle', 'PARTY_STYLE');
      const skillLevel = splitTag(params, 'skillLevel', 'GAME_SKILL');
      const gender = splitTag(params, 'gender', 'GENDER');
      const friendly = splitTag(params, 'friendly', 'SOCIALIZING');
      const genres = params.get('genres')?.split(',');
      const partyDate = params.get('partyDate');
      const appId = parseInt(params.get('appId') as string);
      const orderBy = params.get('sort');
      const page = Number(params.get('page'));
      const isMacSupported = params.get('isMacSupported') === 'true' ? true : false;
      const partyAt = (partyDate && new Date(partyDate)) || new Date();
      const res = await party.GetParties(
        {
          appId: appId ?? undefined,
          genres: genres || [],
          tags: [...partyStyle, ...skillLevel, ...gender, ...friendly],
        },
        partyAt,
        page == 0 ? 1 : page,
        orderBy ?? '',
        isMacSupported
      );
      if (!res) return;
      setParties(res.parties);
      setTotalItem(res.totalItems);
    },
    [params]
  );
  useEffect(() => {
    console.log(params);
    fetchData(params);
  }, [params, fetchData]);
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   const handlePopState = () => {
  //     fetchData(new URLSearchParams(window.location.search));
  //   };
  //   handlePopState();
  //   window.addEventListener('popstate', handlePopState);
  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [params, fetchData]);

  return (
    <div className="relative space-y-16 mb-24">
      <section className="w-full h-[520px] mt-16">
        <HeroSwiperBanner data={imageList}>
          <div className="wrapper">
            <p className="font-helvetica text-[160px] text-white font-normal absolute -bottom-[46px] tracking-wider">
              PARTY LIST
            </p>
          </div>
        </HeroSwiperBanner>
      </section>
      <div className="wrapper relative">
        <div
          style={{ boxShadow: '0 4px 2px 0 rgba(0, 0, 0, 0.08)' }}
          className="w-[410px] px-10 py-6 bg-white rounded-2xl flex flex-col gap-2 place-self-end text-neutral-900 absolute right-0 -bottom-8 z-10"
        >
          <p className="font-dgm text-5xl">WE NEED YOU!</p>
          <div>
            <p className="text-lg leading-5">
              전체 <span className="font-bold">{totalItems}</span>개의 파티가
            </p>
            <p className="text-lg">
              <span className="font-bold">{userName}</span>님을 기다리고 있습니다.
            </p>
          </div>
        </div>
      </div>
      <section className="relative wrapper group space-y-6 min-h-16">
        <label className="inline-flex gap-8 items-center">
          <input type="checkbox" className="peer hidden" />
          <p className="text-4xl font-extrabold text-neutral-900">필터</p>
          <ChevronDown size={32} className="peer-checked:rotate-180 transition-transform" />
        </label>
        <div className="w-full max-h-[500px] duration-500 ease-in-out group-has-[input:checked]:max-h-0 group-has-[input:checked]:overflow-hidden">
          <PartySearchComponent className="w-full group-has-[input:checked]:opacity-0 transition-all duration-300 ease-in-out" />
        </div>
      </section>

      <section className="wrapper space-y-10">
        <div className="flex justify-between">
          <SortRadioGroup options={sortOptions} />
          <div className="flex items-center gap-2">
            <Switch
              id="os"
              onCheckedChange={(checked) => {
                // setIsMacSupported(checked);
                handleMacToggle(checked);
              }}
            />
            <Label htmlFor="os" className="text-xl text-neutral-900 font-medium">
              맥 OS 지원
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {parties.length > 0 && parties.map((party) => <PartyCard data={party} key={party.partyId} />)}
        </div>
        {parties.length <= 0 && (
          <div className="w-full text-center justify-self-center place-self-center">
            <EmptyLottie className="w-[400px]" text="원하는 파티가 없으신가요?">
              <Link href={PARTY_ROUTE.party_create}>
                <RetroButton type="purple" className="mt-10 font-bold">
                  파티 만들기
                </RetroButton>
              </Link>
            </EmptyLottie>
          </div>
        )}
        {totalItems > 9 && <CustomPagination totalItems={totalItems} pageSize={9} />}
        <BounceButton path={PATH.party_create} type="party" tootip="파티 만들기" />
      </section>
    </div>
  );
}
