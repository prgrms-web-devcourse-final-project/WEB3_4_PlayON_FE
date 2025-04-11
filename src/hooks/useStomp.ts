import { useAxios } from './useAxios';
import SockJS from 'sockjs-client';
import { Frame, Stomp } from '@stomp/stompjs';
import { CHAT_ENDPOINTS } from '@/constants/endpoints/chat-room';

export const useStomp = () => {
  const axios = useAxios();
  const socket = new SockJS('http://localhost:8080/ws'); // WebSocket URL
  const stompClient = Stomp.over(socket);

  type ChatMessageDTO = {
    senderMemberId: number;
    nickname: string;
    partyOwner: string;
    profileImg: string;
    message: string;
    sendAt: Date;
  };

  async function JoinRequest(partyId: number, xuserid: number) {
    const response = await axios.Post(
      CHAT_ENDPOINTS.join(partyId),
      {},
      { headers: { 'Content-Type': 'application/json', 'X-USER-ID': xuserid } },
      true
    );
    if (response && response.status === 200) {
      return {
        partyRoomId: response.data.partyRoomId,
        partyId: response.data.partyId,
        members: response.data.members as { memberId: number; nickname: string; profileImg: string }[],
        messages: response.data.messages as {
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
  async function LeaveRequest(partyId: number, xuserid: number) {
    const response = await axios.Post(
      CHAT_ENDPOINTS.leave(partyId),
      {},
      { headers: { 'Content-Type': 'application/json', 'X-USER-ID': xuserid } },
      true
    );
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
  async function Connect(partyId: number) {
    stompClient.connect(
      {},
      function (frame: Frame) {
        console.log('🟢 STOMP 연결됨');

        // STOMP 구독
        stompClient.subscribe(CHAT_ENDPOINTS.subscribe_message(partyId), function (msg) {
          console.log('📥 메시지: ' + msg.body);
        });
      },
      function (error: Frame | string) {
        console.error('❌ STOMP 연결 실패: ' + error);
      }
    );
  }
  async function Disconnect() {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('🔴 STOMP 연결 해제됨');
      });
    }
  }
  function SendMessage(partyId: number, memberId: number, message: string) {
    if (!stompClient || !stompClient.connected) {
      console.log('❌ STOMP 연결이 안 됨! 메시지를 보낼 수 없음.');
      return;
    }
    console.log('멤버 ID', memberId);
    stompClient.send(`/app/chat.send/${partyId}/member/${memberId}`, {}, JSON.stringify(message));
    console.log('📤 보낸 메시지: ' + JSON.stringify(messagePayload));
  }

  return {
    JoinRequest,
    LeaveRequest,
    Connect,
    Disconnect,
    SendMessage,
  };
};
