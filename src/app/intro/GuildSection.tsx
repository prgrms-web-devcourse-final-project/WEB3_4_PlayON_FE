'use client';
import RetroButton from '@/components/common/RetroButton';
import GuildHorizon, { GuildHorizonSkeleton } from '@/components/guild/guild-horizon';
import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
import styles from './GuildSection.module.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';
import { dummyGuild } from '@/utils/dummyData';

function GuildSection() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef<HTMLDivElement>(null);
  const charBox = useRef<HTMLHeadingElement>(null);
  const guildBox1 = useRef<HTMLDivElement>(null);
  const guildBox2 = useRef<HTMLDivElement>(null);
  const guildBox3 = useRef<HTMLDivElement>(null);
  const [charWalking, setCharWalking] = useState(true);

  useGSAP(() => {
    const Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'top -100%',
        // markers: true,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onLeave: () => setCharWalking(false),
        onEnterBack: () => setCharWalking(true),
      },
    });
    Tl.fromTo(guildBox1.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'sine.in' }, 0)
      .fromTo(guildBox2.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'sine.in' }, 0.2)
      .fromTo(guildBox3.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'sine.in' }, 0.4)
      .fromTo(charBox.current, { x: -800 }, { x: 0, ease: 'power1.in', duration: 2 }, 0);
  });

  return (
    <section className="bg-gradient-to-b from-purple-700 to-purple-50 py-16">
      <div className="wrapper " ref={container}>
        <div className=" text-white">
          <p className="font-dgm text-4xl">OR Join in</p>
          <div className={`${styles.typewriter} my-6`}>
            <h2 className={`font-dgm text-9xl`}>GAME GUILD</h2>
          </div>
          <p className="font-dgm text-xl">함께 게임을 즐길 길드를 찾아보세요</p>
          <div className="w-80 my-12">
            <RetroButton type="purple">더 찾아보기</RetroButton>
          </div>
        </div>
        <div className="flex gap-6 h-[500px]">
          <div ref={guildBox1} className="self-start">
            <GuildHorizon data={dummyGuild} className="max-w-[410px]" />
          </div>
          <div ref={guildBox2} className="self-center">
            <GuildHorizon data={dummyGuild} className="max-w-[410px]" />
          </div>
          <div ref={guildBox3} className="self-end">
            <GuildHorizon data={dummyGuild} className="max-w-[410px]" />
          </div>
        </div>
        <div className="flex -mt-24 ml-2" ref={charBox}>
          <PixelCharacter className="-mx-4" char="archer" motion={charWalking ? 'run' : 'attack'} />
          <PixelCharacter className="-mx-6" char="mage" motion={charWalking ? 'run' : 'ulti'} />
          <PixelCharacter className="-mx-8" char="warrior" motion={charWalking ? 'run' : 'attack'} />
        </div>
      </div>
    </section>
  );
}

export default GuildSection;
