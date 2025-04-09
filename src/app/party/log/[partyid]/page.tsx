import { partyLog } from '@/types/party';
import { dummyPartyLog, dummyUserSimple } from '@/utils/dummyData';
import styles from './partyLog.module.css';

import DefaultInfo from './components/DefaultInfo';
import PostInfo from './components/PostInfo';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import ReviewForm from './components/ReviewForm';
import PlayerRecommendForm from './components/PlayerRecommendForm';
import UserInfoVertical from '../../components/UserInfoVertical';
import ScreenshotForm from './components/ScreenshotForm';

export default function PartyLog() {
  const partyLog: partyLog = dummyPartyLog;
  const gameBackgroundUrl =
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/page_bg_raw.jpg?t=1743743917';
  const mvp = dummyUserSimple;
  const mpvRecommend = 10;
  const isParticipated = true; //이쪽에 토큰 받아서 참가자인지 확인
  return (
    <div className="bg-purple-100 pt-28 pb-32 ">
      <div
        className={`${styles.background} w-full aspect-video absolute top-0`}
        style={{ backgroundImage: `url(${gameBackgroundUrl})` }}
      >
        <div className="bg-gradient-to-b from-purple-50/0 to-purple-100 w-full h-1/2 absolute bottom-0"></div>
      </div>
      <div className="wrapper">
        <div className="bg-white/40 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-white">
          <DefaultInfo partyLog={partyLog} />
          <PostInfo partyLog={partyLog} />
          <div className="absolute top-[260px] right-20 bg-white px-6 py-3 border-2 border-amber-400 rounded-xl ">
            <UserInfoVertical data={mvp}></UserInfoVertical>
            <div className="flex text-amber-400 mt-2 justify-center flex-wrap">
              <Image
                src="/img/laurel/laurel_mpv.png"
                alt="mpv laurel"
                width={160}
                height={40}
                className="absolute -top-1/3"
              />
              {Array.from({ length: Math.min(mpvRecommend, 3) }).map((_, idx) => (
                <Trophy key={idx} />
              ))}
              {mpvRecommend > 3 && (
                <div className="w-6 aspect-square bg-amber-400 rounded-full flex gap-1 items-center justify-center">
                  <span className="text-xs font-bold text-white">+{mpvRecommend - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {isParticipated && (
          <div className="bg-white/40 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-white mt-6">
            <div className="flex flex-col gap-8">
              <h4 className="text-center text-4xl font-extrabold text-purple-600">파티로그 작성</h4>
              <ScreenshotForm />
              <ReviewForm />
              <PlayerRecommendForm partyLog={partyLog} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
