'use client';

import { guildTags } from '@/types/Tags/guildTags';
import SearchBar from '../common/SearchBar';
import PixelCharacter from '../PixelCharacter/PixelCharacter';
import Chip from '@/components/common/chip';
import { useCallback, useEffect, useRef, useState } from 'react';
import CategoryMenu from '../common/category-menu';
import { useRouter, useSearchParams } from 'next/navigation';

type GuildSearchComponentProps = {
  className: string;
};

export default function GuildSearchComponent(props: GuildSearchComponentProps) {
  const router = useRouter();
  const searchQuery = useSearchParams();

  const selectedGames = useRef<string[]>([]);
  const searchByName = useRef<string>('');

  const guildTagCategory = Object.keys(guildTags);
  const guildTagData = Object.values(guildTags);
  const initialSelectedTags = guildTagData.map((e) => {
    return { name: e.name, tags: ['전체'] };
  });
  const selectedTags = useRef(initialSelectedTags);

  const [charText, setCharText] = useState('');

  // handlers
  const handleSearchByName = useCallback((value: string) => {
    searchByName.current = value;
    accInputs();
  }, []);
  const handleChipAdded = useCallback((value: string) => {
    if (selectedGames.current.findIndex((e) => e === value) !== -1) return;
    selectedGames.current.push(value);
    accInputs();
  }, []);
  const handleChipDelete = useCallback((content: string) => {
    const index = selectedGames.current.findIndex((e) => e === content);
    if (index === -1) return;
    selectedGames.current.splice(index, 1);
    accInputs();
  }, []);
  const handleSelectedChanged = useCallback((newSelected: boolean[], categoryName: string) => {
    const index = selectedTags.current.findIndex((e) => e.name === categoryName);
    if (newSelected[0]) {
      selectedTags.current[index].tags = ['전체'];
    } else {
      const newTagArr = newSelected
        .slice(1, newSelected.length)
        .map((e, ind) => (e ? guildTagData[index].items[ind] : null))
        .filter((e) => e !== null);
      selectedTags.current[index].tags = newTagArr;
    }
    accInputs();
  }, []);
  function accInputs() {
    const newSearchQuery = [];
    if (searchByName.current !== '') {
      newSearchQuery.push(`name=${searchByName.current}`);
    }
    for (let i = 0; i < selectedTags.current.length; i++) {
      if (selectedTags.current[i].tags[0] === '전체') continue;
      newSearchQuery.push(
        `${guildTagCategory[i]}=${selectedTags.current[i].tags.reduce((acc, cur) => acc + ',' + cur)}`
      );
    }
    if (selectedGames.current.length > 0) {
      newSearchQuery.push('games=' + selectedGames.current.reduce((acc, cur) => acc + ',' + cur));
    }
    router.push(`/?${newSearchQuery.join('&')}`, { scroll: false });
  }

  useEffect(() => {
    const newCharText: string[] = [];
    const partyStyle = searchQuery.get('partyStyle');
    const skillLevel = searchQuery.get('skillLevel');
    const friendly = searchQuery.get('friendly');
    if (partyStyle) newCharText.push(partyStyle + ' 스타일의');
    if (friendly) newCharText.push(friendly + ' ');
    if (skillLevel) newCharText.push(skillLevel);

    setCharText(newCharText.join(' ') + ' ');
  }, [searchQuery]);

  return (
    <div className={`flex rounded-xl py-8 px-9 bg-neutral-50 gap-14 ${props.className}`}>
      <div className="flex flex-col w-[774px] gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-2">
            <p>길드 이름</p>
            <SearchBar onChange={() => {}} onSearch={handleSearchByName} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p>길드 메인 게임</p>
            <SearchBar onChange={() => {}} onSearch={handleChipAdded} />
            <div className="flex gap-2 h-6">
              {selectedGames.current.map((e, ind) => (
                <Chip content={e} onClickDelete={(content) => handleChipDelete(content)} key={ind} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {Object.values(guildTags).map((e) => (
            <div className="flex items-center gap-5" key={`${e.name}`}>
              <p className="w-[118px] font-dgm text-neutral-900">{e.name}</p>
              <CategoryMenu categoryItems={[...e.items]} categoryName={e.name} onSelect={handleSelectedChanged} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center bg-neutral-200 rounded-2xl px-8 pt-14 pb-8 gap-12 w-[374px]">
        <div className="flex justify-center scale-x-[-1]">
          <PixelCharacter char="mage" motion="run" />
        </div>
        <p className="p-5 border border-neutral-400 rounded-2xl">
          {charText && <span className="font-dgm text-neutral-900 text-center">{charText}</span>}
          <span className="font-dgm text-neutral-900 text-center">게이머 홍길동님을 위한 길드를 찾아왔어요.</span>
        </p>
      </div>
    </div>
  );
}
