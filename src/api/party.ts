type tag = {
  type: 'GAME_SKILL' | 'GENDER' | 'PARTY_STYLE' | 'SOCIALIZING';
  value:
    | 'NEWBIE'
    | 'CLEAN_WATER'
    | 'MUD_WATER'
    | 'STAGNANT_WATER'
    | 'ROTTEN_WATER'
    | 'CASUAL'
    | 'COMPLETIONIST'
    | 'SPEEDRUN'
    | 'HARDCORE'
    | 'NO_CHAT'
    | 'GAME_ONLY'
    | 'SOCIAL_FRIENDLY'
    | 'MALE'
    | 'FEMALE';
};

import { useAxios } from '@/hooks/useAxios';
import { PARTY_ENDPOINTS as PARTY, PARTY_ENDPOINTS } from '@/constants/endpoints/party';
import { party } from '@/types/party';

export const useParty = () => {
  const axios = useAxios();

  async function GetParty(partyId: string) {}
  async function GetParties(
    partyAt?: Date,
    params?: {
      gameId: string | number;
      genres: string[];
      tags: {};
    },
    orderBy?: string,
    page?: number,
    pageSize?: number
  ) {
    axios.Get(
      `${PARTY_ENDPOINTS.list}/${partyAt}`,
      {
        params: {},
      },
      true
    );
  }
  async function PutParty(partyId: string) {}
  async function DeleteParty(partyId: string) {}
  async function AcceptPartyJoin(partyId: string, memberId: string) {}
  async function RejectPartyJoin(partyId: string, memberId: string) {}
  async function CreateParty(data: party & { public: boolean }) {
    axios.Post(
      PARTY_ENDPOINTS.create,
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
  }
  async function PartyJoin() {}
  async function PartyInvite() {}
  async function PartyResult() {}
  async function PendingPartyJoin() {}

  // 메인 페이지용 요청

  return {
    GetParty,
    GetParties,
    PutParty,
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
