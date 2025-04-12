'use client';

import { useRouter } from 'next/navigation';
import { PARTY_ENDPOINTS } from '@/constants/endpoints/party';
import { PATH } from '@/constants/routes';
import { useAxios } from '@/hooks/useAxios';
import { createPartyReq, getPartiesReq, getPartyRes, party } from '@/types/party';
import { getSteamImage } from './steamImg';
import { userSimple } from '@/types/user';
import { gameSimple } from '@/types/games';

export const useParty = () => {
  const axios = useAxios();
  const router = useRouter();

  async function GetParty(partyId: string | number): Promise<{
    partyId: string;
    party_name: string;
    description: string;
    start_time: Date;
    end_time?: Date;
    tags: string[];
    participation: userSimple[];
    selected_game: gameSimple;
    num_maximum: number;
    num_minimum?: number;
  } | null> {
    const res = await axios.Get(PARTY_ENDPOINTS.detail(String(partyId)), {}, false);
    if (res?.status == 200) {
      const party = res.data.data;
      console.log('raw data : ', party);
      return {
        partyId: party.partyId,
        party_name: party.name,
        description: party.description,
        start_time: party.partyAt,
        end_time: party.endedAt,
        tags: party.partyTags.map((tag) => tag.tagValue),
        participation: party.partyMembers,
        selected_game: {
          title: party.gameName,
          genre: [],
          img_src: await getSteamImage(party.appId, 'header'),
          background_src: await getSteamImage(party.appId, 'background'),
        },
        num_maximum: party.maximum,
        num_minimum: party.minimum,
      };
    }
    console.log('로딩 중 문제가 발생했습니다.');
    return null;
  }
  async function GetParties(
    filter: getPartiesReq,
    partyAt?: Date,
    page?: number,
    orderBy?: string
  ): Promise<{
    parties: party[];
    totalPages: number;
    totalItems: number;
  } | null> {
    const res = await axios.Post(
      PARTY_ENDPOINTS.list,
      { ...filter },
      {
        params: {
          partyAt,
          page,
          orderBy,
          pageSize: 9,
        },
      },
      true
    );
    if (res && res.status == 200) {
      const data = res.data.data;
      console.log('raw data : ', data);
      return {
        parties: data.items,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      };
    }
    console.log('로딩 중 문제가 발생했습니다.');
    return null;
  }
  async function DeleteParty(partyId: string) {
    const res = await axios.Delete(PARTY_ENDPOINTS.cancel(partyId), {}, true);
  }
  async function AcceptPartyJoin(partyId: string, memberId: string) {
    const res = await axios.Put(PARTY_ENDPOINTS.accept_member(partyId, memberId), {}, {}, true);
    console.log('game join accept', res);
    if (res) {
      return true;
    } else {
      return false;
    }
  }
  async function RejectPartyJoin(partyId: string, memberId: string) {
    const res = await axios.Delete(PARTY_ENDPOINTS.reject_member(partyId, memberId), {}, true);
    console.log('game Reject accept', res);
    console.log(res);
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  async function CreateParty(data: createPartyReq) {
    const res = await axios.Post(PARTY_ENDPOINTS.create, { ...data }, {}, true);
    if (res && res.status == 201) {
      router.push(PATH.party_detail(res.data.data.id));
    }
  }
  async function ModifyParty(data: party & { public: boolean; partyId: string }) {
    const res = axios.Put(
      PARTY_ENDPOINTS.modify(data.partyId),
      {
        name: data.party_name,
        description: data.description,
        partyAt: data.start_time,
        isPublic: true,
        minimum: data.num_minimum && 2,
        maximum: data.num_maximum,
        gameId: data.selected_game,
        tags: data.tags,
      },
      {},
      true
    );
    console.log(res);
  }
  async function PartyJoin(partyId: string): Promise<boolean> {
    const res = await axios.Post(PARTY_ENDPOINTS.join(partyId), {}, {}, true);
    if (res && res.status == 204) {
      return true;
    } else {
      return false;
    }
  }
  async function PartyInvite(partyId: string, memberId: string) {
    const res = await axios.Post(PARTY_ENDPOINTS.invite(partyId, memberId), {}, {}, true);
    console.log(res);
  }
  async function PartyResult(partyId: string) {
    const res = await axios.Get(PARTY_ENDPOINTS.result(partyId), {}, false);
    console.log(res);
  }
  async function GetPendingList(partyId: string) {
    const res = await axios.Get(PARTY_ENDPOINTS.pending(partyId), {}, false);
    if (res && res.status == 200) {
      console.log(res.data.data.partyMembers);
      return res.data.data.partyMembers;
    }
    console.log('로딩 중 문제가 발생했습니다.');
    return null;
  }

  // 메인 페이지용 요청
  async function MainPendingParty(limit: number): Promise<getPartyRes[]> {
    const res = await axios.Get(
      PARTY_ENDPOINTS.main_pending,
      {
        params: { limit: limit + 1 },
      },
      false
    );
    if (res && res.status === 200) {
      console.log('요청 개수 : ', limit);
      return res.data.data.parties;
    }
    return [];
  }

  async function MainLoggedParty(limit: number): Promise<getPartyRes[]> {
    const res = await axios.Get(
      PARTY_ENDPOINTS.main_completed,
      {
        params: { limit: limit },
      },
      false
    );
    if (res && res.status == 200) {
      console.log('logged party : ', res);
      return res.data.data.parties;
    }
    return [];
  }

  return {
    GetParty,
    GetParties,
    ModifyParty,
    DeleteParty,
    AcceptPartyJoin,
    RejectPartyJoin,
    CreateParty,
    PartyJoin,
    PartyInvite,
    PartyResult,
    GetPendingList,
    MainPendingParty,
    MainLoggedParty,
  };
};
