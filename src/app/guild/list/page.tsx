'use client';
import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import GuildHorizon from '@/components/guild/guild-horizon';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { guild } from '@/types/guild';
import { dummyGuild } from '@/utils/dummyData';
import GuildSearchComponent from '@/components/guild/guild-search-component';
import { ChevronDown } from 'lucide-react';

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
  const dummyGuildList: guild[] = Array(9).fill(dummyGuild);

  return (
    <div className="relative space-y-16 mb-24">
      <section className="w-full h-[520px]">
        <HeroSwiperBanner data={imageList}>
          <div className="wrapper">
            <p className="font-helvetica text-[160px] text-white font-normal absolute -bottom-[46px] tracking-wider">
              GUILD LIST
            </p>
          </div>
        </HeroSwiperBanner>
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
          <GuildSearchComponent className="w-full group-has-[input:checked]:opacity-0 transition-all duration-300 ease-in-out" />
        </div>
      </section>

      <section className="wrapper space-y-10">
        <SortRadioGroup options={sortOptions} />
        <div className="grid grid-cols-3 gap-6">
          {dummyGuildList.map((guild) => (
            <GuildHorizon key={guild.guild_name} data={guild} />
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
