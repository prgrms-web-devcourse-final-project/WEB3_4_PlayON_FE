'use client';

import { guild } from '@/types/guild';
import RetroButton from '../common/RetroButton';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import CapsuleCategoryMenu from '@/components/common/capsule-category-menu';
import { useState } from 'react';
import UserInfo from '@/app/party/components/UserInfoHorizontal';
import Tag from '../common/Tag';
import { guildCommunityTags } from '@/types/Tags/communityTags';

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

  return (
    <div className={`flex flex-col p-8 gap-9 rounded-xl border border-neutral-200 bg-white ${props.className} `}>
      <div className="flex flex-col gap-5 ">
        <Tag size="small" style="default" background="medium" className="w-12 font-suit font-bold">
          길드장
        </Tag>
        <UserInfo size="small" data={props.guildData.owner} />
        <p className="font-dgm line-clamp-1 text-ellipsis overflow-hidden text-neutral-900 text-4xl">
          {props.guildData.guild_name}
        </p>
        <p className="font-suit line-clamp-2 text-ellipsis overflow-hidden text-neutral-900">
          {props.guildData.description}
        </p>
        <div className="flex gap-3">
          <p className="font-suit text-neutral-900">전체 인원</p>
          <p className="font-suit font-bold text-neutral-900">{props.guildData.num_members}명</p>
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
      <CapsuleCategoryMenu items={[...guildCommunityTags]} multiple={true} />
    </div>
  );
}
