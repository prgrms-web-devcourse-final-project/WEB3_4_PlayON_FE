import { useAxios } from './useAxios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

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
  type ChatMemberDTO = {
    memberId: number;
    nickname: string;
    profileImg: string;
  };

  async function JoinRequest(partyId: number, xuserid: number) {
    const response = await axios.Post(
      `/chat/enter/${partyId}`,
      {},
      { headers: { 'Content-Type': 'application/json', 'X-USER-ID': xuserid } },
      true
    );
    console.log(response);
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
      `/api/chat/leave/${partyId}`,
      {},
      { headers: { 'Content-Type': 'application/json', 'X-USER-ID': xuserid } },
      true
    );
    console.log(response);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }
  async function Connect(partyId: number) {
    stompClient.connect(
      {},
      function (frame) {
        console.log('🟢 STOMP 연결됨');

        // STOMP 구독
        stompClient.subscribe(`/topic/chat/party/${partyId}`, function (msg) {
          console.log('📥 메시지: ' + msg.body);
        });

        stompClient.subscribe(`/topic/chat/party/${partyId}/members`, function (msg) {
          console.log('👥 멤버 갱신: ' + msg.body);
        });
      },
      function (error) {
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

// function enterAndConnect() {
//   const partyId = document.getElementById("partyId").value;
//   userId = document.getElementById("userId").value;  // 사용자 ID를 전역 변수에 할당
//   memberId = userId;  // memberId는 사용자 ID와 동일하게 설정

//   fetch(`http://localhost:8080/api/chat/enter/${partyId}`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           "X-USER-ID": userId   // 👉 백엔드에서 사용 시 커스텀 헤더로 처리 가능
//       }
//   })
//       .then(res => res.json())
//       .then(data => {
//           log("✅ 입장 성공: " + JSON.stringify(data));
//           connectStomp(partyId);
//       })
//       .catch(err => {
//           log("❌ 입장 실패: " + err);
//       });
// }

// function connectStomp(partyId) {
//   const socket = new SockJS("http://localhost:8080/ws");  // WebSocket URL
//   stompClient = Stomp.over(socket);

//   stompClient.connect({}, function (frame) {
//       log("🟢 STOMP 연결됨");

//       // STOMP 구독
//       stompClient.subscribe(`/topic/chat/party/${partyId}`, function (msg) {
//           log("📥 메시지: " + msg.body);
//       });

//       stompClient.subscribe(`/topic/chat/party/${partyId}/members`, function (msg) {
//           log("👥 멤버 갱신: " + msg.body);
//       });
//   }, function (error) {
//       log("❌ STOMP 연결 실패: " + error);
//   });
// }

// function disconnect() {
//   const partyId = document.getElementById("partyId").value;

//   // 먼저 퇴장 요청
//   fetch(`http://localhost:8080/api/chat/leave/${partyId}`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           "X-USER-ID": userId
//       }
//   })
//       .then(res => {
//           if (!res.ok) throw new Error("퇴장 실패");
//           log("🚪 퇴장 요청 완료");
//       })
//       .catch(err => {
//           log("❌ 퇴장 요청 실패: " + err);
//       })
//       .finally(() => {
//           // STOMP 연결 해제
//           if (stompClient) {
//               stompClient.disconnect(() => {
//                   log("🔴 STOMP 연결 해제됨");
//               });
//           }
//       });
// }

// function sendMessage() {
//   const partyId = document.getElementById("partyId").value;
//   const message = document.getElementById("messageInput").value;

//   if (!stompClient || !stompClient.connected) {
//       log("❌ STOMP 연결이 안 됨! 메시지를 보낼 수 없음.");
//       return;
//   }

//   console.log("멤버 ID", memberId)
//   stompClient.send(`/app/chat.send/${partyId}/member/${memberId}`, {}, JSON.stringify(message));
//   log("📤 보낸 메시지: " + JSON.stringify(messagePayload));
// }
