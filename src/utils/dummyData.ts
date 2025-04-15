import { loremIpsum } from './loremIpsum';
import { post, postSimple } from '@/types/community';
import { guild, guildUser } from '@/types/guild';
import { userDetail, userSimple } from '@/types/user';
import { gameDetail, gameSimple } from '@/types/games';
import { party, partyLog } from '@/types/party';

export const dummyUserSimple: userSimple = {
  img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
  nickname: 'Morty',
  user_title: 'AdventureTime!',
  username: 'morty1234@gmail.com',
  memberId: '1',
};
export const dummyUsers: userSimple[] = [
  {
    img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
    nickname: '김영희',
    user_title: 'AdventureTime!',
    username: 'yonghee@gmail.com',
  },
  {
    img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
    nickname: '홍길동',
    user_title: 'AdventureTime!',
    username: 'gildong@gmail.com',
  },
  {
    img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
    nickname: '태정태세비욘세',
    user_title: 'Stardew valley',
    username: 'tetebi@email.com',
  },
];
export const dummyUserDetail: userDetail = {
  img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
  last_login_at: new Date(),
  nickname: 'Morty',
  gender: '남자',
  party_style: '노멀',
  skill_level: '뉴비',
  steam_id: '123456789',
  user_title: 'AdventureTime!',
  username: 'morty1234@gmail.com',
};
export const dummyPost: post = {
  comments: [
    { user: dummyUserSimple, content: loremIpsum, createdAt: new Date() },
    { user: dummyUserSimple, content: loremIpsum, createdAt: new Date() },
    { user: dummyUserSimple, content: loremIpsum, createdAt: new Date() },
  ],
  content: loremIpsum,
  created_at: new Date(),
  hits: 100,
  img_src:
    'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1509960/ss_d54c6fd82d8c804939d136356eda364295a788cd.1920x1080.jpg?t=1740033204',
  num_likes: 123,
  channel: '자유',
  tag: '게임소식',
  title: '올해 신작 소식',
  user: dummyUserSimple,
};
export const dummyGameSimple: gameSimple = {
  background_src: 'https://store.akamai.steamstatic.com/images/storepagebackground/app/1509960?t=1740033204',
  genre: ['액션', '캐주얼', '인디'],
  img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1509960/header.jpg?t=1740033204',
  title: 'PICO PARK',
};
export const dummyGameDetail: gameDetail = {
  genre: ['액션', '캐주얼', '인디'],
  img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1509960/header.jpg?t=1740033204',
  title: 'PICO PARK',
  about: loremIpsum,
  detail_desc: loremIpsum,
  developer: ['TECOPARK'],
  homepage_url: 'http://picoparkgame.com/en/',
  publisher: ['TECOPARK'],
  movie_src: ['http://video.akamai.steamstatic.com/store_trailers/256829932/movie_max_vp9.webm?t=1618749324'],
  os: {
    windows: true,
    mac: false,
    linux: false,
  },
  release_date: new Date(),
  screenshot_src: [
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1509960/ss_d54c6fd82d8c804939d136356eda364295a788cd.1920x1080.jpg?t=1740033204',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1509960/ss_f356434b667dd6f5ff948a87d4d8486d29e31b36.1920x1080.jpg?t=1740033204',
  ],
  short_desc: 'PICO PARK is a cooperative local/online multiplay action puzzle game for 2-8 players.',
};
export const dummyGameDetail2: gameDetail = {
  genre: ['액션', '무료 플레이'],
  img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1729703045',
  title: 'Counter-Strike 2',
  about: loremIpsum,
  detail_desc: loremIpsum,
  developer: ['Valve'],
  homepage_url: 'http://picoparkgame.com/en/',
  publisher: ['Valve'],
  movie_src: ['http://video.akamai.steamstatic.com/store_trailers/256829932/movie_max_vp9.webm?t=1618749324'],
  os: {
    windows: true,
    mac: false,
    linux: false,
  },
  release_date: new Date(),
  screenshot_src: [
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_796601d9d67faf53486eeb26d0724347cea67ddc.1920x1080.jpg?t=1729703045',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1509960/ss_f356434b667dd6f5ff948a87d4d8486d29e31b36.1920x1080.jpg?t=1740033204',
  ],
  short_desc:
    'Counter-Strike는 20년이 넘는 시간 동안 전 세계 수백만 명의 플레이어가 모여 수준 높은 경쟁을 펼칠 수 있는 플랫폼을 제공해 왔습니다. 그리고 이제 곧 Counter-Strike 2와 함께 새로운 CS 시대의 막이 열립니다.',
};
export const dummyGameDetails = [dummyGameDetail, dummyGameDetail2];

export const dummyGuild: guild = {
  created_at: new Date(),
  description: loremIpsum,
  friendly: ['게임 전용'],
  gender: ['남자만', '여자만'],
  guild_name: '참신한 길드 이름',
  img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg?t=1721923149',
  num_members: 24,
  owner: dummyUserSimple,
  play_style: ['노멀', '도전과제'],
  skill_level: ['뉴비', '마스터'],
  main_game: dummyGameSimple,
  myRole: '',
};
export const dummyGuild2: guild = {
  created_at: new Date(),
  description: loremIpsum,
  friendly: ['게임 전용'],
  gender: ['남자만', '여자만'],
  guild_name: '참신한 길드 이름 2',
  img_src: '',
  num_members: 24,
  owner: dummyUserSimple,
  play_style: ['노멀', '도전과제'],
  skill_level: ['뉴비', '마스터'],
  main_game: dummyGameSimple,
  myRole: '',
};

export const dummyGuildUser: guildUser = {
  user: dummyUserDetail,
  guild_role: 'manager', // 'leader', 'manager', 'user'
  joined_at: new Date(),
  num_guild_posts: 17,
};

export const dummyParty: party = {
  party_name: '파티이름입니다.',
  description: '설명입니다.설명입니다.설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.',
  start_time: new Date(),
  end_time: new Date(Date.now() + 8000000),
  tags: ['맛보기', '뉴비'],
  participation: dummyUsers,
  selected_game: dummyGameSimple,
  num_maximum: 10,
};

export const dummyPartyLog: partyLog = {
  party_info: dummyParty,
  player_recommend: [
    {
      to: dummyUserSimple,
      from: dummyUserSimple,
    },
  ],
  screenshot: [
    {
      img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg?t=1721923149',
      author: dummyUserSimple,
      comment: '멋져요',
    },
    {
      author: dummyUserSimple,
      img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg?t=1721923149',
      comment: loremIpsum,
    },
  ],
  review: [
    {
      author: dummyUserSimple,
      text: '멋져요',
    },
    {
      author: dummyUserSimple,
      text: loremIpsum,
    },
    {
      author: dummyUserSimple,
      text: loremIpsum,
    },
  ],
};

export const mainDummyGamesAppId = [2211170, 578080, 1172470, 2001120];
export const mainDummyGames: gameDetail[] = [
  {
    title: 'Unrailed 2: Back on Track',
    genre: ['액션', '캐주얼', '인디', '전략'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2211170/header.jpg',
    screenshot_src: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2211170/ss_7f2c923dbd4e54aac2e26723db8a491c43b7160f.600x338.jpg?t=1743085107',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2211170/ss_abe9cbc767c82ea02746dc0b17754472c84c07b6.600x338.jpg?t=1743085107',
    ],
    movie_src: [],
    short_desc: '',
    release_date: new Date(1),
    developer: [],
    publisher: [],
    homepage_url: '',
    os: { windows: true, mac: true, linux: true },
    detail_desc: '',
    about: '',
  },
  {
    title: 'PUBG: BATTLEGROUNDS',
    genre: ['액션', '어드벤쳐', '멀티'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
    screenshot_src: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/c16e2f2d122cae77a1cbaca19263df0f2d2214fa/ss_c16e2f2d122cae77a1cbaca19263df0f2d2214fa.600x338.jpg?t=1744161491',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/3ae78fac4c07e9a2e2955286014355d6b7f3c8c7/ss_3ae78fac4c07e9a2e2955286014355d6b7f3c8c7.600x338.jpg?t=1744161491',
    ],
    movie_src: [],
    short_desc: '',
    release_date: new Date(1),
    developer: [],
    publisher: [],
    homepage_url: '',
    os: { windows: true, mac: true, linux: true },
    detail_desc: '',
    about: '',
  },
  {
    title: 'Apex LEGENDS™',
    genre: ['액션', '어드벤쳐'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg',
    screenshot_src: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/ss_80e1dc7c52872f2cc1b12b2eae17106cd91b1555.600x338.jpg?t=1741980558',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/ss_0c84b409e174ee9175ee45b3cc9e700f3ed5482a.600x338.jpg?t=1741980558',
    ],
    movie_src: [],
    short_desc: '',
    release_date: new Date(1),
    developer: [],
    publisher: [],
    homepage_url: '',
    os: { windows: true, mac: true, linux: true },
    detail_desc: '',
    about: '',
  },
  {
    title: 'Split Fiction',
    genre: ['액션', '어드벤쳐'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2001120/header.jpg',
    screenshot_src: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257116893/b4bbd6dc66f4d060be19939f12fa52593c01b5b8/movie_600x337.jpg?t=1742494046',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2001120/361876a377c0d42cad396ee08b84d753f28a217c/ss_361876a377c0d42cad396ee08b84d753f28a217c.600x338.jpg?t=1742852969',
    ],
    movie_src: [],
    short_desc: '',
    release_date: new Date(1),
    developer: [],
    publisher: [],
    homepage_url: '',
    os: { windows: true, mac: true, linux: true },
    detail_desc: '',
    about: '',
  },
];

export const mainDummyMyGames: gameSimple[] = [
  {
    title: 'Space for Sale',
    genre: ['캐주얼', '인디', '어드벤쳐'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1624060/header.jpg',
    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1624060/ss_acb83fcac61cb4eb9ae42647bbe6044b6920f0f9.600x338.jpg?t=1744709274',
    appid: 1624060,
  },
  {
    title: 'Overcooked! All You Can Eat',
    genre: ['캐주얼', '인디', '전략'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1243830/header.jpg',
    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1243830/ss_d4c4c3b36b48a1d9ff754b6be0b4ac97d7acd986.600x338.jpg?t=1732787467',
    appid: 1243830,
  },
  {
    title: 'Core Keeper',
    genre: ['캐주얼', '인디', '어드벤쳐'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1621690/header.jpg',
    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1624060/ss_acb83fcac61cb4eb9ae42647bbe6044b6920f0f9.600x338.jpg?t=1744709274',
    appid: 1621690,
  },
];

export const mainDummyGuilds: guild[][] = [
  [
    {
      guild_id: 12,
      guild_name: '별별모험가',
      description: '우주를 자유롭게 탐험하는 길드!',
      main_game: mainDummyMyGames[2],
      img_src:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dvhttps://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 20,
      max_members: 12,
      owner: dummyUserSimple,
      created_at: new Date('2025-04-10'),
      myRole: 'admin',
      play_style: ['캐주얼', '맛보기'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['친목 환영'],
    },
    {
      guild_id: 11,
      guild_name: '은하 개발단',
      description: '우주 한 가운데서 리조트 짓기 프로젝트!',
      main_game: mainDummyMyGames[2],
      img_src:
        'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 10,
      max_members: 10,
      owner: dummyUserSimple,
      created_at: new Date('2025-01-30'),
      myRole: 'member',
      play_style: ['노멀', '도전과제'],
      skill_level: ['프로'],
      gender: [],
      friendly: ['게임 전용'],
    },
    {
      guild_id: 9,
      guild_name: '우주부동산 중개소',
      description: '우주 행성 판매의 고수가 되고 싶다면!',
      main_game: mainDummyMyGames[2],
      img_src:
        'https://images.unsplash.com/photo-1635173250597-00863d9ce454?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 18,
      max_members: 6,
      owner: dummyUserSimple,
      created_at: new Date('2025-03-25'),
      myRole: 'member',
      play_style: ['노멀', '도전과제'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['친목 환영'],
    },
    {
      guild_id: 10,
      guild_name: '외계 상인회',
      description: '행성 거래에 특화된 길드예요!',
      main_game: mainDummyMyGames[2],
      img_src:
        'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 20,
      max_members: 8,
      owner: dummyUserSimple,
      created_at: new Date('2025-02-12'),
      myRole: 'member',
      play_style: ['맛보기', '캐주얼'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['친목 환영'],
    },
  ],
  [
    {
      guild_id: 1,
      guild_name: '요리조리 쉐프들',
      description: '혼돈의 주방에서 살아남을 쉐프를 모집합니다!',
      main_game: mainDummyMyGames[0],
      img_src:
        'https://images.unsplash.com/photo-1498588747262-0f2241707d13?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 12,
      max_members: 10,
      owner: dummyUserSimple,
      created_at: new Date('2024-10-01'),
      myRole: 'member',
      play_style: ['스피드러너', '노멀'],
      skill_level: ['뉴비'],
      gender: ['여자만'],
      friendly: ['친목 환영'],
    },
    {
      guild_id: 2,
      guild_name: '주방은 전쟁터',
      description: '실수해도 괜찮아요! 서로 도와가며 성장하는 길드!',
      main_game: mainDummyMyGames[0],
      img_src:
        'https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 33,
      max_members: 8,
      owner: dummyUserSimple,
      created_at: new Date('2024-11-05'),
      myRole: 'member',
      play_style: ['캐주얼'],
      skill_level: ['뉴비'],
      gender: ['남자만'],
      friendly: ['친목 환영'],
    },
    {
      guild_id: 3,
      guild_name: '고든램지단',
      description: '정신없이 요리하다보면 스트레스도 날아가요!',
      main_game: mainDummyMyGames[0],
      img_src:
        'https://images.unsplash.com/photo-1690983322437-6ec85691e003?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 24,
      max_members: 10,
      owner: dummyUserSimple,
      created_at: new Date('2025-01-15'),
      myRole: 'admin',
      play_style: ['하드'],
      skill_level: ['프로'],
      gender: [],
      friendly: ['게임 전용'],
    },
    {
      guild_id: 4,
      guild_name: '맛집연구소',
      description: '미식가들이 모이는 오버쿡드 연구소입니다.',
      main_game: mainDummyMyGames[0],
      img_src:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 14,
      max_members: 10,
      owner: dummyUserSimple,
      created_at: new Date('2025-03-02'),
      myRole: 'member',
      play_style: ['캐주얼'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['대화 없음'],
    },
  ],
  [
    {
      guild_id: 5,
      guild_name: '지하 탐험대',
      description: '지하 세계를 함께 개척할 모험가들 모집!',
      main_game: mainDummyMyGames[1],
      img_src:
        'https://images.unsplash.com/photo-1685914963658-11d4c18527c1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 16,
      max_members: 12,
      owner: dummyUserSimple,
      created_at: new Date('2025-02-01'),
      myRole: 'member',
      play_style: ['캐주얼'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['친목 환영'],
    },
    {
      guild_id: 6,
      guild_name: '크리스탈 광부단',
      description: '자원을 캐며 힐링하는 느긋한 길드입니다.',
      main_game: mainDummyMyGames[1],
      img_src:
        'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 20,
      max_members: 6,
      owner: dummyUserSimple,
      created_at: new Date('2025-01-20'),
      myRole: 'member',
      play_style: ['맛보기'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['친목 환영'],
    },
    {
      guild_id: 7,
      guild_name: '코어의 수호자들',
      description: '보스를 공략하는 전투 중심의 파티입니다.',
      main_game: mainDummyMyGames[1],
      img_src:
        'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 11,
      max_members: 10,
      owner: dummyUserSimple,
      created_at: new Date('2025-03-10'),
      myRole: 'member',
      play_style: ['하드'],
      skill_level: ['프로'],
      gender: [],
      friendly: ['게임 전용'],
    },
    {
      guild_id: 8,
      guild_name: '슬라임 연구소',
      description: '몬스터 도감을 채우며 즐겁게 플레이해요!',
      main_game: mainDummyMyGames[1],
      img_src:
        'https://images.unsplash.com/photo-1563941402830-3bae42b67b38?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      num_members: 8,
      max_members: 10,
      owner: dummyUserSimple,
      created_at: new Date('2025-04-01'),
      myRole: 'admin',
      play_style: ['캐주얼', '맛보기'],
      skill_level: ['뉴비'],
      gender: [],
      friendly: ['친목 환영'],
    },
  ],
];

export const mainDummyPosts: postSimple[] = [
  {
    postId: 5,
    author_nickname: '협동플레이어',
    author_img:
      'https://images.unsplash.com/photo-1588167056547-c183313da47c?q=80&w=2282&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: "친구들과 함께라면 필수! '언레일드(Unrailed!)' 강력 추천합니다",
    content:
      "여러분, 친구들과 함께 즐길 수 있는 협동 게임을 찾고 계신가요? 그렇다면 '언레일드(Unrailed!)'를 꼭 해보세요!\n\n언레일드는 2-4명이 함께 플레이하는 협동 멀티플레이어 게임으로, 기차가 끊임없이 달리는 상황에서 플레이어들이 협력해 앞에 길을 만들어주는 게임입니다. 각자 나무를 자르고, 돌을 캐고, 레일을 만들어 기차가 멈추지 않고 계속 달릴 수 있도록 해야 합니다.",
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2211170/header.jpg',
    num_likes: 53,
    comments_num: 12,
    tag: '게임추천',
  },
  {
    postId: 2,
    author_nickname: '퐁퐁이',
    author_img: 'https://avatars.githubusercontent.com/u/124599?v=4',
    title: '오늘 만난 레전드 파티원 썰',
    content:
      "어제 랜덤 매칭으로 만난 파티원 이야기좀 들어보세요ㅋㅋㅋ 보스전에서 탱커인데 딜러보다 딜량이 높은 괴물이었어요! 그것도 모자라 힐까지 완벽하게 해주시더라구요. 혹시 여기 계신가요? 닉네임은 '불꽃전사'였어요! 다음에도 꼭 같이 하고 싶네요 ㅠㅠ 3시간 동안 한 판도 안 지고 클리어했습니다. 레이드 보스를 너무 쉽게 잡아서 제가 깜짝 놀랐어요!",
    img_src: 'https://example.com/images/party/legendary_player.jpg',
    num_likes: 87,
    comments_num: 23,
    tag: '유머',
  },
  {
    postId: 3,
    author_nickname: '뉴비구조대',
    author_img: '/img/dummy_profile.jpg',
    title: '오픈월드 RPG 추천 부탁드립니다',
    content:
      '안녕하세요! 최근에 오픈월드 RPG 게임을 시작해보려고 하는데 어떤 게임이 좋을지 추천 부탁드립니다. 스카이림은 해봤고, 위쳐3도 해봤어요. 그래픽이 예쁘고 스토리가 탄탄한 게임이면 좋겠어요. 엘든 링은 난이도가 너무 높다고 들어서 망설여지네요. 콘솔과 PC 둘 다 가능합니다. 최근에 나온 게임 중에 괜찮은 게 있을까요?',
    img_src: 'https://example.com/images/games/open_world_rpg.jpg',
    num_likes: 35,
    comments_num: 42,
    tag: '게임추천',
  },
  {
    postId: 4,
    author_nickname: '치킨헌터',
    author_img:
      'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '[파티모집] 주말 PUBG 스쿼드 모집합니다! 진지하게 치킨 먹으실 분들!',
    content:
      '안녕하세요, 배틀그라운드 스쿼드 모집합니다!\n\n이번 주말(4/19~4/20) 저녁 9시부터 새벽 1시까지 진지하게 치킨 먹으실 분들 구합니다. 현재 2명 확정되어 있고, 2명 더 모집 중입니다.\n\n【모집 조건】\n▪️ 게임 시간: 700시간 이상\n▪️ 랭크: 골드 이상 (솔로 또는 스쿼드)\n▪️ 마이크/디스코드 필수 (소통이 중요해요!)\n▪️ 매너 있는 플레이 (팀킬, 독단적 행동 금지)\n▪️ 포지션 무관 (단, 팀 전술에 따라 역할 변경 가능)',
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
    num_likes: 18,
    comments_num: 7,
    tag: '파티모집',
  },
];

export const guildDummyGames: gameSimple[] = [
  {
    title: 'Apex LEGENDS™',
    genre: ['액션', '어드벤쳐'],
    img_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/ss_80e1dc7c52872f2cc1b12b2eae17106cd91b1555.600x338.jpg?t=1741980558',

    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/ss_80e1dc7c52872f2cc1b12b2eae17106cd91b1555.600x338.jpg?t=1741980558',
    appid: 1172470,
  },
  {
    title: 'Unrailed 2: Back on Track',
    genre: ['액션', '캐주얼', '인디', '전략'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2211170/header.jpg',
    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2211170/ss_7f2c923dbd4e54aac2e26723db8a491c43b7160f.600x338.jpg?t=1743085107',
    appid: 2211170,
  },
  {
    title: 'Split Fiction',
    genre: ['액션', '어드벤쳐'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2001120/header.jpg',
    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257116893/b4bbd6dc66f4d060be19939f12fa52593c01b5b8/movie_600x337.jpg?t=1742494046',
    appid: 2001120,
  },
  {
    title: 'PUBG: BATTLEGROUNDS',
    genre: ['액션', '어드벤쳐', '멀티'],
    img_src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
    background_src:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/c16e2f2d122cae77a1cbaca19263df0f2d2214fa/ss_c16e2f2d122cae77a1cbaca19263df0f2d2214fa.600x338.jpg?t=1744161491',
    appid: 578080,
  },
];
