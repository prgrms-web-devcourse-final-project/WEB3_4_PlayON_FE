import { useAxios } from '@/hooks/useAxios';
import { PARTYLOG_ENDPOINTS as PARTYLOG } from '@/constants/endpoints/party-log';

export const usePartyLog = () => {
  const axios = useAxios();

  async function PutPartyLog(logId: string, partyId: string) {}
  async function DeletePartyLog(logId: string, partyId: string) {}
  async function SaveScreenshot(logId: string, partyId: string) {}
  async function GetPartyLogs(logId: string) {}
  async function CreatePartyLog(partyId: string) {}
};
