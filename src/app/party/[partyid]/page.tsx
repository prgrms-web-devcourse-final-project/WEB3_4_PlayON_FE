'use client';
import { useEffect, useState } from 'react';
import { useParty } from '@/api/party';

import { party } from '@/types/party';
import InfoAccordion from './components/InfoAccordion';
import InfoChatting from './components/InfoChatting';
import styles from './partyDetail.module.css';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function PartyDetail() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const nowPartyId = pathname.split('/').filter(Boolean).pop();
  const party = useParty();
  const [partyInfo, setPartyInfo] = useState<party | null>(null);
  const [participated, setParticipated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await party.GetParty(Number(nowPartyId));
      console.log(res);
      if (!res) return;
      setPartyInfo(res);
      if (res.participation.some((partyMember) => partyMember.username == user?.username)) {
        setParticipated(true);
      } else {
        setParticipated(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-purple-100 pt-28 pb-16 min-h-screen flex items-center">
      <div
        className={`${styles.background} w-full aspect-video absolute top-0 z-0`}
        style={{ backgroundImage: `url(${partyInfo?.selected_game.background_src})` }}
      >
        <div className="bg-gradient-to-b from-purple-50/0 to-purple-100 w-full h-1/2 absolute bottom-0"></div>
      </div>
      {partyInfo && (
        <div className="wrapper relative z-10 w-full">
          <div className="bg-white/50 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-whit">
            <InfoAccordion partyInfo={partyInfo} participated={participated} setParticipated={setParticipated} />
            {partyInfo && participated && <InfoChatting />}
          </div>
        </div>
      )}
    </div>
  );
}
