'use client';

import { guild } from '@/types/guild';
import RetroButton from '../common/RetroButton';
import CapsuleCategoryMenu from '@/components/common/capsule-category-menu';
import { useCallback, useState } from 'react';
import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import Tag from '../common/Tag';
import { communityTags, guildCommunityTags } from '@/types/Tags/communityTags';
import SearchBar from '../common/SearchBar';
import Link from 'next/link';
import { GUILD_ROUTE } from '@/constants/routes/guild';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

type WeNeedYouProps = {
  guildData: guild;
  className?: string;
};

export default function WeNeedYou(props: WeNeedYouProps) {
  const [query, setQuery] = useState('');
  const params = useParams();
  const guildId = params.guildid[0] ?? null;
  const router = useRouter();

  const HandleSearchClick = useCallback(
    (value: string) => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('search', value);
      router.replace(newUrl.toString());
    },
    [router]
  );
  const HandleSelectChange = useCallback(
    (newSelected: boolean[]) => {
      const newUrl = new URL(window.location.href);
      //guildCommunityTags
      if (newSelected[0]) {
        newUrl.searchParams.set('tag', '전체');
      } else {
        const tags = newSelected
          .slice(1, newSelected.length)
          .map((e, ind) => (e ? guildCommunityTags[ind] : null))
          .filter((e) => e);
        newUrl.searchParams.set('tag', tags.join(','));
      }
      router.replace(newUrl.toString());
    },
    [router]
  );

  return (
    <div className={`flex flex-col p-8 gap-9 rounded-xl border border-neutral-200 bg-white ${props.className} `}>
      <div className="flex flex-col gap-5 ">
        <Tag size="small" style="default" background="medium" className="w-12 font-suit font-bold">
          길드장
        </Tag>
        <UserInfoHorizontal size="small" data={props.guildData.owner} />
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
      <Link href={guildId ? GUILD_ROUTE.guild_community_create(guildId) : GUILD_ROUTE.guild}>
        <RetroButton
          type="purple"
          callback={() => {}}
          className="font-suit text-lg text-white font-semibold w-full h-11"
        >
          글쓰기
        </RetroButton>
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" width="347" height="2" viewBox="0 0 347 2" fill="none">
        <path d="M0 1H347" stroke="#E5E5E5" />
      </svg>
      <SearchBar onChange={() => {}} onSearch={(value) => HandleSearchClick(value)} />
      <CapsuleCategoryMenu items={[...guildCommunityTags]} multiple={true} onSelectChange={HandleSelectChange} />
    </div>
  );
}
