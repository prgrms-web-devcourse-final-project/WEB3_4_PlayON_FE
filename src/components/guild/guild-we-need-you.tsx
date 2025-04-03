'use client';

import guild from '@/types/guild';
import RetroButton from '../common/RetroButton';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import CapsuleCategoryMenu from '@/components/common/capsule-category-menu';
import { useState } from 'react';
import UserInfo from '@/app/party/components/UserInfoHorizontal';
import User from '@/types/user';
import Tag from '../common/Tag';

type WeNeedYouProps = {
  guildData: guild;
  className?: string;
};

export default function WeNeedYou(props: WeNeedYouProps) {
  const [query, setQuery] = useState('');

  function HandleSearchClick() {
    console.log(query);
    setQuery('');
  }

  const user: User = {
    profile_img: 'https://avatars.githubusercontent.com/u/124599?v=4',
    title: '배신자',
    username: 'Morty',
  };

  return (
    <div className={`flex flex-col p-8 gap-9 rounded-xl border border-neutral-200 bg-white ${props.className} `}>
      <div className="flex flex-col gap-5 ">
        <Tag size="small" style="default" background="medium" className="w-12 font-suit font-bold">
          길드장
        </Tag>
        <UserInfo size="small" data={user} />
        <p className="font-dgm line-clamp-1 text-ellipsis overflow-hidden text-neutral-900 text-4xl">
          {props.guildData.name}
        </p>
        <p className="font-suit line-clamp-2 text-ellipsis overflow-hidden text-neutral-900">
          {props.guildData.description}
        </p>
        <div className="flex gap-3">
          <p className="font-suit text-neutral-900">전체 인원</p>
          <p className="font-suit font-bold text-neutral-900">{props.guildData.numMembers}명</p>
        </div>
      </div>
      <RetroButton
        type="purple"
        callback={() => console.log('!')}
        className="font-suit text-lg text-white font-semibold w-full h-11"
      >
        글쓰기
      </RetroButton>
      <svg xmlns="http://www.w3.org/2000/svg" width="347" height="2" viewBox="0 0 347 2" fill="none">
        <path d="M0 1H347" stroke="#E5E5E5" />
      </svg>
      <div className="flex rounded-lg gap-2 text-neutral-400 border border-neutral-300 items-center p-2">
        <Input
          placeholder="게시글 제목으로 검색하세요"
          className="border-none text-sm h-5 focus-visible:ring-transparent shadow-none"
        />
        <SearchIcon className="text-neutral-400 cursor-pointer" onClick={HandleSearchClick} />
      </div>
      <CapsuleCategoryMenu items={['공지', '자유', '게임 관련']} multiple={true} />
    </div>
  );
}

// USAGE
// import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
// import WeNeedYou from '@/components/guild/guild-we-need-you';
// import guild from '@/types/guild';

// export default function Home() {
//   const guildData: guild = {
//     name: '길드명 길드명 길드명',
//     description:
//       '길드소개 두 줄 까지 Lorem ipsum dolor sit amet consectetur. Interdum bibendum etiam rutrum lacus ut volutpat.',
//     guildTags: ['Guild', 'Tags'],
//     image: '',
//     numMembers: 24,
//   };

//   return (
//     <div>
//       <p className=" text-center text-5xl p-5">Play ON!</p>
//       <WeNeedYou guildData={guildData} className="w-[411px] ml-5" />
//     </div>
//   );
// }
