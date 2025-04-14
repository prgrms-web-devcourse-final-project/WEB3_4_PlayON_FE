'use client';

import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import PartyMemberPicks from './sections/party-member-picks';
import SteamRankingSection from './sections/steam-ranking-section';
import GenreRecommendation from './sections/genre-recommendation';
import PlaytimeRecommendation from './sections/playtime-recommendation';
import HeroSection from './sections/hero-section';
import BounceButton from '@/components/common/BounceButton';
import { GAME_ROUTE } from '@/constants/routes/game';

export default function Game() {
  return (
    <main
      className="pb-20 space-y-20"
      style={{
        backgroundImage: 'linear-gradient(to top, #f3e8ff 0%, rgba(255,255,255,0) 100%)',
        backgroundSize: '100% 40%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
    >
      <section>
        <HeroSection />
        <PlayOnRollingBanner duration={20} direction="left" />
      </section>
      <PartyMemberPicks />
      <SteamRankingSection />
      <section className="wrapper space-y-20">
        <GenreRecommendation />
        <PlaytimeRecommendation />
        <BounceButton path={GAME_ROUTE.game_list} type="game" tootip="게임 찾기" />
      </section>
    </main>
  );
}
