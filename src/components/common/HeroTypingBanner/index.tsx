'use client';
// import { Input } from '@/components/ui/input';
import { ReactNode, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './style.css';

type Banner = {
  title: string;
  image: string;
};

interface HeroTypingBannerProps {
  data: Banner[];
  isStatic?: boolean;
  children?: ReactNode;
}

export default function HeroTypingBanner({ data, isStatic, children }: HeroTypingBannerProps) {
  const [index, setIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);

  if (isStatic) {
    return (
      <div style={{ backgroundImage: `url(${data[0].image})` }} className="size-full bg-center bg-cover px-auto">
        <div className="size-full bg-purple-800/50 flex flex-col gap-5 items-center justify-center">
          <p className="text-white font-suit font-extrabold text-6xl leading-[80px] typing-animation infinite">
            {data[0].title}
          </p>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="size-full relative">
      <Swiper
        slidesPerView={1}
        onSlideChangeTransitionStart={(swiper) => {
          setIsRemoving(true);
          setTimeout(() => {
            setIsRemoving(false);
          }, 2500);
          console.log('start', swiper.realIndex);
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          console.log('end', swiper.realIndex);
          setIndex(swiper.realIndex);
        }}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={2500}
        loop={true}
        className="size-full"
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx} className="size-full">
            <div className="size-full bg-purple-800 relative">
              <div
                style={{ backgroundImage: `url(${item.image})` }}
                className="size-full bg-top bg-cover blur-sm opacity-30 place-content-center place-items-center space-y-5"
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 place-content-center flex flex-col gap-8 items-center z-10">
        <div>
          <p className="text-white font-suit text-xl w-[700px]">지금 핫한</p>
          <p
            key={data[index].title}
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
