'use client';

import { partyLog } from '@/types/party';
import { dummyPartyLog } from '@/utils/dummyData';
import styles from './partyDetail.module.css';
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import InfoAccordion from './components/InfoAccordion';
import { useState } from 'react';
import InfoChatting from './components/InfoChatting';
const gameBackgroundUrl =
  'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/page_bg_raw.jpg?t=1743743917';

export default function PartyDetail() {
  const partyLog: partyLog = dummyPartyLog;
  const [participated, setParticipated] = useState(true);
  return (
    <div className="bg-purple-100 pt-28 pb-16 min-h-screen flex items-center">
      <div
        className={`${styles.background} w-full aspect-video absolute top-0 z-0`}
        style={{ backgroundImage: `url(${gameBackgroundUrl})` }}
      >
        <div className="bg-gradient-to-b from-purple-50/0 to-purple-100 w-full h-1/2 absolute bottom-0"></div>
      </div>
      <div className="wrapper relative z-10 w-full">
        <div className="bg-white/50 backdrop-blur-md py-10 px-16 rounded-3xl relative border border-whit">
          <InfoAccordion participated={participated} setParticipated={setParticipated} />
          {participated && <InfoChatting />}
        </div>
      </div>
    </div>
  );
}
