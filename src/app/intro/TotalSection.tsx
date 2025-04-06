import Link from 'next/link';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/all';
// import { useRef } from 'react';

function TotalSection() {
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

  return (
    <section className="bg-purple-50 py-16 h-screen">
      <div className="wrapper">
        <div className="text-purple-700 relative">
          <div>
            <Link className="font-dgm text-8xl  underline absolute" href="/signup">
              Sign UP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalSection;
