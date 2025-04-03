'use client';

import guild from '@/types/guild';
import GuildFullImage, { GuildFullImageSkeleton } from '../../guild/guild-fullimage';
import './style.css';
import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselItem, CarouselContent, CarouselApi } from '../../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import RetroButton from '../RetroButton';

type SearchGuildWithGameProps = {
  leftCarouselTitle: ReactNode;
  className?: string;
};

const guildDummyData: { game: string; guilds: guild[] }[] = [
  {
    game: 'Counter Strike 2',
    guilds: [
      {
        name: '카스 1',
        description: '카스2 길드 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '길드', '태그'],
        image:
          'https://i.namu.wiki/i/NxTjB2x5nsxL24FEJZ0AZl62MMEHxE6bOT1BXLHLYUl2uCnadrnvL9hcf-1DnMpnKYxqUCyzrNUyHlYIKxz1PAqqPbisdQo08Ynzj0iVCXJzS8ifYg9gPGzg78085bfaJRp9vPCpgwTBieILMPtEmQ.webp',
        numMembers: 24,
      },
      {
        name: '카스 2',
        description: '카스2 길드 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '길드', '태그'],
        image:
          'https://i.namu.wiki/i/NxTjB2x5nsxL24FEJZ0AZl62MMEHxE6bOT1BXLHLYUl2uCnadrnvL9hcf-1DnMpnKYxqUCyzrNUyHlYIKxz1PAqqPbisdQo08Ynzj0iVCXJzS8ifYg9gPGzg78085bfaJRp9vPCpgwTBieILMPtEmQ.webp',
        numMembers: 24,
      },
      {
        name: '카스 3',
        description: '카스2 길드 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '길드', '태그'],
        image:
          'https://i.namu.wiki/i/NxTjB2x5nsxL24FEJZ0AZl62MMEHxE6bOT1BXLHLYUl2uCnadrnvL9hcf-1DnMpnKYxqUCyzrNUyHlYIKxz1PAqqPbisdQo08Ynzj0iVCXJzS8ifYg9gPGzg78085bfaJRp9vPCpgwTBieILMPtEmQ.webp',
        numMembers: 24,
      },
      {
        name: '카스 4',
        description: '카스2 길드 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '길드', '태그'],
        image:
          'https://i.namu.wiki/i/NxTjB2x5nsxL24FEJZ0AZl62MMEHxE6bOT1BXLHLYUl2uCnadrnvL9hcf-1DnMpnKYxqUCyzrNUyHlYIKxz1PAqqPbisdQo08Ynzj0iVCXJzS8ifYg9gPGzg78085bfaJRp9vPCpgwTBieILMPtEmQ.webp',
        numMembers: 24,
      },
      {
        name: '카스 5',
        description: '카스2 길드 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '길드', '태그'],
        image:
          'https://i.namu.wiki/i/NxTjB2x5nsxL24FEJZ0AZl62MMEHxE6bOT1BXLHLYUl2uCnadrnvL9hcf-1DnMpnKYxqUCyzrNUyHlYIKxz1PAqqPbisdQo08Ynzj0iVCXJzS8ifYg9gPGzg78085bfaJRp9vPCpgwTBieILMPtEmQ.webp',
        numMembers: 24,
      },
    ],
  },
  {
    game: 'Monster Hunter: Wilds',
    guilds: [
      {
        name: '몬헌 와일즈 길드 1',
        description: '몬헌 와일즈 길드 설명 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '수렵', '생활'],
        image:
          'https://i.namu.wiki/i/Ghgfb7ykYcuLAvMw1JK2b5j_gO53FJTsDhcoNbhWR0ahVxTMsftKTDudqXHA46K7gACaUuMx-smqq_K3j_DBdFerPsctFlBQtm1FeC2Tbxq4vLTwjxprEjueGkIh1d7lPBODnfV2oA4-pYaNSB0XVQ.webp',
        numMembers: 24,
      },
      {
        name: '몬헌 와일즈 길드 2',
        description: '몬헌 와일즈 길드 설명 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '수렵', '생활'],
        image:
          'https://i.namu.wiki/i/Ghgfb7ykYcuLAvMw1JK2b5j_gO53FJTsDhcoNbhWR0ahVxTMsftKTDudqXHA46K7gACaUuMx-smqq_K3j_DBdFerPsctFlBQtm1FeC2Tbxq4vLTwjxprEjueGkIh1d7lPBODnfV2oA4-pYaNSB0XVQ.webp',
        numMembers: 24,
      },
      {
        name: '몬헌 와일즈 길드 3',
        description: '몬헌 와일즈 길드 설명 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '수렵', '생활'],
        image:
          'https://i.namu.wiki/i/Ghgfb7ykYcuLAvMw1JK2b5j_gO53FJTsDhcoNbhWR0ahVxTMsftKTDudqXHA46K7gACaUuMx-smqq_K3j_DBdFerPsctFlBQtm1FeC2Tbxq4vLTwjxprEjueGkIh1d7lPBODnfV2oA4-pYaNSB0XVQ.webp',
        numMembers: 24,
      },
      {
        name: '몬헌 와일즈 길드 4',
        description: '몬헌 와일즈 길드 설명 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '수렵', '생활'],
        image:
          'https://i.namu.wiki/i/Ghgfb7ykYcuLAvMw1JK2b5j_gO53FJTsDhcoNbhWR0ahVxTMsftKTDudqXHA46K7gACaUuMx-smqq_K3j_DBdFerPsctFlBQtm1FeC2Tbxq4vLTwjxprEjueGkIh1d7lPBODnfV2oA4-pYaNSB0XVQ.webp',
        numMembers: 24,
      },
      {
        name: '몬헌 와일즈 길드 5',
        description: '몬헌 와일즈 길드 설명 Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['재미있는', '수렵', '생활'],
        image:
          'https://i.namu.wiki/i/Ghgfb7ykYcuLAvMw1JK2b5j_gO53FJTsDhcoNbhWR0ahVxTMsftKTDudqXHA46K7gACaUuMx-smqq_K3j_DBdFerPsctFlBQtm1FeC2Tbxq4vLTwjxprEjueGkIh1d7lPBODnfV2oA4-pYaNSB0XVQ.webp',
        numMembers: 24,
      },
    ],
  },
  {
    game: 'Persona 3: Reload',
    guilds: [
      {
        name: '페르소나에 길드가 왜 있어',
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['rnlcksgdk'],
        image:
          'https://i.namu.wiki/i/8pcN6e-FGWMrUuDE3eW0IYSFP1W2ZGZPPCczAsBfvJxDN_p2bJ8LDeQb8vR9ioyFtJAtUwNpANI0Ad55nSJkInq-utRfwh7dUXDpSbhJ4acb5Z8hRoq4FWkkYeFFNcXprBKnb4qA5io6tAT17r6Zug.webp',
        numMembers: 24,
      },
      {
        name: '페르소나에 길드가 왜 있어',
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['rnlcksgdk'],
        image:
          'https://i.namu.wiki/i/8pcN6e-FGWMrUuDE3eW0IYSFP1W2ZGZPPCczAsBfvJxDN_p2bJ8LDeQb8vR9ioyFtJAtUwNpANI0Ad55nSJkInq-utRfwh7dUXDpSbhJ4acb5Z8hRoq4FWkkYeFFNcXprBKnb4qA5io6tAT17r6Zug.webp',
        numMembers: 24,
      },
      {
        name: '페르소나에 길드가 왜 있어',
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['rnlcksgdk'],
        image:
          'https://i.namu.wiki/i/8pcN6e-FGWMrUuDE3eW0IYSFP1W2ZGZPPCczAsBfvJxDN_p2bJ8LDeQb8vR9ioyFtJAtUwNpANI0Ad55nSJkInq-utRfwh7dUXDpSbhJ4acb5Z8hRoq4FWkkYeFFNcXprBKnb4qA5io6tAT17r6Zug.webp',
        numMembers: 24,
      },
      {
        name: '페르소나에 길드가 왜 있어',
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['rnlcksgdk'],
        image:
          'https://i.namu.wiki/i/8pcN6e-FGWMrUuDE3eW0IYSFP1W2ZGZPPCczAsBfvJxDN_p2bJ8LDeQb8vR9ioyFtJAtUwNpANI0Ad55nSJkInq-utRfwh7dUXDpSbhJ4acb5Z8hRoq4FWkkYeFFNcXprBKnb4qA5io6tAT17r6Zug.webp',
        numMembers: 24,
      },
      {
        name: '페르소나에 길드가 왜 있어',
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        guildTags: ['rnlcksgdk'],
        image:
          'https://i.namu.wiki/i/8pcN6e-FGWMrUuDE3eW0IYSFP1W2ZGZPPCczAsBfvJxDN_p2bJ8LDeQb8vR9ioyFtJAtUwNpANI0Ad55nSJkInq-utRfwh7dUXDpSbhJ4acb5Z8hRoq4FWkkYeFFNcXprBKnb4qA5io6tAT17r6Zug.webp',
        numMembers: 24,
      },
    ],
  },
];

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
                    <p className="text-white font-suit text-xl font-semibold">GAME TITLE</p>
                    <p className="text-white font-suit text-sm font-medium">Genre, Genre</p>
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
            {guildDummyData[game].guilds.map((e, ind) => (
              <CarouselItem key={`${e.name}_${ind}`} className="basis-1/2">
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
