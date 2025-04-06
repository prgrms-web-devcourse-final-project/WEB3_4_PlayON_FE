'use client';

import PartySearchComponent from '@/components/party/party-search-component';
import PartyCard from '@/components/party/PartyCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { party } from '@/types/party';
import { dummyParty } from '@/utils/dummyData';
import { ChevronDown } from 'lucide-react';

// const sortOptions: SortOption[] = [
//   { id: 'popularity', label: '인기순' },
//   { id: 'latest', label: '최신순' },
//   { id: 'capacity', label: '마감임박' },
//   { id: 'members', label: '인원순' },
// ];

// const imageList = [
//   { title: 'Gang Beast', img_src: '/img/hero/bg_party_1.webp' },
//   { title: 'It Takes Two', img_src: '/img/hero/bg_party_2.webp' },
//   { title: 'Dead by Daylight', img_src: '/img/hero/bg_party_3.webp' },
// ];

export default function PartyList() {
  const dummyPartyList: party[] = Array(9).fill(dummyParty);
  return (
    <div className="relative space-y-16 mb-24">
      <section className="w-full h-[520px]">
        {/* <HeroSwiperBanner data={imageList}>
          <div className="wrapper">
            <p className="font-helvetica text-[160px] text-white font-normal absolute -bottom-[46px] tracking-wider">
              PARTY LIST
            </p>
          </div>
        </HeroSwiperBanner> */}
      </section>
      <div className="fixed right-14 top-[500px] z-50">
        <button className="rounded-full size-16 bg-neutral-300 text-neutral-700" onClick={() => alert('click!')}>
          생성
        </button>
      </div>

      <section className="wrapper group space-y-6 min-h-16">
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
        {/* <SortRadioGroup options={sortOptions} /> */}
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
