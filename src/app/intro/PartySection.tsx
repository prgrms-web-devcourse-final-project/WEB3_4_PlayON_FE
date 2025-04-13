import SearchBar from '@/components/common/SearchBar';
import PartyCard, { PartyCardSkeleton } from '@/components/party/PartyCard';
import RetroButton from '@/components/common/RetroButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { getPartyRes } from '@/types/party';
import { useParty } from '@/api/party';
import Link from 'next/link';
import { Object3D } from 'three';

type Props = {
  modelObject: Object3D | null;
};

function PartySection({ modelObject }: Props) {
  const party = useParty();
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  const [pendingParties, setPendingParties] = useState<getPartyRes[]>([]);
  useEffect(() => {
    const fetchParty = async () => {
      const pendingRes = await party.MainPendingParty(2);
      if (pendingRes) {
        setPendingParties(pendingRes);
      }
    };
    fetchParty();
  }, []);
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const searchBar = useRef<HTMLDivElement>(null);
  const partyCompoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  useGSAP(() => {
    if (!modelObject) return;

    const Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=640',
        // markers: true,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });
    Tl.fromTo(title.current, { opacity: 0, x: 240 }, { opacity: 1, x: 0, duration: 3, ease: 'power1.inOut' }, 0)
      .fromTo(searchBar.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 2, ease: 'sine.in' }, 0.1)
      .fromTo(modelObject.position, { y: 19, x: -8 }, { y: 3.2, x: -5.5, duration: 2.5, ease: 'sine.in' }, 0)
      .fromTo(modelObject.position, { y: 3.2, x: -5.5 }, { y: 20, x: -5.5, duration: 1, ease: 'sine.in' }, 7)
      .fromTo(modelObject.rotation, { y: 1 }, { y: 6, duration: 8, ease: 'power2.inOut' }, 0);

    partyCompoRefs.current.forEach((el, idx) => {
      if (el) {
        Tl.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'power1.in' }, 2 + 0.5 * idx);
      }
    });
  }, [modelObject]);
  return (
    <section className="bg-purple-700 py-16 min-h-screen">
      <div className="wrapper text-right " ref={container}>
        <h2 className="text-[160px] font-black text-white" ref={title}>
          Find Party
        </h2>
        <div className="max-w-lg ml-auto" ref={searchBar}>
          <p className="text-white text-left text-xl mb-2">보유중인 게임을 검색해 빠르게 모임을 찾아보세요</p>
          <SearchBar
            onSearch={() => {
              router.push(`${PATH.party_list}?name=${query}`);
            }}
            onChange={(value: string) => {
              setQuery(value);
            }}
          />
        </div>
        <div className="flex justify-end gap-6 my-12 max-w-screen-xl">
          {pendingParties.length > 0
            ? pendingParties.map((party, idx) => (
                <div
                  ref={(el) => {
                    partyCompoRefs.current[idx] = el;
                  }}
                  key={idx}
                  className="w-full max-w-[420px]"
                >
                  <PartyCard key={'party_main_comp' + idx} data={party} />
                </div>
              ))
            : Array.from({ length: 2 }).map((_, idx) => (
                <div
                  ref={(el) => {
                    partyCompoRefs.current[idx] = el;
                  }}
                  key={idx}
                  className="w-full max-w-[420px]"
                >
                  <PartyCardSkeleton key={idx} />
                </div>
              ))}
        </div>
        <div className="w-80 ml-auto">
          <Link href={PATH.party_list}>
            <RetroButton type="purple">더 찾아보기</RetroButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PartySection;
