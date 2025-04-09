const typeMap = {
  playStyle: {
    KoToEn: {
      맛보기: 'BEGINNER',
      캐주얼: 'CASUAL',
      노멀: 'NORMAL',
      하드: 'HARDCORE',
      익스트림: 'EXTREME',
      도전과제: 'COMPLETIONIST',
      스피드러너: 'SPEEDRUN',
    },
    EnToKo: {
      BEGINNER: '맛보기',
      CASUAL: '캐주얼',
      NORMAL: '노멀',
      HARDCORE: '하드',
      EXTREME: '익스트림',
      COMPLETIONIST: '도전과제',
      SPEEDRUN: '스피드러너',
    },
  },
  skillLevel: {
    KoToEn: {
      뉴비: 'NEWBIE',
      프로: 'PRO',
      해커: 'HACKER',
      마스터: 'MASTER',
    },
    EnToKo: {
      NEWBIE: '뉴비',
      PRO: '프로',
      HACKER: '해커',
      MASTER: '마스터',
    },
  },
  gender: {
    KoToEn: {
      남자만: 'MALE',
      여자만: 'FEMALE',
    },
    EnToKo: {
      MALE: '남자만',
      FEMALE: '여자만',
    },
  },
  friendly: {
    KoToEn: {
      '친목 환영': 'SOCIAL_FRIENDLY',
      '게임 전용': 'GAME_ONLY',
      '대화 없음': 'NO_CHAT',
    },
    EnToKo: {},
  },
};

type TypeMap = typeof typeMap;
type ConvertingType = keyof TypeMap;
type Direction = keyof TypeMap[ConvertingType];

export default function typeConverter<T extends ConvertingType, D extends Direction, I extends keyof TypeMap[T][D]>(
  convertingType: T,
  direction: D,
  input: I
): TypeMap[T][D][I] | undefined {
  return typeMap[convertingType][direction][input];
}
