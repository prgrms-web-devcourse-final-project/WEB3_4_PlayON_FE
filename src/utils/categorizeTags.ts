interface Tag {
  type: string;
  value: string;
}

interface Result {
  play_style: string[];
  skill_level: string[];
  gender: string[];
  friendly: string[];
}

export default function categorizeTags(tags: Tag[]) {
  // type -> key 매핑
  const typeMap: Record<string, keyof Result> = {
    '파티 스타일': 'play_style',
    '게임 실력': 'skill_level',
    성별: 'gender',
    친목: 'friendly',
  };

  // 결과 객체 초기화
  const result: Result = {
    play_style: [],
    skill_level: [],
    gender: [],
    friendly: [],
  };

  tags.forEach((tag) => {
    const key = typeMap[tag.type];
    if (!key) return; // 매핑이 없는 경우 skip

    // 값 추가
    result[key].push(tag.value);
  });

  return result;
}
