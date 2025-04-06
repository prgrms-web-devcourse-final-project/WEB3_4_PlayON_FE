import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import PickCard from '@/components/game/PickCard';

function TotalSection() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  const container = useRef<HTMLDivElement>(null);
  const signUp = useRef<HTMLDivElement>(null);
  const titles = useRef<(HTMLDivElement | null)[]>([]);
  const gameSection = useRef<HTMLDivElement>(null);
  const gameGuildSection = useRef<HTMLDivElement>(null);
  const communitySection = useRef<HTMLDivElement>(null);

  const titleList = [
    { title: '맞춤형 게임 탐색하기', sectionCompo: gameSection },
    { title: '내 성향에 맞는 맞춤 길드 추천', sectionCompo: gameGuildSection },
    { title: '게이머를 위한 커뮤니티', sectionCompo: communitySection },
  ];

  useGSAP(() => {
    const Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'top -100%',
        markers: true,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    Tl.fromTo(signUp.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, 0)
      .to(signUp.current, { y: 0, opacity: 1, duration: 2 })
      .to(signUp.current, { y: -60, opacity: 0, duration: 1 })
      .addLabel('signUpDone');

    // titleList.forEach((el, idx) => {
    //   if (el && el.sectionCompo) {
    //     Tl.fromTo(titles.current[idx], { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, 'signUpDone+=5')
    //       .fromTo(el.sectionCompo.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, 'signUpDone+=5')
    //       .addLabel(`showCompelete-${idx}`, `+=${idx * 2}`)

    //       // .to(titles.current[idx], { y: 0, opacity: 1, duration: 10 }, `showCompelete-${idx}`)
    //       // .to(el.sectionCompo.current, { y: 0, opacity: 1, duration: 10 }, `showCompelete-${idx}`)
    //       // .to(titles.current[idx], { y: -60, opacity: 0, duration: 2 }, `showCompelete-${idx}+=10`)
    //       // .to(el.sectionCompo.current, { y: -60, opacity: 0, duration: 2 }, `showCompelete-${idx}+=10`);
    //   }
    // });
    //   titleList.forEach((el, idx) => {
    //   if (el && el.sectionCompo) {
    //     Tl.add(() => {
    //       const tl = gsap.timeline();

    //       tl.fromTo(titles.current[idx], { y: 60, opacity: 0 }, { y: 0, opacity: 1 })
    //         .fromTo(el.sectionCompo.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1 })

    //         .to(titles.current[idx], { y: 0, opacity: 1})
    //         .to(el.sectionCompo.current, { y: 0, opacity: 1})

    //         .to(titles.current[idx], { y: -60, opacity: 0, duration: 2 })
    //         .to(el.sectionCompo.current, { y: -60, opacity: 0, duration: 2 });
    //     }, `signUpDone`); // ✅ 개별적으로 실행되도록 `+=`로 delay 추가
    //   }
    // });

    //동시실행시키려면?
    // 타임라인 두개 써야하나...
    // 1. -=이랑 duration 같이 맞추면 동시에 실행됨
    // label넣어서 하나 끝나고 추가하기
    //signup 종료후 ㅇ
    //titles ref 묶음이랑 각각의 sections들이 함께!!! (단 시차는 있게 올라와야함)
    //title 올라오고 section 아주 조금 있다 올라오기
    //title이랑 section 동시 홀드
    // section 내려가고 title도 없어지기
    //바닥에서 쑥 올라오는 느낌 내고 싶은데 이건 CSS 먼저 잡아놓고 해야할듯 아대가리야

    //아니면? 걍 묶어서 올려보내기
    //title&section 다 적어놓은 다음에 ref를 둘을 묶은 div에 넣고
    //div 올라오면 scrollTrigger onEnter였나 그거 써서 일반 애니메이션 실행
    //각각 div absolute로 얹기
  });
  return (
    <section className="bg-purple-50 py-16 h-screen" ref={container}>
      <div className="wrapper">
        <div className="text-purple-700 relative">
          <div ref={signUp}>
            <Link className="font-dgm text-8xl  underline absolute" href="/signup">
              Sign UP
            </Link>
          </div>
          {titleList.map((item, idx) => (
            <div
              ref={(el) => {
                titles.current[idx] = el;
              }}
              key={idx}
            >
              <AndTitle>{item.title}</AndTitle>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="h-[480px] bg-neutral-300/20 opacity-0" ref={gameSection}></div>
          <div className="h-[480px] bg-neutral-300/20 opacity-0" ref={gameGuildSection}></div>
          <div className="h-[480px] bg-neutral-300/20 opacity-0" ref={communitySection}></div>
        </div>
      </div>
    </section>
  );
}
export default TotalSection;

interface endTextProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement | null>;
}
function AndTitle({ children }: endTextProps) {
  return (
    <h3 className="absolute">
      <span className="text-8xl font-extrabold">and</span>
      <span className="font-dgm text-2xl ml-6">{children}</span>
    </h3>
  );
}
