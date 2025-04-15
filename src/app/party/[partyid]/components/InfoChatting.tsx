'use client';
import RetroButton from '@/components/common/RetroButton';
import Chat from '@/components/guildUser/Chat';
import { Avatar } from '@/components/ui/avatar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useChattingContext } from './PartyContext';
import { userSimple } from '@/types/user';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatMessageDTO } from '@/hooks/useStomp';
import { Textarea } from '@/components/ui/textarea';
import { CornerDownLeft } from 'lucide-react';
import styles from './InfoChatting.module.css';
import { useAuthStore } from '@/stores/authStore';
import { userRes } from '@/types/party';

export default function InfoChatting() {
  const [chatting, setChatting] = useState(false);
  const chatContext = useChattingContext();
  const [participants, setParticipants] = useState<userSimple[] | undefined>(undefined);

  const messages = useRef<ChatMessageDTO[]>([]);
  const [displayMessages, setDisplayMessages] = useState<ChatMessageDTO[]>([]);

  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { user, memberId } = useAuthStore();

  const chatMessageBottom = useRef<HTMLDivElement>(null);

  const ParticipantsComponent = (props: { members: userSimple[] | undefined }) => {
    return (
      <div className="flex flex-col gap-2">
        {props.members && (
          <>
            <h5 className="text-xl font-extrabold">채팅 참가 중</h5>
            <div className="flex gap-2">
              {props.members?.slice(0, 5).map((member) => (
                <Avatar
                  key={member.memberId}
                  style={{
                    backgroundImage: `url(${member.img_src === '' ? '/img/dummy_profile.jpg' : member.img_src})`,
                  }}
                  className="bg-cover bg-center w-10 h-10"
                />
              ))}
            </div>
          </>
        )}
        {props.members && props.members.length > 8 && (
          <div className="font-suit text-lg font-semibold ml-2 text-neutral-600">+{props.members.length - 4}</div>
        )}
        {chatting && !props.members && (
          <>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, ind) => (
                <Skeleton className="w-10 h-10 rounded-full" key={`avatar_fallback_${ind}`} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  const ReceiveMessageCallback = useCallback(
    (message: ChatMessageDTO) => {
      messages.current.push(message);
      console.log(messages.current);
      setDisplayMessages([...messages.current]);
    },
    [messages]
  );
  const MemberChangeCallback = useCallback((members: userSimple[]) => {
    console.log('member change', members);
    setParticipants(members);
  }, []);
  function getButtonLabel(participating: boolean) {
    if (participating) return '채팅 퇴장하기';
    return '채팅 참여하기';
  }
  const sendMessage = useCallback(() => {
    if (!textAreaValue || textAreaValue.trim().length <= 0 || !memberId || !user) return;
    chatContext.sendMessage(textAreaValue);
    messages.current.push({
      message: textAreaValue,
      senderMemberId: memberId,
      sendAt: new Date(),
      nickname: user.nickname,
      profileImg: !user.img_src || user.img_src.length === 0 ? '/img/dummy_profile.jpg' : user.img_src,
      title: '',
    });
  }, [textAreaValue]);

  useEffect(() => {
    chatMessageBottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages]);

  useEffect(() => {
    return () => {
      chatContext.cleanUp();
    };
  }, []);

  return (
    <div className="border-t border-white/20 pt-8">
      <div id="participatedInfomation" className="flex justify-between items-center">
        <div>
          <ParticipantsComponent members={participants} />
        </div>
        <RetroButton
          type="purple"
          callback={async () => {
            const data = chatContext.toggleJoinChatting(ReceiveMessageCallback, MemberChangeCallback);
            data.then((res) => {
              if (res?.joinState) {
                setParticipants(res.partyMembers);
                setChatting(true);
              }
              if (!res?.joinState) {
                setParticipants(undefined);
                setChatting(false);
              }
            });
          }}
        >
          {getButtonLabel(chatting)}
        </RetroButton>
      </div>
      {chatting && (
        <div className="flex flex-col gap-4">
          <div
            id="chattingRoom"
            className={`bg-neutral-500/20 p-12 rounded-xl max-h-[340px] overflow-y-scroll mt-6 gap-y-3 flex flex-col min-h-[340px]`}
            style={{ scrollbarWidth: 'none' }}
          >
            {messages.current.map((m) => (
              <Chat
                data={{
                  img_src: m.profileImg ? m.profileImg : '/img/dummy_profile.jpg',
                  memberId: m.senderMemberId.toString(),
                  nickname: m.nickname,
                  user_title: m.title,
                  username: '',
                }}
                message={m.message}
                isSender={m.senderMemberId === memberId}
                key={`${m.senderMemberId}_${m.sendAt}`}
              />
            ))}
            <div ref={chatMessageBottom} className="h-[50px]"></div>
          </div>
          <div className="flex gap-5 items-center">
            <div className={`flex-auto ${styles.gradientOutline} ${styles.purple}`}>
              <Textarea
                style={{ scrollbarWidth: 'none', resize: 'none' }}
                className={`bg-neutral-50 focus-visible:ring-0 focus-visible:border-none`}
                value={textAreaValue}
                onChange={(e) => {
                  setTextAreaValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                    setTextAreaValue('');
                  }
                }}
                placeholder="메세지를 입력하세요"
                ref={textAreaRef}
              />
            </div>
            <button
              className="p-5 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors duration-200 ease-in-out"
              onClick={() => {
                sendMessage();
                setTextAreaValue('');
              }}
            >
              <CornerDownLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
