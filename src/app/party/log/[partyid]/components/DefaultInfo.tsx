'use client';

import Tag from '@/components/common/Tag';
import { partyLog } from '@/types/party';
import formatDate from '@/utils/formatDate';
import { timeCalc } from '@/utils/timeCalc';
import UserInfoVertical from '../../../components/UserInfoVertical';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

type Props = {
  partyLog: partyLog;
};

export default function DefaultInfo({ partyLog }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <div className="text-center w-full flex flex-col justify-center">
        <img src="/img/icons/pixel_swords.svg" alt="swords pixel icon" className="w-11 mx-auto" />
        <p className="font-dgm text-purple-800 text-lg mb-4">Play complete!</p>
        <h3 className="text-purple-700 text-7xl font-black">{partyLog.party_info.selected_game.title}</h3>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1">파티 룸</h4>
        <p className="text-4xl font-bold">{partyLog.party_info.party_name}</p>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1">파티 스타일</h4>
        <div className="flex gap-2">
          {partyLog.party_info.tags.map((tag, idx) => (
            <Tag key={idx} background="medium">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1">플레이 타임</h4>
        <p>
          {formatDate(partyLog.party_info.start_time, true)} |{' '}
          {partyLog.party_info.end_time && timeCalc(partyLog.party_info.start_time, partyLog.party_info.end_time)}
        </p>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-3">참여 인원</h4>
        <Swiper
          slidesPerView={1.5}
          freeMode
          scrollbar
          breakpoints={{
            480: {
              slidesPerView: 2.5,
            },
            520: {
              slidesPerView: 3.5,
            },
            720: {
              slidesPerView: 5.5,
            },
            920: {
              slidesPerView: 6.5,
            },
            1080: {
              slidesPerView: 7.5,
            },
            1280: {
              slidesPerView: 8.5,
            },
          }}
        >
          {partyLog.party_info.participation.map((user) => (
            <SwiperSlide key={user.memberId}>
              <UserInfoVertical key={user.memberId} data={user} reCommend={true}></UserInfoVertical>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
