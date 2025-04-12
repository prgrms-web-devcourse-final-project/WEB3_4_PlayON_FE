'use client';

import HeroSection from './intro/HeroSection';
import PartySection from './intro/PartySection';
import GuildSection from './intro/GuildSection';
import TotalSection from './intro/TotalSection';
import LastSection from './intro/LastSection';
import ThreeController from './intro/ThreeController';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden relative">
      <div className="fixed w-[1280px] left-1/2 top-8 -translate-x-1/2  z-50 border border-red-600">
        <ThreeController />
      </div>
      <HeroSection />
      <PartySection />
      <GuildSection />
      <TotalSection />
      <LastSection />
      <div
        className="
      "
      ></div>
    </main>
  );
}
