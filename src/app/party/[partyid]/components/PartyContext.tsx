import { useParty } from '@/api/party';
import { CHAT_ENDPOINTS } from '@/constants/endpoints/chat-room';
import { useAxios } from '@/hooks/useAxios';
import { useAuthStore } from '@/stores/authStore';
import { getPartyRes, userRes } from '@/types/party';
import { userSimple } from '@/types/user';
import { Client } from '@stomp/stompjs';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

type JoinStateType = 'owner' | 'joined' | 'pending' | 'notJoined';
type PartyContextType = {
  partyInfo: getPartyRes | null;
  pendingList: userRes[];
  joinState: JoinStateType;
  joinParty: () => void;
  cancleJoin: () => void;
  acceptJoin: (pendingUser: userRes) => void;
  rejectJoin: (pendingUser: userRes) => void;
  viewLevel: (viewLevel: 'owner' | 'notOwner' | 'joined' | 'pending' | 'notJoined') => boolean;
};

const PartyContext = createContext<PartyContextType | null>(null);

export const PartyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser, memberId: currentUserId } = useAuthStore();
  const pathname = usePathname();
  const nowPartyId = useMemo(() => pathname.split('/').filter(Boolean).pop() ?? '1', [pathname]);

  const partyAPI = useParty();

  const [partyInfo, setPartyInfo] = useState<getPartyRes | null>(null);
  const [pendingList, setPendingList] = useState<userRes[]>([]);
  const [joinState, setJoinState] = useState<JoinStateType>('notJoined');

  useEffect(() => {
    const fetchData = async () => {
      if (partyInfo) return;
      const party = await partyAPI.GetParty(Number(nowPartyId));
      if (party) {
        setPartyInfo(party);
      }
    };
    fetchData();
    const fetchPendingList = async () => {
      const pendingListRes = await partyAPI.GetPendingList(nowPartyId);
      if (pendingListRes) {
        console.log('first pending list fetch');
        console.log(pendingListRes);
        console.log(currentUser);
        if (pendingListRes.some((user) => user.username == currentUser?.username)) {
          if (joinState !== 'pending') {
            console.log('join state setting to pending');
            setJoinState('pending');
          }
        }
        setPendingList(pendingListRes);
      }
    };
    fetchPendingList();
  }, [nowPartyId, currentUser]);

  useEffect(() => {
    const fetchPendingList = async () => {
      const pendings = await partyAPI.GetPendingList(nowPartyId);
      if (pendings) setPendingList(pendings);
    };
    if (!currentUser) return;
    if (!partyInfo || !partyInfo.partyMembers) return;
    if (partyInfo.ownerId === currentUserId) {
      //호스트 권한 확인
      if (joinState == 'owner') return;
      setJoinState('owner');
      fetchPendingList();
    } else if (partyInfo.partyMembers.some((user) => user.username === currentUser.username)) {
      //참가자 권한 확인
      if (joinState == 'joined') return;
      fetchPendingList();

      setJoinState('joined');
    } else {
      if (joinState == 'notJoined' || joinState == 'pending') return;
      setJoinState('notJoined');
    }
  }, [partyInfo, currentUser, nowPartyId]);

  const joinParty = useCallback(async () => {
    if (joinState !== 'notJoined') return;
    const res = await partyAPI.PartyJoin(nowPartyId);
    if (res) setJoinState('pending');
  }, [joinState, nowPartyId]);

  const cancleJoin = useCallback(async () => {
    const res = await partyAPI.CancleJoin(nowPartyId);
    if (res) {
      setJoinState('notJoined');
    } else {
      console.log('실패');
    }
  }, []);

  const acceptJoin = useCallback(async (pendingUser: userRes) => {
    const res = await partyAPI.AcceptPartyJoin(nowPartyId, `${pendingUser.memberId}`);
    if (res == true) {
      setPartyInfo((prev) => (prev ? { ...prev, partyMembers: [...prev.partyMembers, pendingUser] } : prev));
      setPendingList((prev) => prev.filter((user) => user.memberId !== pendingUser.memberId));
    }
  }, []);
  const rejectJoin = useCallback(async (pendingUser: userRes) => {
    const res = await partyAPI.RejectPartyJoin(nowPartyId, `${pendingUser.memberId}`);
    if (res == true) {
      setPendingList((prev) => prev.filter((user) => user.memberId !== pendingUser.memberId));
    }
  }, []);

  const viewLevel = useCallback(
    (viewLevel: string) => {
      switch (viewLevel) {
        case 'owner':
          if (joinState == 'owner') {
            return true;
          } else {
            return false;
          }
        case 'joined':
          if (joinState == 'owner' || joinState == 'joined') {
            return true;
          } else {
            return false;
          }
        case 'pending':
          if (joinState == 'pending') {
            return true;
          } else {
            return false;
          }
        case 'notOwner':
          if (joinState !== 'owner') {
            return true;
          } else {
            return false;
          }
        case 'notJoined':
          if (joinState == 'notJoined' || joinState == 'pending') {
            return true;
          } else {
            return false;
          }
        default:
          return true;
      }
    },
    [joinState]
  );
  const value = useMemo(
    () => ({
      partyInfo,
      pendingList,
      joinState,
      viewLevel,
      joinParty,
      cancleJoin,
      acceptJoin,
      rejectJoin,
    }),
    [partyInfo, pendingList, joinState, viewLevel, joinParty, cancleJoin, acceptJoin, rejectJoin]
  );

  return <PartyContext.Provider value={value}>{children}</PartyContext.Provider>;
};

export const usePartyContext = () => {
  const context = useContext(PartyContext);
  if (!context) throw new Error('usePartyContext must be used within a PartyContextProvider');
  return context;
};

type ChattingContextType = {
  chatParticipantList: userSimple[];
  isJoined: boolean;
  toggleJoinChatting: (
    ReceiveMessageCallback: (message: ChatMessageDTO) => void,
    MemberChangeCallback: (partyMembers: userSimple[]) => void
  ) => Promise<{ partyMembers: userSimple[]; messages: string[]; joinState: boolean }>;
  sendMessage: (message: string) => void;
  cleanUp: () => void;
};

const ChattingContext = createContext<ChattingContextType | null>(null);

type ChatMessageDTO = {
  senderMemberId: number;
  title: string;
  nickname: string;
  profileImg: string;
  message: string;
  sendAt: Date;
};
type ChatJoinResponse = {
  members: { memberId: number; nickname: string; profileImg: string }[];
  messages: string[];
  partyId: number;
  partyRoomId: number;
};
export const ChattingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser, memberId } = useAuthStore();
  // const partyAPI = useParty();
  const { joinState, partyInfo } = usePartyContext();
  const [chatParticipantList, setChatParticipantList] = useState<userSimple[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const client = useRef<Client | null>(null);
  const AXIOS = useAxios();
  const { toast } = useToast();

  const toggleJoinChatting = useCallback(
    async (
      ReceiveMessageCallback: (message: ChatMessageDTO) => void,
      MemberChangeCallback: (partyMembers: userSimple[]) => void
    ) => {
      if (isJoined) {
        //채팅에 참가중이라면
        if (joinState !== 'joined' && joinState !== 'owner') return { joinState: false };
        //권한 확인
        //이곳에 채팅 참가와 관련된 함수 작성, 혹은 isJoined 값으로 컴포넌트 렌더링
        if (partyInfo === null || partyInfo.partyId === null) return { joinState: false };

        //이곳에 함수 작성할거면 상단주석처리된 두 줄 넣기
        const response = await AXIOS.Delete(
          CHAT_ENDPOINTS.leave(partyInfo.partyId),
          { headers: { 'Content-Type': 'application/json' } },
          true
        );
        console.log(response);
        if (response && response.status === 204) {
          if (client.current) {
            client.current.deactivate();
          }
          setChatParticipantList([]);
          setIsJoined(false);
          return { joinState: false };
        }
        return { joinState: true };
      } else {
        //채팅에 참가중이지 않다면
        if (joinState !== 'joined' && joinState !== 'owner') return { joinState: false }; //권한 확인
        //이곳에 채팅 퇴장와 관련된 함수 작성, 혹은 isJoined 값으로 컴포넌트 렌더링
        if (partyInfo === null || partyInfo.partyId === null) return { joinState: false };
        //이곳에 함수 작성할거면 상단주석처리된 두 줄 넣기
        const response = await AXIOS.Post(
          CHAT_ENDPOINTS.join(partyInfo.partyId),
          {},
          { headers: { 'Content-Type': 'application/json' } },
          false
        );
        if (response && response.status === 200) {
          if (client.current === null) {
            client.current = new Client({
              webSocketFactory: () => {
                return new SockJS('http://localhost:8080/ws');
              },
              connectHeaders: {
                'Content-Type': 'application/json',
                'X-Authorization': `Bearer ${document.cookie.includes('accessToken') ? document.cookie.split('accessToken=')[1].split(';')[0] : ''}`,
              },
              reconnectDelay: 5000,
              heartbeatIncoming: 4000,
              heartbeatOutgoing: 4000,
            });
            client.current.onConnect = (frame) => {
              if (partyInfo.partyId === null) {
                console.error('❌ ID가 없습니다. 연결을 종료합니다.');
                return;
              }
              if (client.current === null) {
                console.error('❌ Client가 없습니다. 연결을 종료합니다.');
                return;
              }
              console.log('🟢 STOMP 연결됨', frame);
              client.current.subscribe(CHAT_ENDPOINTS.subscribe_message(partyInfo.partyId), (message) => {
                const chatMessage: ChatMessageDTO = JSON.parse(message.body);
                if (chatMessage.senderMemberId === memberId) return; //자기 자신이 보낸 메시지는 무시
                ReceiveMessageCallback(chatMessage);
                console.log(chatMessage);
              });
              client.current.subscribe(CHAT_ENDPOINTS.member_update(partyInfo.partyId), (message) => {
                const memberUpdate: { memberId: number; nickname: string; profileImg: string }[] = JSON.parse(
                  message.body
                );
                MemberChangeCallback(
                  memberUpdate.map((m) => ({
                    img_src: m.profileImg,
                    memberId: m.memberId.toString(),
                    nickname: m.nickname,
                    user_title: '',
                    username: '',
                  }))
                );
              });
            };
            client.current.onDisconnect = (frame) => {
              console.log('🔴 STOMP 연결 해제됨', frame);
            };
            client.current.onStompError = (frame) => {
              console.error('❌ STOMP 에러 발생', frame);
            };
          }
          client.current.activate();
          const typedResponse = response.data.data as ChatJoinResponse;
          console.log(response.data.data);
          const data = {
            partyMembers: typedResponse.members.map<userSimple>((member) => ({
              nickname: member.nickname,
              img_src: member.profileImg,
              memberId: member.memberId.toString(),
              username: '',
              user_title: '',
            })),
            messages: [],
          };
          setChatParticipantList(data.partyMembers);
          setIsJoined(true);
          return { ...data, joinState: true };
        } else {
          toast({
            title: '채팅방 입장에 실패했습니다',
            description: '채팅방 입장은 시작시간 5분 전부터 가능합니다',
            variant: 'destructive',
          });
          return { joinState: false };
        }
      }
    },
    [isJoined, joinState]
  );
  const cleanUp = useCallback(async () => {
    if (joinState !== 'joined' && joinState !== 'owner') return; //권한 확인
    //이곳에 채팅 참가와 관련된 함수 작성, 혹은 isJoined 값으로 컴포넌트 렌더링
    if (partyInfo === null || partyInfo.partyId === null) return;
    //이곳에 함수 작성할거면 상단주석처리된 두 줄 넣기
    // const response = await AXIOS.Delete(
    //   CHAT_ENDPOINTS.leave(partyInfo.partyId),
    //   { headers: { 'Content-Type': 'application/json' } },
    //   true
    // );
    // if (response && response.status === 204) {
    if (client.current) {
      client.current.deactivate();
    }
    setChatParticipantList([]);
    setIsJoined(false);
    return { joinState: false };
    // }
  }, []);
  const sendMessage = useCallback(
    (message: string) => {
      if (!currentUser || !memberId) {
        console.error('❌ 유저 정보가 없습니다. 메시지를 전송할 수 없습니다.');
        return;
      }
      if (!partyInfo || partyInfo.partyId === null) {
        console.error('❌ 파티 ID가 없습니다. 메시지를 전송할 수 없습니다.');
        return;
      }
      if (client.current === null) {
        console.error('❌ 클라이언트가 없습니다. 메시지를 전송할 수 없습니다.');
        return;
      }
      const _message: ChatMessageDTO = {
        senderMemberId: memberId,
        nickname: currentUser.nickname,
        profileImg: currentUser.img_src ?? '',
        message: message,
        sendAt: new Date(),
        title: '',
      };
      try {
        client.current.publish({
          destination: CHAT_ENDPOINTS.send_message(partyInfo.partyId),
          body: _message.message,
          skipContentLengthHeader: true,
        });
      } catch (error) {
        console.error('❌ 메시지 전송 실패', error);
      }
    },
    [currentUser, partyInfo]
  );
  const value = useMemo(
    () => ({
      isJoined,
      chatParticipantList,
      toggleJoinChatting,
      sendMessage,
      cleanUp,
    }),
    [isJoined, chatParticipantList, toggleJoinChatting, sendMessage, cleanUp]
  );
  return <ChattingContext.Provider value={value}>{children}</ChattingContext.Provider>;
};

export const useChattingContext = () => {
  const context = useContext(ChattingContext);
  if (!context) throw new Error('useChattingContext must be used within a ChattingContextProvider');
  return context;
};
