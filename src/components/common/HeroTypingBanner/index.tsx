'use client';
import { ReactNode, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import './style.css';
import 'swiper/css';
import 'swiper/css/effect-fade';

interface Banner {
  title: string;
  img_src: string;
}

interface HeroTypingBannerProps {
  data: Banner[];
  isStatic?: boolean;
  children?: ReactNode;
}

export default function HeroTypingBanner({ data, isStatic, children }: HeroTypingBannerProps) {
  const [index, setIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleSliderChangeStart = useCallback(() => {
    setIsRemoving(true);
  }, []);

  const handleSliderChangeEnd = useCallback((swiper: SwiperType) => {
    setIndex(swiper.realIndex);
    setIsRemoving(false);
  }, []);

  if (isStatic) {
    return (
      <div style={{ backgroundImage: `url(${data[0].img_src})` }} className="size-full bg-center bg-cover">
        <div className="size-full bg-purple-800/50 flex flex-col gap-5 items-center justify-center">
          <div className="flex align-middle gap-4 w-[560px]">
            <span className="text-white font-suit font-extrabold text-6xl leading-[80px]">PLAY ON</span>
            <span className="text-white font-suit font-extrabold text-6xl leading-[80px] typing-animation infinite flex-grow">
              {data[0].title}
            </span>
          </div>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="size-full relative">
      <Swiper
        slidesPerView={1}
        modules={[EffectFade, Autoplay]}
        effect="fade"
        onSlideChangeTransitionStart={handleSliderChangeStart}
        onSlideChangeTransitionEnd={handleSliderChangeEnd}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        className="size-full"
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx} className="size-full">
            <div className="size-full bg-purple-800 relative">
              <div
                style={{ backgroundImage: `url(${item.img_src})` }}
                className="size-full bg-top bg-cover blur-sm opacity-30 place-content-center place-items-center space-y-5"
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 place-content-center flex flex-col gap-8 items-center z-10">
        <div>
          <p className="text-white font-suit text-xl min-w-[740px]">지금 핫한</p>
          <p
            key={index}
            className={`w-fit text-white font-suit font-extrabold text-8xl blur-none whitespace-nowrap typing-animation place-self-start ${isRemoving ? 'removing' : ''}`}
          >
            {data[index].title}
          </p>
          <p className="text-white font-suit text-2xl font-extrabold text-end">파티 찾아보기</p>
        </div>
        {children}
      </div>
    </div>
  );
}
