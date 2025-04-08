'use client';

import { partyTags } from '@/types/Tags/partyTags';
import SearchBar from '../common/SearchBar';
import PixelCharacter from '../PixelCharacter/PixelCharacter';
import Chip from '@/components/common/chip';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { DateTimePicker } from '../ui/date-time-picker';
import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '../common/tilt-toggle';

type PartySearchComponentProps = {
  className: string;
};

export default function PartySearchComponent(props: PartySearchComponentProps) {
  const searchQuery = useSearchParams();
  const pathname = usePathname();

  const selectedGenres = useRef<string[]>([]);
  const searchByName = useRef<string>('');
  const partyDate = useRef<Date | undefined>(undefined);

  const selected = {
    partyStyle: useState([true, ...new Array(partyTags.partyStyle.items.length).fill(false)]),
    skillLevel: useState([true, ...new Array(partyTags.skillLevel.items.length).fill(false)]),
    gender: useState([true, ...new Array(partyTags.gender.items.length).fill(false)]),
    friendly: useState([true, ...new Array(partyTags.friendly.items.length).fill(false)]),
  };
  const selectedArr = Object.values(selected);
  const [charText, setCharText] = useState('');

  // handlers
  const handleSearchByName = useCallback((value: string) => {
    searchByName.current = value;
    accInputs();
  }, []);
  const handleChipAdded = useCallback((value: string) => {
    if (selectedGenres.current.findIndex((e) => e === value) !== -1) return;
    selectedGenres.current.push(value);
    accInputs();
  }, []);
  const handleChipDelete = useCallback((content: string) => {
    const index = selectedGenres.current.findIndex((e) => e === content);
    if (index === -1) return;
    selectedGenres.current.splice(index, 1);
    accInputs();
  }, []);
  const handleDateSelect = useCallback((date: Date | undefined) => {
    partyDate.current = date;
    accInputs();
  }, []);
  function accInputs() {
    const newSearchQuery = [];
    if (searchByName.current !== '') {
      newSearchQuery.push(`name=${searchByName.current}`);
    }
    for (let i = 0; i < selectedArr.length; i++) {
      const selectedState = selectedArr[i][0];
      const guildTagNames = Object.keys(partyTags);
      const guildTagItems = Object.values(partyTags).map((e) => e.items);

      if (selectedState[0]) {
        //do nothing
      } else if (selectedState.slice(1, selectedState.length).filter((e) => e).length > 0) {
        const temp = guildTagItems[i]
          .map((e, ind) => (selectedState[ind + 1] ? e : null))
          .filter((e) => e)
          .join(',');
        newSearchQuery.push(`${guildTagNames[i]}=${temp}`);
      }
    }
    if (selectedGenres.current.length > 0) {
      newSearchQuery.push('genres=' + selectedGenres.current.reduce((acc, cur) => acc + ',' + cur));
    }
    if (partyDate.current) {
      const dateString = partyDate.current.toLocaleString();
      newSearchQuery.push(`partyDate=${dateString}`);
    }
    window.history.pushState(null, '', `${pathname}?${newSearchQuery.join('&')}`);
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
  useEffect(() => {
    accInputs();
  }, [selected.partyStyle, selected.skillLevel, selected.gender, selected.friendly]);
  useEffect(() => {
    const partyStyle = searchQuery.get('partyStyle');
    const skillLevel = searchQuery.get('skillLevel');
    const friendly = searchQuery.get('friendly');
    const gender = searchQuery.get('gender');
    // console.log('partyStyle : ', partyStyle);
    // console.log('skillLevel : ', skillLevel);
    // console.log('friendly : ', friendly);
    // console.log('gender : ', gender);
    if (partyStyle) {
      const arr = partyStyle.split(',');
      const temp = [false];
      for (let i = 0; i < partyTags.partyStyle.items.length; i++) {
        temp.push(arr.findIndex((e) => e === partyTags.partyStyle.items[i]) !== -1);
      }
      selected.partyStyle[1](temp);
    }
    if (skillLevel) {
      const arr = skillLevel.split(',');
      const temp = [false];
      for (let i = 0; i < partyTags.skillLevel.items.length; i++) {
        temp.push(arr.findIndex((e) => e === partyTags.skillLevel.items[i]) !== -1);
      }
      selected.skillLevel[1](temp);
    }
    if (gender) {
      const arr = gender.split(',');
      const temp = [false];
      for (let i = 0; i < partyTags.gender.items.length; i++) {
        temp.push(arr.findIndex((e) => e === partyTags.gender.items[i]) !== -1);
      }
      selected.gender[1](temp);
    }
    if (friendly) {
      const arr = friendly.split(',');
      const temp = [false];
      for (let i = 0; i < partyTags.friendly.items.length; i++) {
        temp.push(arr.findIndex((e) => e === partyTags.friendly.items[i]) !== -1);
      }
      selected.friendly[1](temp);
    }
  }, []);

  return (
    <div className={`flex rounded-xl py-8 px-9 bg-neutral-50 gap-14 ${props.className}`}>
      <div className="flex flex-col w-[774px] gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col w-[40%] gap-2">
            <p>파티 일정</p>
            <DateTimePicker onSelect={handleDateSelect} />
          </div>
          <div className="flex flex-col w-[60%] gap-2">
            <p>게임 이름</p>
            <SearchBar onChange={() => {}} onSearch={handleSearchByName} />
          </div>
        </div>
        <div>
          <div className="flex flex-col w-full gap-2">
            <p>게임 장르 태그</p>
            <SearchBar onChange={() => {}} onSearch={handleChipAdded} />
            <div className="flex gap-2 h-6">
              {selectedGenres.current.map((e, ind) => (
                <Chip content={e} onClickDelete={(content) => handleChipDelete(content)} key={ind} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {Object.values(partyTags).map((category, cat_ind) => (
            <div className="flex items-center gap-5" key={`${category.name}`}>
              <p className="w-[118px] font-dgm text-neutral-900">{category.name}</p>
              <CoolerCategoryMenu
                state={selectedArr[cat_ind][0]}
                setState={selectedArr[cat_ind][1]}
                className="flex gap-2"
                type="multiple"
                enableAll
              >
                {['전체', ...category.items].map((item, item_ind) => (
                  <TiltToggle
                    label={item}
                    toggle={selectedArr[cat_ind][0][item_ind]}
                    key={`${category.name}_${item}`}
                  />
                ))}
              </CoolerCategoryMenu>
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
          <span className="font-dgm text-neutral-900 text-center">게이머 홍길동님을 위한 파티를 찾아왔어요.</span>
        </p>
      </div>
    </div>
  );
}
