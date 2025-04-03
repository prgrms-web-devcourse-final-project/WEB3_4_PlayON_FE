'use client';

import { useState } from 'react';
import RetroButton from '../common/RetroButton';
import { ChevronRight, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { communityTags } from '@/types/communityTags';

type CommunityMenuBarProps = {
  className: string;
};

export default function CommunityMenuBar(props: CommunityMenuBarProps) {
  const [query, setQuery] = useState('');

  function HandleSearchClick() {
    console.log(query);
    setQuery('');
  }
  function onSelectChanged(select: boolean[]) {
    console.log(select);
  }
  function TagSelectGridItem(props: { label: string; selected: boolean }) {
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
      setSelected(newSelected);
      props.onSelectChanged(newSelected);
    }
    return (
      <div className="grid grid-cols-2">
        {communityTags.map((e, ind) => (
          <div onClick={() => HandleSelected(ind)} key={e.id}>
            <TagSelectGridItem label={e.name} selected={selected[ind]} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`flex flex-col rounded-xl shadow-md p-8 gap-9 ${props.className}`}>
      <p className="font-dgm text-4xl ">커뮤니티</p>
      <TagSelectGridMenu onSelectChanged={onSelectChanged} />
      <svg xmlns="http://www.w3.org/2000/svg" width="347" height="2" viewBox="0 0 347 2" fill="none">
        <path d="M0 1H347" stroke="#E5E5E5" />
      </svg>
      <div className="flex flex-col gap-3">
        <div className="flex rounded-lg gap-2 text-neutral-400 border border-neutral-300 items-center p-2">
          <Input
            placeholder="게시글 제목으로 검색하세요"
            className="border-none text-sm h-5 focus-visible:ring-transparent shadow-none"
          />
          <SearchIcon className="text-neutral-400 cursor-pointer" onClick={HandleSearchClick} />
        </div>
        <RetroButton
          type="purple"
          callback={() => console.log('!')}
          className="font-suit text-lg text-white font-semibold w-full h-11"
        >
          글쓰기
        </RetroButton>
      </div>
    </div>
  );
}
