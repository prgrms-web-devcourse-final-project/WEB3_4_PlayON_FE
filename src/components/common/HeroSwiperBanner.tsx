import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { ReactNode } from 'react';

interface HeroSwiperBannerProps {
  imageList: string[];
  children?: ReactNode;
}

export default function HeroSwiperBanner({ imageList, children }: HeroSwiperBannerProps) {
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
        {imageList.map((img) => (
          <SwiperSlide key={img}>
            <div style={{ backgroundImage: `url(${img})` }} className="size-full bg-center bg-cover">
              <div className="size-full bg-purple-600/15">{children}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
