'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PARTY_ENDPOINTS } from '@/constants/endpoints/party';
import { PATH } from '@/constants/routes';
import { useAxios } from '@/hooks/useAxios';
import { createPartyReq, getPartiesReq, party } from '@/types/party';
export const useParty = () => {
  const axios = useAxios();
  const router = useRouter();
  async function GetParty(partyId: string | number) {
    const res = await axios.Get(PARTY_ENDPOINTS.detail(String(partyId)), {}, false);
    if (res?.status == 200) {
      const party = res.data.data;
      console.log(party);
      return {
        party_name: party.name,
        description: party.description,
        start_time: party.partyAt,
        end_time: party.endedAt,
        tags: Object.values(party.partyTags),
        participation: party.partyMembers,
        selected_game: party.game, //수정 필요
        num_maximum: 0, //수정 필요
        num_minimum: 0, //수정 필요
      };
    }
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
      false
    );
    if (res && res.status == 200) {
      const data = res.data.data;
      console.log('raw data : ', data);

      console.log('파티 상세 임시 조회 ');

      return {
        parties: data.items.map(async (party) => {
          const partyDetail = await GetParty(party.partyId);
          return {
            party_name: party.name,
            description: party.description,
            start_time: new Date(party.partyAt),
            tags: party.partyTags.map((tag) => tag.tagValue),
            participation: party.members,
            selected_game: party.appId,
            num_maximum: partyDetail?.num_maximum,
            num_minimum: partyDetail?.num_minimum,
          };
        }),
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
    console.log(res);
  }
  async function RejectPartyJoin(partyId: string, memberId: string) {
    const res = await axios.Delete(PARTY_ENDPOINTS.reject_member(partyId, memberId), {}, true);
    console.log(res);
  }

  async function CreateParty(data: createPartyReq) {
    const res = await axios.Post(PARTY_ENDPOINTS.create, { ...data }, {}, true);
    if (res && res.status == 201) {
      router.push(PATH.party_list);
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
  async function PartyJoin(partyId: string) {
    const res = await axios.Post(PARTY_ENDPOINTS.join(partyId), {}, {}, true);
    console.log(res);
  }
  async function PartyInvite(partyId: string, memberId: string) {
    const res = await axios.Post(PARTY_ENDPOINTS.invite(partyId, memberId), {}, {}, true);
    console.log(res);
  }
  async function PartyResult(partyId: string) {
    const res = await axios.Get(PARTY_ENDPOINTS.result(partyId), {}, false);
    console.log(res);
  }
  async function PendingPartyJoin(partyId: string) {
    const res = await axios.Get(PARTY_ENDPOINTS.pending(partyId), {}, false);
    console.log(res);
  }

  // 메인 페이지용 요청
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
    PendingPartyJoin,
  };
};
