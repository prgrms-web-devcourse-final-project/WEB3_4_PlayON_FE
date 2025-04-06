import { loremIpsum } from '@/utils/loremIpsum';
import { post } from '@/types/community';
import { guild, guildUser } from '@/types/guild';
import { userDetail, userSimple } from '@/types/user';
import { gameDetail, gameSimple } from '@/types/games';
import { party, partyLog } from '@/types/party';

export const dummyUserSimple: userSimple = {
  img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
  nickname: 'Morty',
  user_title: 'AdventureTime!',
  username: 'morty1234@gmail.com',
};
export const dummyUserDetail: userDetail = {
  img_src: 'https://avatars.githubusercontent.com/u/124599?v=4',
  last_login_at: new Date(),
  nickname: 'Morty',
  gender: '남자',
  party_style: ['노멀', '도전과제', '맛보기'],
  friendly: '게임 전용',
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
};

export const dummyGuildUser: guildUser = {
  user: dummyUserDetail,
  guild_role: 'manager', // 'leader', 'manager', 'user'
  joined_at: new Date(),
  num_guild_posts: 17,
}

export const dummyParty: party = {
  party_name: '파티이름입니다.',
  description: '설명입니다.설명입니다.설명입니다. 설명입니다. 설명입니다. 설명입니다. 설명입니다.',
  start_time: new Date(),
  tags: ['맛보기', '뉴비'],
  participation: [dummyUserSimple],
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
  ],
  review: [
    {
      author: dummyUserSimple,
      text: '멋져요',
    },
  ],
};
