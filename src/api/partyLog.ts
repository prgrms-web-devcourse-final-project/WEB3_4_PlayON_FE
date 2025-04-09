import { useAxios } from '@/hooks/useAxios';
import { PARTYLOG_ENDPOINTS as PARTYLOG } from '@/constants/endpoints/party-log';

export const usePartyLog = () => {
  const axios = useAxios();

  async function PutPartyLog(
    logId: string,
    partyId: string,
    data: { comment: string; content: string; deleteUrl: string; newFileType: string }
  ) {
    const response = await axios.Put(PARTYLOG.modify(logId, partyId), { ...data }, {}, true);
    console.log(response);
  }
  async function DeletePartyLog(logId: string, partyId: string) {
    const response = await axios.Delete(PARTYLOG.delete(logId, partyId), {}, true);
    console.log(response);
  }
  async function SaveScreenshot(logId: string, partyId: string) {
    const response = await axios.Post(PARTYLOG.screenshot(logId, partyId), {}, {}, true);
    console.log(response);
  }
  async function GetPartyLogs(partyId: string) {
    const response = await axios.Get(PARTYLOG.list(partyId), {}, true);
    console.log(response);
  }
  async function CreatePartyLog(
    partyId: string,
    data: { comment: string; content: string; deleteUrl: string; newFileType: string }
  ) {
    const response = await axios.Post(PARTYLOG.write(partyId), { ...data }, {}, true);
    console.log(response);
  }
};
