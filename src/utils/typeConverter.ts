const typeMap = {
  GAME_SKILL: {
    koToEn: {
      뉴비: 'CLEAN_WATER',
      프로: 'MUD_WATER',
      해커: 'STAGNANT_WATER',
      마스터: 'ROTTEN_WATER',
    },
    enToKo: {
      CLEAN_WATER: '뉴비',
      MUD_WATER: '프로',
      STAGNANT_WATER: '해커',
      ROTTEN_WATER: '마스터',
    },
    paramToEnum: {
      newbie: 'CLEAN_WATER',
      pro: 'MUD_WATER',
      hacker: 'STAGNANT_WATER',
      master: 'ROTTEN_WATER',
    },
  },
  GENDER: {
    koToEn: {
      여성: 'FEMALE',
      남성: 'MALE',
    },
    enToKo: {
      FEMALE: '여성',
      MALE: '남성',
    },
    paramToEnum: {
      female: 'FEMALE',
      male: 'MALE',
    },
  },
} as const;

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
