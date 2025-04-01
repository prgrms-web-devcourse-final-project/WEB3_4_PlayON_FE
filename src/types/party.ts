export interface Party {
  game_id: string; // 게임 이름
  game_image: string; // 게임 이미지
  name: string; // 파티 이름
  description: string; // 설명
  party_at: Date; // 일시
  public: boolean; // 공개여부
  minimum: number; // 최소인원
  maximum: number; // 최대인원
  party_tags: string[]; // 태그
  members: User[]; // 참가 인원
}

interface User {
  name: string;
  image: string;
}
