'use client';

import { ChevronUp, Loader2, Send, SquarePen, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import UserApprove from '../../components/UserApprove';
import { userSimple } from '@/types/user';
import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import formatDate from '@/utils/formatDate';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import GhostSVG from '@/components/svg/ghost_fill';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { usePartyContext } from './PartyContext';
import { useParty } from '@/api/party';
import { useAlertStore } from '@/stores/alertStore';
import { useInviteStore } from '@/stores/inviteStore';
import { useNotification } from '@/api/notification';
import { PARTY_ROUTE } from '@/constants/routes/party';
import { userRes, userSimpleRes } from '@/types/party';

export default function InfoAccordion() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(true);
  const { joinState, pendingList, partyInfo, joinParty, cancleJoin, acceptJoin, rejectJoin, viewLevel } =
    usePartyContext();

  function getButtonLabel(joinState: string): { text: string; action: () => void } {
    if (!user)
      return {
        text: '로그인하고 파티 참가하기',
        action: () => {
          router.push(PATH.login);
        },
      };
    else if (joinState == 'pending')
      return {
        text: '참가 신청 취소하기',
        action: () => {
          cancleJoin();
        },
      };
    else {
      return {
        text: '파티 참가하기',
        action: async () => {
          joinParty();
        },
      };
    }
  }

  return (
    <>
      {partyInfo && (
        <section>
          <button className="flex gap-6 items-center w-full pb-5" onClick={() => setOpen(!open)}>
            <ChevronUp className={`${open && 'rotate-180'} transition-all ease-in-out`} />
            <h4 className="text-2xl font-extrabold">파티 정보</h4>
          </button>
          {open && (
            <div className="flex py-8 gap-8 align-tops">
              <div className="w-[460px]">
                <PartyHostInfo
                  partyHost={
                    partyInfo.partyMembers[
                      partyInfo.partyMembers.findIndex((member) => member.memberId === partyInfo.ownerId)
                    ]
                  }
                />
                <div className="flex flex-col gap-3 pt-8">
                  {viewLevel('owner') && pendingList.length > 0 && (
                    <>
                      <p className="font-bold text-xl">파티 신청 대기 중</p>
                      {pendingList.map((user, idx) => (
                        <UserApprove
                          key={user.username + idx}
                          data={user}
                          onApprove={() => {
                            acceptJoin(user);
                          }}
                          onReject={() => {
                            rejectJoin(user);
                          }}
                        />
                      ))}
                    </>
                  )}
                  {viewLevel('notJoined') && (
                    <RetroButton
                      type="purple"
                      callback={() => {
                        getButtonLabel(joinState).action();
                      }}
                    >
                      {getButtonLabel(joinState).text}
                    </RetroButton>
                  )}
                  {viewLevel('pending') && (
                    <p className="text-center text-purple-600 font-dgm flex justify-center">승인을 기다리고 있습니다</p>
                  )}
                </div>
              </div>
              <ul id="partInfo" className="flex flex-col gap-7 w-full relative">
                {viewLevel('owner') && <PartyManageButtons />}
                <li>
                  <h3 className="text-4xl font-bold mb-3">{partyInfo.name}</h3>
                  <div className="flex gap-2">
                    {partyInfo.partyTags.map((tag, idx) => (
                      <Tag key={'tags' + idx} style="retro" background="dark">
                        {tag.tagValue}
                      </Tag>
                    ))}
                  </div>
                </li>
                <li>
                  <h5 className="text-xl font-extrabold">시작 시간</h5>
                  <p>{formatDate(new Date(partyInfo.partyAt))} 출발</p>
                </li>
                <li>
                  <ParticipationInfo />
                </li>
                <li>
                  <p>{partyInfo.description}</p>
                </li>
              </ul>
            </div>
          )}
        </section>
      )}
    </>
  );
}

function PartyHostInfo({ partyHost }: { partyHost: userRes }) {
  return (
    <div className="flex gap-3 border-b border-white/20 pb-8">
      <Link href={PATH.user_page(`${partyHost.memberId}`)}>
        <Avatar id="createdUser" className="bg-purple-400 w-20 h-20 aspect-square rounded-full overflow-hidden">
          <AvatarImage src={partyHost.profileImg || '/img/dummy_profile.jpg'} className="object-cover" />
        </Avatar>
      </Link>
      <div>
        <span className="text-sm text-neutral-600">{partyHost.title}</span>
        <p className="text-2xl font-extrabold">{partyHost.nickname}님의 파티</p>
      </div>
    </div>
  );
}

function PartyManageButtons() {
  const { showAlert } = useAlertStore();
  const { partyInfo } = usePartyContext();
  const party = useParty();
  const router = useRouter();
  const { showAction } = useInviteStore();
  const notification = useNotification();

  if (!partyInfo) return <></>;
  return (
    <div className="flex items-center gap-2 justify-end absolute -top-8 right-0 text-sm">
      <button
        className="flex items-center"
        onClick={() => {
          showAction(async (memberid: number) => {
            await party.PartyInvite(`${partyInfo.partyId}`, `${memberid}`);
            notification.SendNotification({
              content: '님의 파티에 초대되셨습니다.',
              receiverId: memberid.toString(),
              redirectUrl: PARTY_ROUTE.party_detail(partyInfo.partyId),
              type: 'PARTY_INVITE',
            });
          }, '초대하기');
        }}
      >
        <Send className="h-3" /> 초대장 보내기
      </button>
      {/* <button
        className="flex items-center"
        onClick={() => {
          router.push(PATH.party_modify(partyInfo.partyId));
        }}
      >
        <SquarePen className="h-3" /> 파티 수정
      </button> */}
      <button
        className="flex items-center"
        onClick={() => {
          showAlert('파티를 삭제하시겠습니까?', '삭제 후에는 복구할 수 없습니다.', () => {
            party.DeleteParty(`${partyInfo.partyId}`);
            router.push(PATH.party_list);
          });
        }}
      >
        <Trash2 className="h-3" /> 파티 삭제
      </button>
    </div>
  );
}

function ParticipationInfo() {
  const { partyInfo } = usePartyContext();
  if (!partyInfo) return <></>;
  return (
    <>
      <h5 className="text-xl font-extrabold">참가 인원</h5>
      <div className="flex py-2 justify-between">
        <div className="flex gap-3 items-center">
          {partyInfo.partyMembers.map((member, idx) =>
            idx < 8 ? (
              <Link key={idx} href={PATH.user_page(`${member.memberId}`)} target="_blank">
                <Avatar className="bg-purple-400 w-12 h-12 aspect-square rounded-full overflow-hidden">
                  <AvatarImage src={member.profileImg || '/img/dummy_profile.jpg'} className="object-cover" />
                </Avatar>
              </Link>
            ) : null
          )}
          {partyInfo.partyMembers.length - 8 >= 1 && (
            <div className="font-suit text-lg font-semibold ml-2 text-neutral-600">
              +{partyInfo.partyMembers.length - 4}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
