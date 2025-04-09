'use client';

import { ChevronUp, Send, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import UserInfoHorizontal from '../../components/UserInfoHorizontal';
import { dummyUserSimple } from '@/utils/dummyData';
import { dummyParty } from '@/utils/dummyData';
import UserApprove from '../../components/UserApprove';
import { userSimple } from '@/types/user';
import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import formatDate from '@/utils/formatDate';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';

type Props = {
  participated: boolean;
  setParticipated: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function InfoAccordion({ participated, setParticipated }: Props) {
  const [open, setOpen] = useState(true);
  const isAuthor = true;
  function getButtonLabel(participating: boolean) {
    if (participating) return '참가 취소하기';
    setParticipated(false);
    return '파티 참가하기';
  }
  const partyHost = { ...dummyParty.participation[0] };
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
            <PartyHostInfo partyHost={partyHost} />
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
                    setParticipated(!participated);
                  }}
                >
                  {getButtonLabel(participated)}
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
                <button className="flex items-center">
                  <SquarePen className="h-3" /> 파티 수정
                </button>
                <button className="flex items-center">
                  <Trash2 className="h-3" /> 파티 삭제
                </button>
              </div>
            )}
            <li>
              <h3 className="text-4xl font-bold mb-3">{dummyParty.party_name}</h3>
              <div className="flex gap-2">
                {dummyParty.tags.map((tag) => (
                  <Tag style="retro" background="dark">
                    {tag}
                  </Tag>
                ))}
              </div>
            </li>
            <li>
              <h5 className="text-xl font-extrabold">시작 시간</h5>
              <p>{formatDate(dummyParty.start_time)} 출발</p>
            </li>
            <li>
              <h5 className="text-xl font-extrabold">참가 인원</h5>
              <div className="flex py-2 justify-between">
                <div className="flex gap-3 items-center">
                  {dummyParty.participation.map((member, idx) =>
                    idx < 8 ? (
                      <Link href={`user/${member.username}`} target="_blank">
                        <Avatar
                          key={idx}
                          style={{
                            backgroundImage: `url(${member.img_src})`,
                          }}
                          className="bg-cover bg-center w-12 h-12"
                        />
                      </Link>
                    ) : null
                  )}
                  {dummyParty.participation.length - 8 >= 1 && (
                    <div className="font-suit text-lg font-semibold ml-2 text-neutral-600">
                      +{dummyParty.participation.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <p>{dummyParty.description}</p>
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
      <div
        id="createdUser"
        className={`bg-center bg-cover w-20 h-20 rounded-full`}
        style={{ backgroundImage: `url(${partyHost.img_src})` }}
      ></div>
      <div>
        <span className="text-sm text-neutral-600">{partyHost.user_title}</span>
        <p className="text-2xl font-extrabold">{partyHost.nickname}님의 파티</p>
      </div>
    </div>
  );
}
