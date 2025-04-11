import { userSimple } from './user';

type FileType = 'png' | 'jpg' | 'jpeg' | 'webp';

export type Sort = 'latest' | 'activity' | 'members';

interface GuildTag {
  type: string;
  value: string;
}

// ReQuest

export interface GuildCreateRequest {
  name: string;
  description: string;
  maxMembers: number;
  appid: number;
  isPublic: boolean;
  fileType: FileType;
  tags: GuildTag[];
}

export interface GuildUpdateRequest {
  name: string;
  description: string;
  maxMembers: number;
  appid: number;
  isPublic: boolean;
  newFileType: FileType;
  tags: GuildTag[];
}

export interface GuildLIstRequest {
  name: string;
  appids: number[];
  tags: GuildTag[];
}

// Response

export interface GuildDetail {
  id: number;
  name: string;
  description: string;
  leaderName: string;
  leaderImg: string;
  memberCount: number;
  maxMembers: number;
  isPublic: boolean;
  guildImg: string;
  createdAt: string;
  myRole: string;
  tags: GuildTag[];
}

export interface GuildSimple {
  guildId: number;
  guildImg: string;
  name: string;
  gameName: string;
  description: string;
  memberCount: number;
  tags: GuildTag[];
}

export interface GuildDetailMember {
  memberId: number;
  username: string;
  profileImg: string;
  title: string;
  role: string;
  joinedAt: string;
}

export interface GuildJoinRequest {
  approvalState: 'PENDING' | 'APPROVED' | 'REJECTED';
  memberId: number;
  profileImg: string | null;
  requestId: number;
  requestedAt: string;
  titleName: string;
  username: string;
}

export interface GuildDetailResponse {
  msg: string;
  resultCode: string;
  data: GuildDetail;
}

export interface GuildListResponse {
  msg: string;
  resultCode: string;
  data: {
    currentPageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    items: GuildSimple[];
  };
}

export interface GuildAdminResponse {
  resultCode: string;
  msg: string;
  data: {
    id: 9007199254740991;
    name: string;
    leaderName: string;
    managerNames: string[];
    memberCount: 1073741824;
    guildImg: string;
    createdAt: string;
    myRole: string;
    tags: GuildTag[];
  };
}

export interface GuildMainResponse {
  resultCode: string;
  msg: string;
  data: GuildSimple[];
}

export interface GuildDetailMemberResponse {
  resultCode: string;
  msg: string;
  data: GuildDetailMember[];
}

export interface GuildJoinRequestsResponse {
  resultCode: string;
  msg: string;
  data: GuildJoinRequest[];
}

export type AdditionalInfo = userSimple & {
  memberId: number;
  requestId: number;
  requestedAt: Date;
  approvalState: string;
};
