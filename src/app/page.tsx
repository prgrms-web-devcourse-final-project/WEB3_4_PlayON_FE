'use client';

import HeroSection from './intro/HeroSection';
import PartySection from './intro/PartySection';
import GuildSection from './intro/GuildSection';
import TotalSection from './intro/TotalSection';
import LastSection from './intro/LastSection';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <PartySection />
      <GuildSection />
      <TotalSection />
      <LastSection />
    </main>
  );
}
