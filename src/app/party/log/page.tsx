import { partyLog } from '@/types/party';
import { dummyPartyLog } from '@/utils/dummyData';
import styles from './partyLog.module.css';

import DefaultInfo from './components/DefaultInfo';
import PostInfo from './components/PostInfo';

export default function PartyLog() {
  const partyLog: partyLog = dummyPartyLog;
  const gameBackgroundUrl =
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2246340/page_bg_raw.jpg?t=1743743917';

  return (
    <div className="bg-purple-100 pt-28">
      <div
        className={`${styles.background} w-full aspect-video absolute top-0`}
        style={{ backgroundImage: `url(${gameBackgroundUrl})` }}
      >
        <div className="bg-gradient-to-b from-purple-50/0 to-purple-100 w-full h-1/2 absolute bottom-0"></div>
      </div>
      <div className="wrapper">
        <div className="bg-white/30 backdrop-blur-md py-10 px-16 rounded-3xl">
          <DefaultInfo partyLog={partyLog} />
          <PostInfo partyLog={partyLog} />
        </div>
      </div>
    </div>
  );
}
