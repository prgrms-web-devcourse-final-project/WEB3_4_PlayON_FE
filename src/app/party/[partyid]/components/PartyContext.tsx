import { useParty } from '@/api/party';
import { useAuthStore } from '@/stores/authStore';
import { getPartyRes, party } from '@/types/party';
import { userSimple } from '@/types/user';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type JoinStateType = 'owner' | 'joined' | 'pending' | 'notJoined';
type PartyContextType = {
  partyInfo: party | null;
  pendingList: userSimple[];
  joinState: JoinStateType;
  joinParty: () => void;
  cancleJoin: () => void;
  acceptJoin: (pendingUser: userSimple) => void;
  rejectJoin: (pendingUser: userSimple) => void;
  viewLevel: (viewLevel: 'owner' | 'notOwner' | 'joined' | 'pending' | 'notJoined') => boolean;
};

const PartyContext = createContext<PartyContextType | null>(null);

export const PartyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAuthStore();
  const pathname = usePathname();
  const nowPartyId = useMemo(() => pathname.split('/').filter(Boolean).pop() ?? '1', [pathname]);

  const partyAPI = useParty();

  const [partyInfo, setPartyInfo] = useState<getPartyRes>(null);
  const [pendingList, setPendingList] = useState<userSimple[]>([]);
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
      setPendingList(pendingListRes);
    };
    fetchPendingList();
  }, [nowPartyId]);

  useEffect(() => {
    const fetchPendingList = async () => {
      const pendings = await partyAPI.GetPendingList(nowPartyId);
      setPendingList(pendings);
    };
    if (!currentUser) return;
    if (!partyInfo || !partyInfo.participation) return;
    if (partyInfo.participation[0].username === currentUser.username) {
      //호스트 권한 확인
      if (joinState == 'owner') return;
      setJoinState('owner');
      fetchPendingList();
    } else if (partyInfo.participation.some((user) => user.username === currentUser.username)) {
      //참가자 권한 확인
      if (joinState == 'joined') return;
      setJoinState('joined');
      fetchPendingList();
    } else {
      if (joinState == 'notJoined') return;
      setJoinState('notJoined');
    }
  }, [partyInfo, currentUser, nowPartyId]);

  const joinParty = useCallback(async () => {
    if (joinState !== 'notJoined') return;
    alert('참가 신청!');
    const res = await partyAPI.PartyJoin(nowPartyId);
    if (res) setJoinState('pending');
  }, [joinState, nowPartyId]);

  const cancleJoin = useCallback(async () => {
    //const res = partyAPI.... 이부분 아직 API 메소드가 없음 나중에 추가
    alert('참가 취소!');
    setJoinState('notJoined');
  }, []);

  const acceptJoin = useCallback(async (pendingUser: userSimple) => {
    const res = await partyAPI.AcceptPartyJoin(nowPartyId, pendingUser.memberId);
    if (res == true) {
      setPartyInfo((prev) => (prev ? { ...prev, participation: [...prev.participation, pendingUser] } : prev));
      setPendingList((prev) => prev.filter((user) => user.memberId !== pendingUser.memberId));
    }
  }, []);
  const rejectJoin = useCallback(async (pendingUser: userSimple) => {
    const res = await partyAPI.RejectPartyJoin(nowPartyId, pendingUser.memberId);
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
  toggleJoinChatting: () => void;
};

const ChattingContext = createContext<ChattingContextType | null>(null);

export const ChattingContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const { user: currentUser } = useAuthStore();
  // const partyAPI = useParty();
  const { joinState } = usePartyContext();
  const [chatParticipantList, setChatParticipantList] = useState<userSimple[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  const toggleJoinChatting = useCallback(() => {
    if (isJoined) {
      //채팅에 참가중이라면
      if (joinState !== 'joined' && joinState !== 'owner') return; //권한 확인
      //이곳에 채팅 참가와 관련된 함수 작성, 혹은 isJoined 값으로 컴포넌트 렌더링
      //이곳에 함수 작성할거면 상단주석처리된 두 줄 넣기
      setChatParticipantList([]);
      setIsJoined(false);
    } else {
      //채팅에 참가중이지 않다면
      if (joinState !== 'joined' && joinState !== 'owner') return; //권한 확인
      //이곳에 채팅 퇴장와 관련된 함수 작성, 혹은 isJoined 값으로 컴포넌트 렌더링
      //이곳에 함수 작성할거면 상단주석처리된 두 줄 넣기
      setChatParticipantList([]);
      setIsJoined(true);
    }
  }, [isJoined, joinState]);

  const value = useMemo(
    () => ({
      isJoined,
      chatParticipantList,
      toggleJoinChatting,
    }),
    [isJoined, chatParticipantList, toggleJoinChatting]
  );

  return <ChattingContext.Provider value={value}>{children}</ChattingContext.Provider>;
};

export const useChattingContext = () => {
  const context = useContext(ChattingContext);
  if (!context) throw new Error('useChattingContext must be used within a ChattingContextProvider');
  return context;
};
