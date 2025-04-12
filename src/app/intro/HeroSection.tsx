import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

const serviceList = [
  { name: 'Party', href: '', icon: '/img/icons/pixel_swords.svg' },
  { name: 'Guild', href: '', icon: '/img/icons/pixel_box.svg' },
  { name: 'Recommend', href: '', icon: '/img/icons/pixel_present.svg' },
  { name: 'Community', href: '', icon: '/img/icons/pixel_chatting.svg' },
];

function HeroSection() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLParagraphElement>(null);
  const text2 = useRef<HTMLParagraphElement>(null);
  const text3 = useRef<HTMLParagraphElement>(null);
  const text4 = useRef<HTMLParagraphElement>(null);
  const text5 = useRef<HTMLParagraphElement>(null);
  const text6 = useRef<HTMLParagraphElement>(null);
  const buttonBox = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'top -100%',
        // markers: true,
        scrub: 2,
        pin: true,
        pinSpacing: true,
      },
    });
    Tl.fromTo(text1.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 0)
      .fromTo(text2.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 0.4)
      .fromTo(text3.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 1)
      .fromTo(text4.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 1.4)
      .fromTo(text5.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 2)
      .fromTo(text6.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 2.4)
      .fromTo(buttonBox.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, ease: 'sine.in' }, 1);
  });
  return (
    <section className="bg-purple-600 h-screen" ref={container}>
      <div className="wrapper w-full h-full flex flex-col justify-center">
        <div className="py-16">
          <MainText>
            <p ref={text1}>When</p>
            <p ref={text2} className="font-dgm">
              We
            </p>
          </MainText>
          <MainText>
            <p ref={text3} className="font-dgm">
              Play ON
            </p>
            <p ref={text4}>together</p>
          </MainText>
          <MainText ref={text3}>
            <p ref={text5}>the game</p>
            <p ref={text6}>never ends</p>
          </MainText>
        </div>
        <div className="flex flex-wrap w-full gap-6 justify-center my-16" ref={buttonBox}>
          {serviceList.map((service) => (
            <Link
              href={service.href}
              key={service.name}
              className="flex flex-col items-center justify-center bg-[url('/img/pixel_border.svg')] bg-cover w-full max-w-60 aspect-[2/1] group hover:-translate-y-1"
            >
              <img
                src={service.icon}
                alt={service.name + ' icon'}
                className="max-w-18 max-h-12 group-hover:-translate-y-1 transition-all"
              />
              <p className="font-dgm text-purple-800 text-2xl">{service.name}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center absolute bottom-12 left-1/2 -translate-x-1/2">
          <Image src="/img/icons/mouse.png" alt="mouse icon" width={26} height={40} className="animate-bounce" />
          <span className="text-white text-xl">scroll down</span>
        </div>
      </div>
    </section>
  );
}

interface MaintextProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}
function MainText({ children }: MaintextProps) {
  return (
    <div className="flex justify-between flex-wrap text-white font-extrabold lg:text-8xl md:text-7xl text-5xl">
      {children}
    </div>
  );
}

export default HeroSection;
