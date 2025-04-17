import { useAxios } from './useAxios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { CHAT_ENDPOINTS } from '@/constants/endpoints/chat-room';
import { useRef, useState } from 'react';
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

const WEBSOCKET_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL;

export const useStomp = () => {
  const axios = useAxios();
  const id = useRef<number | null>(null);
  const auth = useAuthStore();
  const [client, setClient] = useState<Client | null>(null);

  async function JoinRequest(partyId: number) {
    const response = await axios.Post(
      CHAT_ENDPOINTS.join(partyId),
      {},
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    console.log('response', response);
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
      id.current = data.partyId;
      if (WEBSOCKET_BASE_URL) {
        const client = new Client({
          webSocketFactory: () => {
            return new SockJS(WEBSOCKET_BASE_URL);
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
          if (id.current === null) {
            console.error('❌ ID가 없습니다. 연결을 종료합니다.');
            return;
          }
          console.log('🟢 STOMP 연결됨', frame);
          client.subscribe(CHAT_ENDPOINTS.subscribe_message(id.current), (message) => {
            const chatMessage: ChatMessageDTO = JSON.parse(message.body);
            console.log('📥 메시지 수신됨:', chatMessage);
          });
          client.subscribe(CHAT_ENDPOINTS.member_update(id.current), (message) => {
            const memberUpdate: ChatMemberDTO = JSON.parse(message.body);
            console.log('👥 멤버 업데이트:', memberUpdate);
          });
        };
        client.onDisconnect = (frame) => {
          console.log('🔴 STOMP 연결 해제됨', frame);
        };
        client.onStompError = (frame) => {
          console.error('❌ STOMP 에러 발생', frame);
        };
        setClient(client);
        return data;
      }
    }
    return false;
  }
  async function LeaveRequest(partyId: number) {
    const response = await axios.Delete(
      CHAT_ENDPOINTS.leave(partyId),
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    console.log('response', response);
    if (response && response.status === 204) {
      id.current = null;
      return true;
    }
    return false;
  }
  async function Connect() {
    if (client) client.activate();
    else {
      console.error('❌ STOMP 클라이언트가 없습니다. 연결할 수 없습니다.');
    }
  }
  async function Disconnect() {
    if (client) client.deactivate();
    else {
      console.error('❌ STOMP 클라이언트가 없습니다. 연결을 해제할 수 없습니다.');
    }
  }
  async function SendMessage(message: string) {
    // if (!auth.user || !memberId) {
    if (!auth.user) {
      console.error('❌ 유저 정보가 없습니다. 메시지를 전송할 수 없습니다.');
      return;
    }
    if (id.current === null) {
      console.error('❌ ID가 없습니다. 메시지를 전송할 수 없습니다.');
      return;
    }
    if (client === null) {
      console.error('❌ ID가 없습니다. 메시지를 전송할 수 없습니다.');
      return;
    }
    console.log(id.current);
    const _message: ChatMessageDTO = {
      senderMemberId: 5,
      nickname: auth.user.nickname,
      profileImg: auth.user.img_src ?? '',
      message: message,
      sendAt: new Date(),
      title: 'hello world',
    };
    try {
      client.publish({
        destination: CHAT_ENDPOINTS.send_message(id.current),
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
