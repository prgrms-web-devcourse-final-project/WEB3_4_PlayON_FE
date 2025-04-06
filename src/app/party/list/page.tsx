'use client';

import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import PartySearchComponent from '@/components/party/party-search-component';
import PartyCard from '@/components/party/PartyCard';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Switch } from '@/components/ui/switch';
import { party } from '@/types/party';
import { dummyParty } from '@/utils/dummyData';

import { ChevronDown } from 'lucide-react';

const sortOptions: SortOption[] = [
  { id: 'popularity', label: '인기순' },
  { id: 'latest', label: '최신순' },
  { id: 'capacity', label: '마감임박' },
  { id: 'members', label: '인원순' },
];

const imageList = [
  { title: 'Gang Beast', img_src: '/img/hero/bg_party_1.webp' },
  { title: 'It Takes Two', img_src: '/img/hero/bg_party_2.webp' },
  { title: 'Dead by Daylight', img_src: '/img/hero/bg_party_3.webp' },
];

export default function PartyList() {
  const dummyPartyList: party[] = Array(9).fill(dummyParty);
  const totalPartyNum = 82;
  const userName = '홍길동';
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
              전체 <span className="font-bold">{totalPartyNum}</span>개의 파티가
            </p>
            <p className="text-lg">
              <span className="font-bold">{userName}</span>님을 기다리고 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className="fixed right-14 top-[600px] z-50">
        <button className="rounded-full size-16 bg-neutral-300 text-neutral-700" onClick={() => alert('click!')}>
          생성
        </button>
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
            <Switch id="os" />
            <Label htmlFor="os" className="text-xl text-neutral-900 font-medium">
              맥 OS 지원
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {dummyPartyList.map((party) => (
            <PartyCard key={party.party_name} data={party} />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="text-base" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="text-base" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
}
