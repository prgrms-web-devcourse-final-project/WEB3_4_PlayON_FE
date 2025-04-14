'use client';

import { useCallback, useState } from 'react';
import RetroButton from '../common/RetroButton';
import { ChevronRight } from 'lucide-react';
import { communityTags } from '@/types/Tags/communityTags';
import { PATH } from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '../common/SearchBar';

type CommunityMenuBarProps = {
  className: string;
};

export default function CommunityMenuBar(props: CommunityMenuBarProps) {
  const router = useRouter();

  const HandleSearchClick = useCallback(
    (value: string) => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('keyword', value);
      router.replace(newUrl.toString());
    },
    [router]
  );
  const HandleSelectChange = useCallback(
    (newSelected: boolean[]) => {
      const newUrl = new URL(window.location.href);
      if (!newSelected.includes(true)) {
        newUrl.searchParams.delete('category');
      } else {
        const tag = newSelected.map((e, ind) => (e ? communityTags[ind] : null)).filter((e) => e);
        newUrl.searchParams.set('category', tag[0]!);
      }
      router.replace(newUrl.toString());
    },
    [router]
  );
  return (
    <div className={`flex flex-col rounded-xl shadow-md p-8 gap-9 ${props.className}`}>
      <p className="font-dgm text-4xl ">커뮤니티</p>
      <TagSelectGridMenu onSelectChanged={HandleSelectChange} />
      <svg xmlns="http://www.w3.org/2000/svg" width="347" height="2" viewBox="0 0 347 2" fill="none">
        <path d="M0 1H347" stroke="#E5E5E5" />
      </svg>
      <div className="flex flex-col gap-10">
        <SearchBar onChange={() => {}} onSearch={(value) => HandleSearchClick(value)} />
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

function TagSelectGridItem(props: { label: string; selected: boolean }) {
  // console.log('label: ', props.label, 'selected: ', props.selected);
  return (
    <div
      className={`flex rounded-lg p-2 cursor-pointer transition-all overflow-hidden ${props.selected ? 'bg-neutral-100 -translate-x-4' : '-translate-x-8'}`}
    >
      <ChevronRight className={`transition-opacity ${props.selected ? 'opacity-100' : 'opacity-0'}`} />
      <p className="font-suit font-semibold">{props.label}</p>
    </div>
  );
}

function TagSelectGridMenu(props: { onSelectChanged: (select: boolean[]) => void }) {
  const [selected, setSelected] = useState<boolean[]>(new Array(communityTags.length).fill(false));
  function HandleSelected(index: number) {
    const newSelected = new Array(communityTags.length).fill(false);
    newSelected[index] = !selected[index];
    // console.log('newSelected', newSelected);
    setSelected(newSelected);
    props.onSelectChanged(newSelected);
  }
  return (
    <div className="grid grid-cols-2">
      {communityTags.map((e, ind) => (
        <div onClick={() => HandleSelected(ind)} key={e}>
          <TagSelectGridItem label={e} selected={selected[ind]} />
        </div>
      ))}
    </div>
  );
}
