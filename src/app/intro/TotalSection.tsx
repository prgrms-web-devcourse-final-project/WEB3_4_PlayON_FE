'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import AnimatedSection from './AnimatedSection';
import Link from 'next/link';
import PickCard from '@/components/game/PickCard';
import { dummyGameSimple, dummyPost } from '@/utils/dummyData';
import SearchGuildWithGame from '@/components/common/search-guild-with-game';
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
        <section className="h-screen sub-section" ref={registerSection}>
          <div className="flex items-center justify-left h-full">
            <Link
              className="font-dgm text-8xl underline absolute -mt-24 hover:text-purple-600 transition-all"
              href="/signup"
            >
              Sign UP
            </Link>
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
              {/* <PickCard data={dummyGameSimple} />
              <PickCard data={dummyGameSimple} />
              <PickCard data={dummyGameSimple} />
              <PickCard data={dummyGameSimple} /> */}
            </div>
          </AnimatedSection>
        </section>

        <section className="h-screen" ref={registerSection}>
          <AnimatedSection title="내게 맞는 맞춤 길드 추천">
            <SearchGuildWithGame
              leftCarouselTitle={<p className="text-3xl font-bold text-neutral-900 mb-6">보유 게임으로 길드 탐색</p>}
              theme="light"
            />
          </AnimatedSection>
        </section>

        <section className="h-screen" ref={registerSection}>
          <AnimatedSection title="게이머를 위한 커뮤니티">
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-6">
              {/* <CommunityPostShort data={dummyPost} className="h-52" />
              <CommunityPostImageShort data={dummyPost} className="h-52" />
              <CommunityPostShort data={dummyPost} className="h-52" />
              <CommunityPostImageShort data={dummyPost} className="h-52" /> */}
            </div>
          </AnimatedSection>
        </section>
      </div>
    </section>
  );
}

export default TotalSection;
