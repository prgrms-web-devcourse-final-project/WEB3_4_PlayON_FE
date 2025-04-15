'use client';

import InfoAccordion from './components/InfoAccordion';
import InfoChatting from './components/InfoChatting';
import styles from './partyDetail.module.css';
import { ChattingContextProvider, PartyContextProvider, usePartyContext } from './components/PartyContext';
import { useEffect, useState } from 'react';
import { getSteamImage } from '@/api/steamImg';

function PartyPage() {
  const { partyInfo, viewLevel } = usePartyContext();
  const [selectedGame, setSelectedGame] = useState('');
  useEffect(() => {
    if (!partyInfo) return;
    const fetchImages = async () => {
      const background = await getSteamImage(partyInfo.appId, 'background');
      setSelectedGame(background);
    };
    fetchImages();
  }, [partyInfo]);
  return (
    <div className="bg-purple-100 pt-28 pb-16 min-h-screen h-full flex items-center overflow-hidden">
      <div
        className={`${styles.background} w-full max-h-screen aspect-video absolute top-0 z-0`}
        style={{ backgroundImage: `url(${selectedGame})` }}
      ></div>
      {partyInfo && (
        <div className="wrapper relative z-10 w-full">
          <div className="bg-white/50 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-whit">
            <InfoAccordion />
            <ChattingContextProvider>{partyInfo && viewLevel('joined') && <InfoChatting />}</ChattingContextProvider>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-purple-50/0 to-purple-100 w-full h-1/2 absolute bottom-0"></div>
    </div>
  );
}

export default function PartyDetail() {
  return (
    <PartyContextProvider>
      <PartyPage />
    </PartyContextProvider>
  );
}
