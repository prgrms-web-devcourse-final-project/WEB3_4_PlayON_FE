'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';
import SearchGuildWithGame from '@/components/common/search-guild-with-game';
import Image from 'next/image';
import AnimatedSection from './AnimatedSection';
import styles from '@/app/intro/GuildSection.module.css';
import PickCard from '@/components/game/PickCard';

import {
  mainDummyGames,
  mainDummyGamesAppId,
  mainDummyGuilds,
  mainDummyMyGames,
  mainDummyPosts,
} from '@/utils/dummyData';
import CommunityPostShort from '@/components/community/post-short';
import CommunityPostImageShort from '@/components/community/post-image-short';

gsap.registerPlugin(ScrollToPlugin);

function TotalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  // 섹션 등록용 함수
  const registerSection = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!containerRef.current || !ScrollTrigger.isInViewport(containerRef.current)) return;
      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = currentIndex + direction;

      if (newIndex < 0 || newIndex >= sectionRefs.current.length) return;

      isScrolling.current = true;
      setCurrentIndex(newIndex);

      gsap.to(window, {
        scrollTo: {
          y: sectionRefs.current[newIndex].offsetTop - 68,
          autoKill: false,
        },
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          isScrolling.current = false;
        },
      });

      e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [currentIndex]);

  return (
    <section className="bg-purple-50 overflow-hidden" ref={containerRef}>
      <div className="wrapper">
        <section className="h-screen sub-section relative z-10" ref={registerSection}>
          <div className="flex items-center justify-left h-full relative">
            <Link
              className="font-dgm text-8xl underline -mt-24 hover:text-purple-700 text-purple-500 transition-all relative z-50"
              href="/signup"
            >
              Sign UP
            </Link>
            <video autoPlay={true} muted={true} loop={true} className="absolute left-[420px] -mt-20 z-0 w-[220px]">
              <source src="/animation/arrow.webm" type="video/webm" />
            </video>
            <Image
              src="/img/3d_object/balloon.svg"
              alt="balloon"
              width={188}
              height={300}
              className={`absolute z-50 -left-[60px] top-[132px] -rotate-[26deg] blur-xl opacity-75 select-none ${styles.balloonMT}`}
            />
            <Image
              src="/img/3d_object/balloon.svg"
              alt="balloon"
              width={340}
              height={300}
              className={`absolute z-10 -right-[130px] -bottom-[12px] -rotate-[12deg] select-none ${styles.balloon}`}
            />
            <Image
              src="/img/3d_object/balloon.svg"
              alt="balloon"
              width={280}
              height={300}
              className={`absolute z-10 left-[920px] top-[80px] rotate-[24deg] blur-sm select-none ${styles.balloonMT}`}
            />
            <Image
              src="/img/3d_object/balloon.svg"
              alt="balloon"
              width={260}
              height={300}
              className={`absolute z-10 right-[200px] -bottom-[240px] rotate-[18deg] select-none ${styles.balloon}`}
            />
            <Image
              src="/img/3d_object/balloon.svg"
              alt="balloon"
              width={240}
              height={300}
              className={`absolute z-10 left-[320px] bottom-[80px] -rotate-[28deg] blur-2xl opacity-20 select-none ${styles.balloon}`}
            />
          </div>
        </section>

        <section className="h-screen" ref={registerSection}>
          <AnimatedSection title="맞춤형 게임 탐색하기">
            <div>
              <p className="font-suit text-lg font-medium">로그인 후 맞춤 정보를 받아보세요</p>
              <div className="flex items-center gap-5 pt-1">
                <p className="font-suit text-5xl font-extrabold text-purple-700">파티원 PICK</p>
                <img src="/img/icons/pixel_chat_heart.svg" className="h-10" alt="" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
              <PickCard data={mainDummyGames[0]} appid={mainDummyGamesAppId[0]} />
              <PickCard data={mainDummyGames[1]} appid={mainDummyGamesAppId[1]} />
              <PickCard data={mainDummyGames[2]} appid={mainDummyGamesAppId[2]} />
              <PickCard data={mainDummyGames[3]} appid={mainDummyGamesAppId[3]} />
            </div>
          </AnimatedSection>
        </section>

        <section className="h-screen" ref={registerSection}>
          <AnimatedSection title="내게 맞는 맞춤 길드 추천">
            <SearchGuildWithGame
              leftCarouselTitle={<p className="text-3xl font-bold text-neutral-900 mb-6">보유 게임으로 길드 탐색</p>}
              theme="light"
              forMain
              dummyGames={mainDummyMyGames}
              dummyGuilds={mainDummyGuilds}
            />
          </AnimatedSection>
        </section>

        <section className="h-screen" ref={registerSection}>
          <AnimatedSection title="게이머를 위한 커뮤니티">
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-6">
              <CommunityPostImageShort data={mainDummyPosts[0]} noRoute className="h-52" />
              <CommunityPostShort data={mainDummyPosts[1]} noRoute className="h-52" />
              <CommunityPostShort data={mainDummyPosts[2]} noRoute className="h-52" />
              <CommunityPostImageShort data={mainDummyPosts[3]} noRoute className="h-52" />
            </div>
          </AnimatedSection>
        </section>
      </div>
    </section>
  );
}

export default TotalSection;
