'use client';

import { guild } from '@/types/guild';
import GuildFullImage, { GuildFullImageSkeleton } from '../../guild/guild-fullimage';
import './style.css';
import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselItem, CarouselContent, CarouselApi } from '../../ui/carousel';
import RetroButton from '../RetroButton';
import SteamCard from '@/components/game/SteamCard';
import Link from 'next/link';

import { dummyGameSimple, dummyGuild } from '@/utils/dummyData';
import { gameSimple } from '@/types/games';

type SearchGuildWithGameProps = {
  leftCarouselTitle: ReactNode;
  className?: string;
  textColor: 'white' | 'black';
};

const guildDummyData: guild[] = [dummyGuild, dummyGuild, dummyGuild];

export default function SearchGuildWithGame(props: SearchGuildWithGameProps) {
  const [api, setApi] = useState<CarouselApi>();

  const dummyGameArr = new Array<gameSimple>(8).fill(dummyGameSimple);
  function EmptyCard(): ReactNode {
    return (
      <div className="h-[251px]">
        <div className="w-[193px] aspect-square"></div>
      </div>
    );
  }
  function SteamCardCarouselSlideBuilder(index: number, slidesPerView: number, data: gameSimple[]): ReactNode {
    const slideData = data.slice(index, index + slidesPerView);
    return (
      <div className="flex gap-4">
        {slideData.map((_, ind) => (
          <div key={`${index}_${ind}`} onClick={() => console.log(_.title)}>
            <SteamCard data={dummyGameSimple} titleColor={props.textColor === 'white' ? 'text-white' : 'text-black'} />
          </div>
        ))}
        {Array.from({ length: slidesPerView - slideData.length }).map((_, ind) => {
          return <EmptyCard key={`${index}_empty_${ind}`} />;
        })}
      </div>
    );
  }

  const q = dummyGameArr.length / 3;
  const r = dummyGameArr.length % 3;
  const numSlides = r === 0 ? q : q + 1;

  return (
    <div className={`w-full min-w-[1280px] flex justify-center gap-[134px] ${props.className}`}>
      <div className="w-[627px] flex flex-col justify-center">
        {props.leftCarouselTitle}
        <div className="h-[250px] rounded-xl mb-6" onPointerDownCapture={(e) => e.stopPropagation}>
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            orientation="horizontal"
            className="w-full "
            setApi={setApi}
          >
            <CarouselContent className="select-none">
              {Array.from({ length: numSlides }).map((_, ind) => {
                return <CarouselItem key={ind}>{SteamCardCarouselSlideBuilder(ind * 3, 3, dummyGameArr)}</CarouselItem>;
              })}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex gap-9 justify-end">
          <RetroButton
            type="grey"
            className="h-12 w-12"
            callback={() => {
              console.log(api?.canScrollPrev());
              if (api?.canScrollPrev()) api.scrollPrev();
            }}
          >
            <ChevronLeft />
          </RetroButton>
          <RetroButton
            type="grey"
            className="h-12 w-12"
            callback={() => {
              console.log(api?.canScrollNext());
              if (api?.canScrollNext()) api.scrollNext();
            }}
          >
            <ChevronRight />
          </RetroButton>
        </div>
      </div>
      <div className="w-[520px] flex items-center overflow-hidden relative">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className="h-[572px]">
            {guildDummyData.map((e, ind) => (
              <CarouselItem key={`${e.guild_name}_${ind}`} className="basis-1/2">
                <Link href={'#'}>
                  <GuildFullImage data={e} className="" />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className={`${props.textColor === 'white' ? 'fade-overlay' : 'fade-overlay-white'} absolute w-full h-full pointer-events-none`}
        ></div>
      </div>
    </div>
  );
}
