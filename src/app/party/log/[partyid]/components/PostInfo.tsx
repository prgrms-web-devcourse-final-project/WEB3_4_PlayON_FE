'use client';

import { partyLog } from '@/types/party';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import '../partySwiper.css';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import styles from '../partyLog.module.css';

type Props = {
  partyLog: partyLog;
};

export default function PostInfo({ partyLog }: Props) {
  // 기본 이미지
  const defaultImg =
  'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg?t=1721923149';
  
  console.log('스크린샷 배열:', partyLog?.screenshot);
  return (
    <section className="flex flex-col gap-12 mt-12">
      <div>
        <h4 className="text-xl font-bold mb-4">스크린 샷</h4>
        <Swiper
          className="screenshotSwiper"
          scrollbar={{ hide: true }}
          modules={[Pagination]}
          pagination={{
            type: 'progressbar',
          }}
          loop
        >
          {partyLog.screenshot.map((screenshot, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex gap-6 items-start">
                <Image
                  src={screenshot.img_src || defaultImg}
                  alt={`${screenshot.author.nickname}의 스크린샷`}
                  width={736}
                  height={414}
                  className="screen object-contain max-h-[420px]"
                ></Image>
                <div>
                  <UserInfoHorizontal key={screenshot.author.memberId} data={screenshot.author} />
                  <p
                    className={`w-full bg-white p-4 max-w-screen-sm rounded-md border border-neutral-300 mt-4 ${styles.chatBubble}`}
                  >
                    {screenshot.comment}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1">파티 후기</h4>
        {partyLog.review.map((review, idx) => (
          <div key={idx} className="py-4 border-b border-neutral-300 last:border-none">
            <UserInfoHorizontal key={review.author.memberId} data={review.author} size="small"></UserInfoHorizontal>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
