'use client';

import { guild } from '@/types/guild';
import GuildFullImage, { GuildFullImageSkeleton } from '../../guild/guild-fullimage';
import './style.css';
import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselItem, CarouselContent, CarouselApi } from '../../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import RetroButton from '../RetroButton';
import { dummyGuild } from '@/utils/dummyData';

type SearchGuildWithGameProps = {
  leftCarouselTitle: ReactNode;
  className?: string;
  textColor: 'white' | 'black';
};

const guildDummyData: guild[] = [dummyGuild, dummyGuild, dummyGuild];

export default function SearchGuildWithGame(props: SearchGuildWithGameProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [game, setGame] = useState(0);

  return (
    <div className={`w-full min-w-[1280px] flex justify-center gap-[134px] ${props.className}`}>
      <div className="w-[627px] flex flex-col justify-center">
        {props.leftCarouselTitle}
        <div className="h-[250px] rounded-xl mb-6">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            orientation="horizontal"
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="select-none">
              {Array.from({ length: 5 }).map((_, ind) => (
                <CarouselItem className=" flex flex-col gap-4 basis-1/3" key={ind}>
                  <div className="h-[193px] w-[193px] bg-neutral-400 rounded-xl"></div>
                  <div>
                    <p className={`${props.textColor === 'white' ? 'text-white' : ''} font-suit text-xl font-semibold`}>
                      GAME TITLE
                    </p>
                    <p className={`${props.textColor === 'white' ? 'text-white' : ''} font-suit text-sm font-medium`}>
                      Genre, Genre
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex h-10 gap-9 justify-end">
          <RetroButton type="black" className="aspect-square" callback={() => console.log('<')}>
            <ChevronLeft />
          </RetroButton>
          <RetroButton type="black" className="aspect-square" callback={() => console.log('>')}>
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
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          orientation="vertical"
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="h-[572px]">
            {guildDummyData.map((e, ind) => (
              <CarouselItem key={`${e.guild_name}_${ind}`} className="basis-1/2">
                <GuildFullImage data={e} className="" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="fade-overlay absolute w-full h-full pointer-events-none"></div>
      </div>
    </div>
  );
}
