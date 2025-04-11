import { useAxios } from './useAxios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { CHAT_ENDPOINTS } from '@/constants/endpoints/chat-room';
import { useState } from 'react';

export const useStomp = () => {
  type ChatMessageDTO = {
    senderMemberId: number;
    nickname: string;
    partyOwner: string;
    profileImg: string;
    message: string;
    sendAt: Date;
  };
  const axios = useAxios();
  const [id, setId] = useState<number | null>(null);
  const client = new Client({
    webSocketFactory: () => {
      return new SockJS('http://localhost:8080/ws');
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

      console.log('📥 메시지 수신됨:', chatMessage);
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
      setId(partyId);
      return {
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
  async function SendMessage(partyId: number, xuserid: number, message: string) {
    const _message: ChatMessageDTO = {
      senderMemberId: xuserid,
      nickname: `nickname_${xuserid}`,
      partyOwner: 'partyOwner',
      profileImg: 'profileImg',
      message: message,
      sendAt: new Date(),
    };
    client.publish({
      destination: CHAT_ENDPOINTS.subscribe_message(partyId),
      body: JSON.stringify(_message),
      skipContentLengthHeader: true,
    });
  }

  return {
    JoinRequest,
    LeaveRequest,
    Connect,
    Disconnect,
    SendMessage,
  };
};
