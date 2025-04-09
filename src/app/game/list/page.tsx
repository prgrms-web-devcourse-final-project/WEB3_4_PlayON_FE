'use client';

import CategoryMenu from '@/components/common/category-menu';
import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { dummyGameDetail2, dummyGameSimple } from '@/utils/dummyData';
import { SearchIcon } from 'lucide-react';
import PickCard from '@/components/game/PickCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function GameList() {
  const imageList = [
    { title: 'Bioshock: Infinite', img_src: '/img/hero/bg_gameList_1.webp' },
    { title: 'Cuphead', img_src: '/img/hero/bg_gameList_2.webp' },
    { title: 'Persona 3: Reload', img_src: '/img/hero/bg_gameList_3.webp' },
    { title: 'Civilization VII', img_src: '/img/hero/bg_gameList_4.webp' },
    { title: 'Dark Souls 3', img_src: '/img/hero/bg_gameList_5.webp' },
  ];
  const dummyGames = new Array(12).fill(dummyGameDetail2);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full h-[520px]">
        <HeroSwiperBanner data={imageList} />
      </section>
      <div
        className="relative rounded-3xl w-[1000px] h-[400px] mt-[-300px] z-10 border border-neutral-300"
        style={{ backdropFilter: 'blue(80)', backgroundColor: 'rgba(255,255,255,0.9)' }}
      >
        <p className="text-white absolute right-0 translate-y-[-100%] text-3xl font-extrabold -mt-2">
          찾으시는 게임이 있으신가요?
        </p>
        <div className="flex flex-col pt-8 px-12 pb-10">
          <div className="flex flex-col flex-auto gap-2 ">
            <p className="font-bold">게임 이름</p>
            <div className="flex gap-10">
              <div className="flex flex-auto items-center border border-neutral-300 rounded px-2 gap-2">
                <SearchIcon className="text-neutral-400" width={16} height={16} />
                <Input
                  placeholder="게임 제목으로 검색하세요"
                  className="border-none shadow-none focus-visible:ring-transparent"
                ></Input>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={true} />
                <p>맥OS 지원</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`출시일 (선택일 이후)`}</p>
              <DateTimePicker onSelect={() => {}} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`출시일 (선택일 이후)`}</p>
              <CategoryMenu categoryItems={['#발매', '#출시 예정']} categoryName="" onSelect={() => {}} />
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`플레이어`}</p>
              <CategoryMenu
                categoryItems={['#멀티 플레이', '#싱글 플레이']}
                categoryName="플레이어"
                onSelect={() => {}}
              />
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`인기 장르`}</p>
              <CategoryMenu
                categoryItems={['#인디', '#액션', '#어드벤처', '#RPG', '#시뮬레이션', '#경쟁', '#퍼즐']}
                categoryName="인기장르"
                onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px]">
        {dummyGames.map((e, ind) => (
          <PickCard key={ind} data={e} />
        ))}
      </div>
      <div className="mt-[100px] mb-[100px]">
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
      </div>
    </div>
  );
}
