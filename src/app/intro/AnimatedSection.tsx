'use client';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
};

export default function AnimatedSection({ title, children }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }
    ).fromTo(
      contentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );
  }, []);

  return (
    <section ref={sectionRef} className="sub-section h-screen">
      <h3 ref={titleRef} className="title text-purple-700">
        <span className="text-9xl font-extrabold mr-5">and</span>
        <span className="text-2xl font-dgm font-normal">{title}</span>
      </h3>
      <div className="content mt-10" ref={contentRef}>
        {children}
      </div>
    </section>
  );
}
