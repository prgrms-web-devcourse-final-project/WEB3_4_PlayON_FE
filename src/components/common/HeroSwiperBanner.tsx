'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { ReactNode } from 'react';
import Tag from './Tag';

interface Banner {
  title: string;
  img_src: string;
}

interface HeroSwiperBannerProps {
  data: Banner[];
  children?: ReactNode;
}

export default function HeroSwiperBanner({ data, children }: HeroSwiperBannerProps) {
  return (
    <div className="size-full relative">
      <Swiper
        slidesPerView={1}
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        className="size-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.title}>
            <div style={{ backgroundImage: `url(${item.img_src})` }} className="size-full bg-center bg-cover">
              <div className="size-full bg-purple-600/15">
                <div className="flex wrapper pt-5 justify-end items-start">
                  <Tag size="big" style="retro" background="dark" className="py-2">
                    {item.title}
                  </Tag>
                </div>
                {children}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
