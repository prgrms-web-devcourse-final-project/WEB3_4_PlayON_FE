'use client';

import HeroSection from './intro/HeroSection';
import PartySection from './intro/PartySection';
import GuildSection from './intro/GuildSection';
import TotalSection from './intro/TotalSection';
import LastSection from './intro/LastSection';
import ThreeController from './intro/ThreeController';
import { useRef, useState } from 'react';
import { Object3D } from 'three';

export default function Home() {
  const modelObject = useRef<Object3D | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  return (
    <main className="w-full overflow-x-hidden relative bg-purple-600">
      <div className="w-[1280px] left-1/2 top-0 -translate-x-1/2 fixed">
        <ThreeController modelObject={modelObject} setModelLoaded={setModelLoaded} containerRef={containerRef} />
      </div>
      {modelLoaded && (
        <>
          <HeroSection modelObject={modelObject.current} containerRef={containerRef} />
          <PartySection modelObject={modelObject.current} />
          <GuildSection modelObject={modelObject.current} />
          <TotalSection />
          <LastSection />
        </>
      )}
    </main>
  );
}
