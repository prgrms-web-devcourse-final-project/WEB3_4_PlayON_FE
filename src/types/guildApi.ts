type FileType = 'png' | 'jpg' | 'jpeg' | 'webp';

export type Sort = 'latest' | 'activity' | 'members';

// 길드 생성 시 필요
export interface GuildCreateRequest {
  name: string;
  description: string;
  maxMembers: number;
  appid: number;
  isPublic: boolean;
  fileType: FileType;
  tags: GuildTag[];
}

// 길드 생성 시 필요
export interface GuildUpdateRequest {
  name: string;
  description: string;
  maxMembers: number;
  appid: number;
  isPublic: boolean;
  newFileType: FileType;
  tags: GuildTag[];
}

interface GuildTag {
  type: string;
  value: string;
}

export interface GuildDetail {
  createdAt: string;
  description: string;
  guildImg: string;
  id: number;
  isPublic: boolean;
  leaderImg: string;
  leaderName: string;
  maxMembers: number;
  memberCount: number;
  myRole: string;
  name: string;
  tags: string[];
}

export interface GuildSimple {
  guildId: number;
  guildImg: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
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
    tags: string[];
  };
}

export interface GuildMainResponse {
  resultCode: string;
  msg: string;
  data: GuildSimple[];
}
