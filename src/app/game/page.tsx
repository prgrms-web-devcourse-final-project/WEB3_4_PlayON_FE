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
    <main className="mb-20 space-y-20">
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
