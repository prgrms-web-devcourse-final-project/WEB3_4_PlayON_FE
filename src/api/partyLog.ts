import { useAxios } from '@/hooks/useAxios';
import { PARTYLOG_ENDPOINTS as PARTYLOG } from '@/constants/endpoints/party-log';

export const usePartyLog = () => {
  const axios = useAxios();

  // 파티 로그 수정
  async function PutPartyLog(
    logId: string,
    partyId: string,
    data: { comment: string; content: string; deleteUrl: string; newFileType: string }
  ) {
    const response = await axios.Put(
      PARTYLOG.modify(logId, partyId),
      { ...data },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    console.log(response?.data);
    return response;
  }

  // 파티 로그 삭제

  async function DeletePartyLog(logId: string, partyId: string) {
    const response = await axios.Delete(
      PARTYLOG.delete(logId, partyId),
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    console.log(response);
    console.log(response?.data);
    return response;
  }

  // 스크린샷 URL 저장
  async function SaveScreenshot(logId: string, partyId: string, url: string) {
    const response = await axios.Post(
      PARTYLOG.screenshot(logId, partyId),
      { url },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    console.log(response);
    console.log(response?.data);
    return response;
  }
  
  // 파티 로그 작성
  async function CreatePartyLog(
    partyId: string,
    data: { comment: string; content: string; fileType: string; partyMemberId: string }
  ) {
    const response = await axios.Post(PARTYLOG.write(partyId), { ...data }, {}, true);
    console.log(response);
    console.log(response?.data);
    return response;
  }
  
  // 파티의 모든 파티 로그 조회
  async function GetPartyLogs(partyId: string) {
    const response = await axios.Get(PARTYLOG.list(partyId), {}, true);
    console.log(response);
    return response;
  }


  return { PutPartyLog, DeletePartyLog, SaveScreenshot, GetPartyLogs, CreatePartyLog };
};
