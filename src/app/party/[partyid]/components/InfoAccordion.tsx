'use client';

import { ChevronUp, Send, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserInfoHorizontal from '../../components/UserInfoHorizontal';
import { dummyUserSimple } from '@/utils/dummyData';
import UserApprove from '../../components/UserApprove';
import { userSimple } from '@/types/user';
import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import formatDate from '@/utils/formatDate';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import { party } from '@/types/party';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import GhostSVG from '@/components/svg/ghost_fill';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { useParty } from '@/api/party';

type Props = {
  partyInfo: party;
  participated: boolean;
  setParticipated: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function InfoAccordion({ partyInfo, participated, setParticipated }: Props) {
  const router = useRouter();
  const party = useParty();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(true);
  // const [partyHost, setPartyHost] = useState<userSimple | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    // setPartyHost(partyInfo.participation[0]);
    setIsAuthor(user?.username == partyInfo.participation[0].username);
  }, []);
  function getButtonLabel(participating: boolean): { text: string; action: () => void } {
    if (!user)
      return {
        text: '로그인하고 파티 참가하기',
        action: () => {
          router.push(PATH.login);
        },
      };
    else if (participating)
      return {
        text: '참가 취소하기',
        action: () => {
          alert('참가 취소 요정 후 밖으로 빼놓기');
          setParticipated(false);
        },
      };
    else {
      return {
        text: '파티 참가하기',
        action: async () => {
          const res = await party.PartyJoin(partyInfo.partyId);
          if (res) {
            alert('참가 신청 성공');
            // router.push(PATH.party_detail(partyInfo.partyId));
            //이거 왠지 모르겠지만 업데이트가 안됨
          } else {
            alert('참가 신청 실패');
          }
        },
      };
    }
  }
  return (
    <section>
      {participated && (
        <button className="flex gap-6 items-center w-full pb-5" onClick={() => setOpen(!open)}>
          <ChevronUp className={`${open && 'rotate-180'} transition-all ease-in-out`} />
          <h4 className="text-2xl font-extrabold">파티 정보</h4>
        </button>
      )}
      {open && (
        <div className="flex py-8 gap-8 align-tops">
          <div className="w-[460px]">
            <PartyHostInfo partyHost={partyInfo.participation[0]} />
            <div className="flex flex-col gap-3 pt-8">
              {isAuthor && (
                <>
                  <p className="font-bold text-xl">파티 신청 대기 중</p>
                  <UserApprove data={dummyUserSimple} onApprove={() => {}} onReject={() => {}} />
                  <UserApprove data={dummyUserSimple} onApprove={() => {}} onReject={() => {}} />
                </>
              )}
              {!isAuthor && (
                <RetroButton
                  type="purple"
                  callback={() => {
                    getButtonLabel(participated).action();
                  }}
                >
                  {getButtonLabel(participated).text}
                </RetroButton>
              )}
            </div>
          </div>
          <ul id="partInfo" className="flex flex-col gap-7 w-full relative">
            {isAuthor && (
              <div className="flex items-center gap-2 justify-end absolute -top-8 right-0 text-sm">
                <button className="flex items-center">
                  <Send className="h-3" /> 초대장 보내기
                </button>
                <button
                  className="flex items-center"
                  onClick={() => {
                    router.push(PATH.party_modify(partyInfo.partyId));
                  }}
                >
                  <SquarePen className="h-3" /> 파티 수정
                </button>
                <button
                  className="flex items-center"
                  onClick={() => {
                    party.DeleteParty(partyInfo.partyId);
                  }}
                >
                  <Trash2 className="h-3" /> 파티 삭제
                </button>
              </div>
            )}
            <li>
              <h3 className="text-4xl font-bold mb-3">{partyInfo.party_name}</h3>
              <div className="flex gap-2">
                {partyInfo.tags.map((tag, idx) => (
                  <Tag key={tag + idx} style="retro" background="dark">
                    {tag}
                  </Tag>
                ))}
              </div>
            </li>
            <li>
              <h5 className="text-xl font-extrabold">시작 시간</h5>
              <p>{formatDate(new Date(partyInfo.start_time))} 출발</p>
            </li>
            <li>
              <h5 className="text-xl font-extrabold">참가 인원</h5>
              <div className="flex py-2 justify-between">
                <div className="flex gap-3 items-center">
                  {partyInfo.participation.map((member, idx) =>
                    idx < 8 ? (
                      <Link key={idx} href={`user/${member.username}`} target="_blank">
                        <Avatar className="bg-purple-400 w-12 h-12 aspect-square rounded-full overflow-hidden">
                          <AvatarImage src={member.img_src} />
                          <AvatarFallback className="flex items-end justify-center w-full">
                            <GhostSVG fill="#FFFFFF" stroke="" width={24} />
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    ) : null
                  )}
                  {partyInfo.participation.length - 8 >= 1 && (
                    <div className="font-suit text-lg font-semibold ml-2 text-neutral-600">
                      +{partyInfo.participation.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <p>{partyInfo.description}</p>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

function PartyHostInfo({ partyHost }: { partyHost: userSimple }) {
  return (
    <div className="flex gap-3 border-b border-white/20 pb-8">
      <Avatar id="createdUser" className="bg-purple-400 w-20 h-20 aspect-square rounded-full overflow-hidden">
        <AvatarImage src={partyHost.img_src} />
        <AvatarFallback className="flex items-end justify-center w-full">
          <GhostSVG fill="#FFFFFF" stroke="" width={40} />
        </AvatarFallback>
      </Avatar>
      <div>
        <span className="text-sm text-neutral-600">{partyHost.user_title}</span>
        <p className="text-2xl font-extrabold">{partyHost.nickname}님의 파티</p>
      </div>
    </div>
  );
}
