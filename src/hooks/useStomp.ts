import { useAxios } from './useAxios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { CHAT_ENDPOINTS } from '@/constants/endpoints/chat-room';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export type ChatMessageDTO = {
  senderMemberId: number;
  title: string;
  nickname: string;
  profileImg: string;
  message: string;
  sendAt: Date;
};
export type ChatMemberDTO = {
  senderMemberId: number;
  title: string;
  nickname: string;
  profileImg: string;
  message: string;
  sendAt: Date;
};
export const useStomp = (onReceiveMessageCallback: (message: ChatMessageDTO) => void) => {
  const axios = useAxios();
  const [id, setId] = useState<number | null>(null);
  const [memberId, setMemberId] = useState<number | null>(null);
  const auth = useAuthStore();

  if (!auth.user) {
    console.error('❌ 유저 정보가 없습니다. STOMP 연결을 종료합니다.');
    return;
  }

  const client = new Client({
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
  client.onConnect = (frame) => {
    if (!id) {
      console.error('❌ ID가 없습니다. 연결을 종료합니다.');
      return;
    }
    console.log('🟢 STOMP 연결됨', frame);
    client.subscribe(CHAT_ENDPOINTS.subscribe_message(id), (message) => {
      const chatMessage: ChatMessageDTO = JSON.parse(message.body);
      onReceiveMessageCallback(chatMessage);
      console.log('📥 메시지 수신됨:', chatMessage);
    });
    client.subscribe(CHAT_ENDPOINTS.member_update(id), (message) => {
      const memberUpdate: ChatMemberDTO = JSON.parse(message.body);
      onReceiveMessageCallback(memberUpdate);
      console.log('👥 멤버 업데이트:', memberUpdate);
    });
  };
  client.onDisconnect = (frame) => {
    console.log('🔴 STOMP 연결 해제됨', frame);
  };
  client.onStompError = (frame) => {
    console.error('❌ STOMP 에러 발생', frame);
  };

  async function JoinRequest(partyId: number) {
    const response = await axios.Post(
      CHAT_ENDPOINTS.join(partyId),
      {},
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (response && response.status === 200) {
      const data = {
        partyRoomId: response.data.data.partyRoomId,
        partyId: response.data.data.partyId,
        members: response.data.data.members as { memberId: number; nickname: string; profileImg: string }[],
        messages: response.data.data.messages as {
          senderMemberId: number;
          title: string;
          nickname: string;
          profileImg: string;
          message: string;
          sendAt: Date;
        }[],
      };
      setId(data.partyId);
      setMemberId(data.messages[0].senderMemberId);
    }
    return false;
  }
  async function LeaveRequest(partyId: number) {
    const response = await axios.Post(
      CHAT_ENDPOINTS.leave(partyId),
      {},
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
  async function Connect() {
    client.activate();
  }
  async function Disconnect() {
    client.deactivate();
    setId(null);
  }
  async function SendMessage(partyId: number, message: string) {
    if (!auth.user || !memberId) {
      console.error('❌ 유저 정보가 없습니다. 메시지를 전송할 수 없습니다.');
      return;
    }
    const _message: ChatMessageDTO = {
      senderMemberId: memberId,
      nickname: auth.user.nickname,
      profileImg: auth.user.img_src ?? '',
      message: message,
      sendAt: new Date(),
      title: 'hello world',
    };
    try {
      client.publish({
        destination: CHAT_ENDPOINTS.send_message(partyId),
        body: JSON.stringify(_message),
        skipContentLengthHeader: true,
      });
    } catch (error) {
      console.error('❌ 메시지 전송 실패', error);
    }
  }

  return {
    JoinRequest,
    LeaveRequest,
    Connect,
    Disconnect,
    SendMessage,
  };
};
