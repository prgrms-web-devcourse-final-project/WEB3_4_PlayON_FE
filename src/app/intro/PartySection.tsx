const partyDummyData = [
  {
    party_name: '빡종하지 않을 분을 구합니다',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quisquam inventore est. A praesentium aspernatur ad voluptas debitis vero et repellat sed. Aut, quos veritatis! Laudantium ullam culpa quaerat quidem.',
    start_time: new Date('2025-05-02 10:00'),
    tags: ['누구나', '캐주얼'],
    participation: [
      {
        username: 'test@email.com',
        nickname: '홍길동',
        user_title: '전장의 지배자',
        img_src: '',
      },
    ],
    selected_game: {
      title: 'PICO PARK 2',
      genre: ['협동', '대규모 멀티'],
      img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2644470/header.jpg?t=1726674876',
      background_src: '',
    },
    num_maximum: 8,
  },
  {
    party_name: '거짓말쟁이는 누구인가',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quisquam inventore est. A praesentium aspernatur ad voluptas debitis vero et repellat sed. Aut, quos veritatis! Laudantium ullam culpa quaerat quidem.',
    start_time: new Date('2025-04-05 10:00'),
    tags: ['누구나', '캐주얼', '뉴비'],
    participation: [
      {
        username: 'test@email.com',
        nickname: '홍길동',
        user_title: '전장의 지배자',
        img_src: '',
      },
    ],
    selected_game: {
      title: 'Eville',
      genre: ['협동', '대규모 멀티'],
      img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1220170/header.jpg?t=1726674876',
      background_src: '',
    },
    num_maximum: 8,
  },
];
import SearchBar from '@/components/common/SearchBar';
import PartyCard from '@/components/party/PartyCard';
import RetroButton from '@/components/common/RetroButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

function PartySection() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const searchBar = useRef<HTMLDivElement>(null);
  const partyCompoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=640',
        markers: true,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });
    Tl.fromTo(title.current, { opacity: 0, x: 240 }, { opacity: 1, x: 0, duration: 3, ease: 'power1.inOut' }, 0).fromTo(
      searchBar.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 2, ease: 'sine.in' },
      0.1
    );

    partyCompoRefs.current.forEach((el, idx) => {
      if (el) {
        Tl.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'power1.out' }, 2 + 0.5 * idx);
      }
    });
  });
  return (
    <section className="bg-purple-700 py-16" ref={container}>
      <div className="wrapper text-right">
        <h2 className="text-[160px] font-black text-white" ref={title}>
          Find Party
        </h2>
        <div className="max-w-lg ml-auto" ref={searchBar}>
          <p className="text-white text-left text-xl mb-2">보유중인 게임을 검색해 빠르게 모임을 찾아보세요</p>
          <SearchBar
            onSearch={() => {
              alert('검색 이동');
            }}
            onChange={() => {}}
          />
        </div>
        <div className="flex justify-end gap-6 my-12">
          {partyDummyData.map((data, idx) => (
            <div
              ref={(el) => {
                partyCompoRefs.current[idx] = el;
              }}
              key={idx}
            >
              <PartyCard data={data} />
            </div>
          ))}
        </div>
        <div className="w-80 ml-auto">
          <RetroButton type="purple">더 찾아보기</RetroButton>
        </div>
      </div>
    </section>
  );
}

export default PartySection;
