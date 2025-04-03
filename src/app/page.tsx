'use client';

const dummyData = [
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

import RetroButton from '@/components/common/RetroButton';
import SearchBar from '@/components/common/SearchBar';
import PartyCard from '@/components/party/PartyCard';
import Image from 'next/image';
import Link from 'next/link';

const serviceList = [
  { name: 'Party', href: '', icon: '/img/icons/pixel_swords.svg' },
  { name: 'Guild', href: '', icon: '/img/icons/pixel_box.svg' },
  { name: 'Recommend', href: '', icon: '/img/icons/pixel_present.svg' },
  { name: 'Community', href: '', icon: '/img/icons/pixel_chatting.svg' },
];
export default function Home() {
  return (
    <main>
      <section className="bg-purple-600 py-16">
        <div className="wrapper">
          <div>
            <MainText>
              <p>When</p>
              <p className="font-dgm">We</p>
            </MainText>
            <MainText>
              <p className="font-dgm">Play ON</p>
              <p>together</p>
            </MainText>
            <MainText>
              <p>the game</p>
              <p>never ends</p>
            </MainText>
          </div>
          <div className="flex flex-wrap w-full gap-6 justify-center my-16">
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
          <div className="flex flex-col items-center">
            <Image src="/img/icons/mouse.png" alt="mouse icon" width={26} height={40} className="animate-bounce" />
            <span className="text-white text-xl">scroll down</span>
          </div>
        </div>
      </section>
      <section className="bg-purple-700 py-16">
        <div className="wrapper text-right">
          <h2 className="text-[160px] font-black text-white">Find Party</h2>
          <div className="max-w-lg ml-auto">
            <p className="text-white text-left text-xl mb-2">보유중인 게임을 검색해 빠르게 모임을 찾아보세요</p>
            <SearchBar
              onSearch={() => {
                alert('검색 이동');
              }}
              onChange={() => {}}
            />
          </div>
          <div className="flex justify-end gap-6 my-12">
            {dummyData.map((data, idx) => (
              <PartyCard data={data} key={idx} />
            ))}
          </div>
          <div className="w-80 ml-auto">
            <RetroButton type="purple">더 찾아보기</RetroButton>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-purple-700 to-purple-50 py-16">
        <div className="wrap max-w-screen-xl"></div>
      </section>
      <section className="bg-purple-50 py-16">
        <div className="wrap max-w-screen-xl"></div>
      </section>
    </main>
  );
}

interface MaintextProps {
  children: React.ReactNode;
}
function MainText({ children }: MaintextProps) {
  return (
    <div className="flex justify-between flex-wrap text-white font-extrabold lg:text-8xl md:text-7xl text-5xl">
      {children}
    </div>
  );
}
