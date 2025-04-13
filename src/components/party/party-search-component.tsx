'use client';

import { partyTags } from '@/types/Tags/partyTags';
import SearchBar from '../common/SearchBar';
import PixelCharacter from '../PixelCharacter/PixelCharacter';
import Chip from '@/components/common/chip';
import { useCallback, useEffect, useState } from 'react';
import { DateTimePicker } from '../ui/date-time-picker';
import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '../common/tilt-toggle';
import { useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';
import { useAuthStore } from '@/stores/authStore';
import GameSearch from '../common/GameSearch';

type PartySearchComponentProps = {
  className: string;
};

export default function PartySearchComponent(props: PartySearchComponentProps) {
  const [searchName, setSearchName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [partyDate, setPartyDate] = useState<Date | undefined>(undefined);
  const partyStyle = useState([true, ...new Array(partyTags.partyStyle.items.length).fill(false)]);
  const skillLevel = useState([true, ...new Array(partyTags.skillLevel.items.length).fill(false)]);
  const gender = useState([true, ...new Array(partyTags.gender.items.length).fill(false)]);
  const friendly = useState([true, ...new Array(partyTags.friendly.items.length).fill(false)]);
  const selectedArr = [partyStyle, skillLevel, gender, friendly];
  const searchParam = useSearchParams();
  const { user } = useAuthStore();
  const [charText, setCharText] = useState('');

  const handleSearchByName = useCallback((value: string) => {
    setSearchName(value);
  }, []);
  const handleChipAdded = useCallback(
    (value: string) => {
      if (selectedGenres.findIndex((e) => e === value) === -1) setSelectedGenres([...selectedGenres, value]);
    },
    [selectedGenres]
  );
  const handleChipDelete = useCallback(
    (content: string) => {
      const index = selectedGenres.findIndex((e) => e === content);
      const temp = [...selectedGenres];
      temp.splice(index, 1);
      setSelectedGenres(temp);
    },
    [selectedGenres]
  );
  const handleDateSelect = useCallback((value: Date | undefined) => {
    setPartyDate(value);
  }, []);

  useEffect(() => {
    const newUrl = new URL(window.location.href);
    if (!partyStyle[0][0]) {
      const PartyStyle = partyStyle[0]
        .slice(1, partyStyle[0].length)
        .map((e, ind) => (e ? partyTags.partyStyle.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('partyStyle', PartyStyle.join(','));
    } else {
      newUrl.searchParams.delete('partyStyle');
    }
    if (!skillLevel[0][0]) {
      const SkillLevel = skillLevel[0]
        .slice(1, skillLevel[0].length)
        .map((e, ind) => (e ? partyTags.skillLevel.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('skillLevel', SkillLevel.join(','));
    } else {
      newUrl.searchParams.delete('skillLevel');
    }
    if (!gender[0][0]) {
      const Gender = gender[0]
        .slice(1, gender[0].length)
        .map((e, ind) => (e ? partyTags.gender.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('gender', Gender.join(','));
    } else {
      newUrl.searchParams.delete('gender');
    }

    if (!friendly[0][0]) {
      const Friendly = friendly[0]
        .slice(1, friendly[0].length)
        .map((e, ind) => (e ? partyTags.friendly.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('friendly', Friendly.join(','));
    } else {
      newUrl.searchParams.delete('friendly');
    }
    // router.replace(newUrl.toString(), { scroll: false });
    window.history.pushState({}, '', newUrl);
  }, [partyStyle, skillLevel, gender, friendly]);
  useEffect(() => {
    if (partyDate) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('partyDate', formatISO(partyDate.toString()));
      // router.replace(newUrl.toString(), { scroll: false });
      window.history.pushState({}, '', newUrl);
    }
  }, [partyDate]);
  useEffect(() => {
    const newUrl = new URL(window.location.href);
    const newGenres = selectedGenres.join(',');
    if (newGenres.length > 0) {
      newUrl.searchParams.set('genres', newGenres);
      // router.replace(newUrl.toString(), { scroll: false });
    } else {
      newUrl.searchParams.delete('genres');
    }
    window.history.pushState({}, '', newUrl);
  }, [selectedGenres]);
  useEffect(() => {
    const newUrl = new URL(window.location.href);
    if (searchName.toString().length > 0) {
      newUrl.searchParams.set('appId', searchName);
      // router.replace(newUrl.toString(), { scroll: false });
      window.history.pushState({}, '', newUrl);
    }
    if (searchName.toString().length === 0) {
      newUrl.searchParams.delete('appId');
      window.history.pushState({}, '', newUrl);
    }
  }, [searchName]);

  useEffect(() => {
    const newCharText: string[] = [];
    const PartyStyle = searchParam.get('partyStyle');
    const Gender = searchParam.get('gender');
    const SkillLevel = searchParam.get('skillLevel');
    const Friendly = searchParam.get('friendly');
    if (Gender) newCharText.push(Gender.slice(0, -1) + '와 함께하고 싶은');
    if (PartyStyle) newCharText.push(PartyStyle + ' 스타일의');
    if (Friendly) newCharText.push(Friendly + ' ');
    if (SkillLevel) newCharText.push(SkillLevel + ' ');

    setCharText(newCharText.join(' ') + ' ');
  }, [friendly, partyStyle, skillLevel, searchParam]);

  useEffect(() => {
    const PartyDate = searchParam.get('partyDate');
    if (PartyDate) {
      console.log(new Date(PartyDate));
      setPartyDate(new Date(PartyDate));
    }

    const PartyStyle = searchParam.get('partyStyle');
    if (PartyStyle && PartyStyle !== '전체') {
      const temp = PartyStyle.split(',');
      partyStyle[1]([false, ...partyTags.partyStyle.items.map((e) => temp.includes(e))]);
    }
    const SkillLevel = searchParam.get('skillLevel');
    if (SkillLevel && SkillLevel !== '전체') {
      const temp = SkillLevel.split(',');
      skillLevel[1]([false, ...partyTags.skillLevel.items.map((e) => temp.includes(e))]);
    }
    const Gender = searchParam.get('gender');
    if (Gender && Gender !== '전체') {
      const temp = Gender.split(',');
      gender[1]([false, ...partyTags.gender.items.map((e) => temp.includes(e))]);
    }
    const Friendly = searchParam.get('friendly');
    if (Friendly && Friendly !== '전체') {
      const temp = Friendly.split(',');
      friendly[1]([false, ...partyTags.friendly.items.map((e) => temp.includes(e))]);
    }

    const Genres = searchParam.get('genres');
    if (Genres) {
      const temp = Genres.split(',');
      setSelectedGenres(temp);
    }

    const SearchName = searchParam.get('appId');
    if (SearchName) {
      setSearchName(SearchName);
    }
  }, []);

  return (
    <div className={`flex rounded-xl py-8 px-9 bg-neutral-50 gap-14 ${props.className}`}>
      <div className="flex flex-col w-[774px] gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col w-[40%] gap-2">
            <p>파티 일정</p>
            <DateTimePicker onSelect={handleDateSelect} init={partyDate} />
          </div>
          <div className="flex flex-col w-[60%] gap-2">
            <p>게임 이름</p>
            <GameSearch
              onSelect={(e) => {
                handleSearchByName(e.appid);
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col w-full gap-2">
            <p>게임 장르 태그</p>
            <SearchBar onChange={() => {}} onSearch={handleChipAdded} />
            <div className="flex gap-2 h-6">
              {selectedGenres.map((e, ind) => (
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
          <span className="font-dgm text-neutral-900 text-center">{`${user ? '게이머 ' + user : '익명의 게이머'}님을 위한 파티를 찾아왔어요.`}</span>
        </p>
      </div>
    </div>
  );
}
