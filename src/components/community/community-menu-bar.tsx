'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import RetroButton from '../common/RetroButton';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import { communityTags } from '@/types/Tags/communityTags';
import { PATH } from '@/constants/routes';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '../common/SearchBar';

type CommunityMenuBarProps = {
  className: string;
};

export default function CommunityMenuBar(props: CommunityMenuBarProps) {
  const router = useRouter();
  const params = useParams();
  // const [category, setCategory] = useState('');

  const HandleSearchClick = useCallback(
    (value: string) => {
      if (!params.postId) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('keyword', value);
        router.replace(newUrl.toString());
      } else {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('keyword', value);
        router.replace(`${PATH.community}?keyword=${value}`);
      }
    },
    [router]
  );

  const handleClickReset = useCallback(() => {
    router.replace(PATH.community);
  }, [router]);
  return (
    <div className={`flex flex-col rounded-xl shadow-md p-8 gap-9 w-[360px] ${props.className}`}>
      <p className="font-dgm text-4xl ">커뮤니티</p>
      <div className="grid grid-cols-2">
        {communityTags.map((e, ind) => (
          <div key={ind}>
            <TagSelectGridItem label={e} onSelect={(value) => router.replace(`${PATH.community}?category=${value}`)} />
          </div>
        ))}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 347 2" fill="none">
        <path d="M0 1H347" stroke="#E5E5E5" />
      </svg>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div
            className="flex gap-1 items-center self-end text-sm text-neutral-400 hover:text-purple-600 cursor-pointer"
            onClick={handleClickReset}
          >
            <RefreshCcw className=" size-3" />
            초기화
          </div>
          <SearchBar onChange={() => {}} onSearch={(value) => HandleSearchClick(value)} />
        </div>
        <Link href={PATH.community_create}>
          <RetroButton
            type="purple"
            callback={() => {}}
            className="font-suit text-lg text-white font-semibold w-full h-11"
          >
            글쓰기
          </RetroButton>
        </Link>
      </div>
    </div>
  );
}

function TagSelectGridItem(props: { label: string; onSelect: (value: string) => void }) {
  const params = useParams();
  // console.log('isDetail', params.postId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSelected, setIsSelected] = useState(searchParams.get('category') === props.label || false);

  const handleClick = () => {
    if (!params.postId) {
      setIsSelected((prev) => !prev);
      const newUrl = new URL(window.location.href);
      if (!isSelected === true) {
        newUrl.searchParams.set('category', props.label);
      } else {
        newUrl.searchParams.delete('category');
      }
      router.replace(newUrl.toString());
    } else {
      setIsSelected((prev) => !prev);
      if (!isSelected === true) {
        props.onSelect(props.label);
        console.log('isSelected', props.label);
      }
    }
  };

  useEffect(() => {
    setIsSelected(searchParams.get('category') === props.label);
  }, [searchParams]);

  return (
    <div
      className={`flex rounded-lg p-2 cursor-pointer transition-all overflow-hidden ${isSelected ? 'bg-neutral-100 -translate-x-4' : '-translate-x-8'}`}
      onClick={handleClick}
    >
      <ChevronRight className={`transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
      <p className="font-suit font-semibold">{props.label}</p>
    </div>
  );
}
