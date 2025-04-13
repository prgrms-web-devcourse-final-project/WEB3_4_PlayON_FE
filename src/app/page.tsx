'use client';

import HeroSection from './intro/HeroSection';
import PartySection from './intro/PartySection';
import GuildSection from './intro/GuildSection';
import TotalSection from './intro/TotalSection';
import LastSection from './intro/LastSection';
import ThreeController from './intro/ThreeController';
import { useState } from 'react';
import { Object3D } from 'three';

export default function Home() {
  const [modelObject, setModelObject] = useState<Object3D | null>(null);
  return (
    <main className="w-full overflow-x-hidden relative bg-purple-600">
      <div className="w-[1280px] left-1/2 top-0 -translate-x-1/2 fixed">
        <ThreeController setModelObject={setModelObject} />
      </div>
      <HeroSection modelObject={modelObject} />
      <PartySection modelObject={modelObject} />
      <GuildSection modelObject={modelObject} />
      <TotalSection />
      <LastSection />
    </main>
  );
}
