'use client';

import { useEffect, useState } from 'react';
import { usePartyLog } from '@/api/partyLog';
import { useParty } from '@/api/party';

import styles from './partyLog.module.css';
import DefaultInfo from './components/DefaultInfo';
import PostInfo from './components/PostInfo';
import UserInfoVertical from '../../components/UserInfoVertical';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import PartyLogSkeleton from './components/PartyLogSkeleton';
import { parsePartyLogData, PartyLogProps } from './parsePartyLogData';
import PartyLogForm from './components/PartyLogForm';
import { getSteamImage } from '@/api/steamImg';

export default function PartyLog() {
  const partyApi = useParty();
  const partyLogApi = usePartyLog();
  const [partyLog, setPartyLog] = useState<PartyLogProps | null>(null);
  const params = useParams();
  const partyid = params?.partyid as string;
  const mvpRecommend = partyLog?.mvpPoint ?? 0;
  const gameBackgroundUrl =
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/page_bg_raw.jpg?t=1743743917';

  const currntUser = useAuthStore((state) => state.user);

  // 현재 유저의 partyMemberId 구하기
  const currentPartyMemberId = partyLog?.party_info.participation.find(
    (member) => member.username === currntUser?.username
  )?.partyMemberId;

  // 리뷰 작성자들의 partyMemberId 목록
  const reviewedIds = partyLog?.review.map((log) => log.author.partyMemberId);

  // 조건 계산
  const isPartyMember = !!currentPartyMemberId;
  const hasWrittenLog = reviewedIds?.includes(currentPartyMemberId ?? '');
  const isParticipated = isPartyMember && !hasWrittenLog;

  useEffect(() => {
    const fetchPartyLog = async () => {
      try {
        const [partyRes, partyLogsRes] = await Promise.all([
          partyApi.PartyResult(partyid),
          partyLogApi.GetPartyLogs(partyid),
        ]);

        const parsed = parsePartyLogData({
          data: {
            partyDetail: partyRes?.data.data.partyDetail,
            partyLogs: partyLogsRes?.data.data,
          },
        });

        setPartyLog(parsed);
      } catch (err) {
        console.error('파티 로그 불러오기 실패', err);
      }
    };

    fetchPartyLog();
  }, [partyid]);

  const [appid, setAppid] = useState<number>();

  const [bg, setBg] = useState('');
  useEffect(() => {
    const fetchBg = async () => {
      setAppid(partyLog?.party_info.appid);
      const res = await getSteamImage(appid, 'background');
      setBg(res);
  
      console.log(bg);
    };
    fetchBg();
  }, []);

  if (!partyLog)
    return (
      <div className="text-center pt-28">
        <PartyLogSkeleton />
      </div>
    );

  return (
    <div className="bg-purple-100 pt-28 pb-32">
      <div
        className={`${styles.background} w-full aspect-video absolute top-0`}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-gradient-to-b from-purple-50/0 to-purple-100 w-full h-1/2 absolute bottom-0" />
      </div>

      <div className="wrapper">
        {/* 파티 로그 작성*/}
        {isParticipated && (
          <div className="bg-white/40 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-white mb-6">
            <div className="flex flex-col gap-8">
              <h4 className="text-center text-4xl font-extrabold text-purple-600">파티로그 작성</h4>
              <PartyLogForm partyLog={partyLog} />
            </div>
          </div>
        )}

        {/* 파티 로그 정보 렌더링 */}
        <div className="bg-white/40 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-white">
          <DefaultInfo partyLog={partyLog} />
          <PostInfo partyLog={partyLog} />

          {/* MVP 유저 배지 */}
          <div className="absolute top-[260px] right-20 bg-white px-6 py-3 border-2 border-amber-400 rounded-xl">
            <UserInfoVertical data={partyLog?.mvp} reCommend={true} />
            <div className="flex text-amber-400 mt-2 justify-center flex-wrap">
              <Image
                src="/img/laurel/laurel_mpv.png"
                alt="mpv laurel"
                width={160}
                height={40}
                className="absolute -top-1/3"
              />
              {Array.from({ length: Math.min(mvpRecommend, 3) }).map((_, idx) => (
                <Trophy key={idx} />
              ))}
              {mvpRecommend > 3 && (
                <div className="w-6 aspect-square bg-amber-400 rounded-full flex gap-1 items-center justify-center">
                  <span className="text-xs font-bold text-white">+{mvpRecommend - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
