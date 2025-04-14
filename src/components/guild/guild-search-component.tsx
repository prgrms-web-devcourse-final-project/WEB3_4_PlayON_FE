'use client';

import { guildTags } from '@/types/Tags/guildTags';
import SearchBar from '../common/SearchBar';
import PixelCharacter from '../PixelCharacter/PixelCharacter';
// import Chip from '@/components/common/chip';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '../common/tilt-toggle';
import GameSearch from '../common/GameSearch';

type GuildSearchComponentProps = {
  className: string;
};

export default function GuildSearchComponent(props: GuildSearchComponentProps) {
  const searchParam = useSearchParams();

  // const [searchName, setSearchName] = useState('');
  const [selectedGames, setSelectedGames] = useState('');
  const [searchByName, setSearchByName] = useState<string>('');
  const partyStyle = useState([true, ...new Array(guildTags.partyStyle.items.length).fill(false)]);
  const skillLevel = useState([true, ...new Array(guildTags.skillLevel.items.length).fill(false)]);
  const gender = useState([true, ...new Array(guildTags.gender.items.length).fill(false)]);
  const friendly = useState([true, ...new Array(guildTags.friendly.items.length).fill(false)]);
  const selectedArr = [partyStyle, skillLevel, gender, friendly];
  const [charText, setCharText] = useState('');

  const handleSearchByName = useCallback((value: string) => {
    setSearchByName(value);
  }, []);
  const handleSearchName = useCallback((value: string) => {
    setSelectedGames(value);
  }, []);
  // const handleChipAdded = useCallback(
  //   (value: string) => {
  //     if (selectedGames.findIndex((e) => e === value) === -1) setSelectedGames([...selectedGames, value]);
  //   },
  //   [selectedGames]
  // );
  // const handleChipDelete = useCallback(
  //   (content: string) => {
  //     const index = selectedGames.findIndex((e) => e === content);
  //     const temp = [...selectedGames];
  //     temp.splice(index, 1);
  //     setSelectedGames(temp);
  //   },
  //   [selectedGames]
  // );

  useEffect(() => {
    const newUrl = new URL(window.location.href);
    if (!partyStyle[0][0]) {
      const PartyStyle = partyStyle[0]
        .slice(1, partyStyle[0].length)
        .map((e, ind) => (e ? guildTags.partyStyle.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('partyStyle', PartyStyle.join(','));
    } else {
      newUrl.searchParams.delete('partyStyle');
    }
    if (!skillLevel[0][0]) {
      const SkillLevel = skillLevel[0]
        .slice(1, skillLevel[0].length)
        .map((e, ind) => (e ? guildTags.skillLevel.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('skillLevel', SkillLevel.join(','));
    } else {
      newUrl.searchParams.delete('skillLevel');
    }
    if (!gender[0][0]) {
      const Gender = gender[0]
        .slice(1, gender[0].length)
        .map((e, ind) => (e ? guildTags.gender.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('gender', Gender.join(','));
    } else {
      newUrl.searchParams.delete('gender');
    }

    if (!friendly[0][0]) {
      const Friendly = friendly[0]
        .slice(1, friendly[0].length)
        .map((e, ind) => (e ? guildTags.friendly.items[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('friendly', Friendly.join(','));
    } else {
      newUrl.searchParams.delete('friendly');
    }
    // router.replace(newUrl.toString(), { scroll: false });
    window.history.pushState({}, '', newUrl);
  }, [partyStyle, skillLevel, gender, friendly]);
  // useEffect(() => {
  //   const newUrl = new URL(window.location.href);
  //   const newGenres = selectedGames.join(',');
  //   if (newGenres.length > 0) {
  //     newUrl.searchParams.set('genres', newGenres);
  //     // router.replace(newUrl.toString(), { scroll: false });
  //   } else {
  //     newUrl.searchParams.delete('genres');
  //   }
  //   window.history.pushState({}, '', newUrl);
  // }, [selectedGames]);

  useEffect(() => {
    const newUrl = new URL(window.location.href);
    if (selectedGames.toString().length > 0) {
      newUrl.searchParams.set('appId', selectedGames);
      // router.replace(newUrl.toString(), { scroll: false });
      window.history.pushState({}, '', newUrl);
    }
    if (selectedGames.toString().length === 0) {
      newUrl.searchParams.delete('appId');
      window.history.pushState({}, '', newUrl);
    }
  }, [selectedGames]);

  useEffect(() => {
    const newUrl = new URL(window.location.href);
    if (searchByName.length > 0) {
      newUrl.searchParams.set('name', searchByName);
      // router.replace(newUrl.toString(), { scroll: false });
      window.history.pushState({}, '', newUrl);
    }
    if (searchByName.length === 0) {
      newUrl.searchParams.delete('name');
      window.history.pushState({}, '', newUrl);
    }
  }, [searchByName]);

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
    const PartyStyle = searchParam.get('partyStyle');
    if (PartyStyle && PartyStyle !== '전체') {
      const temp = PartyStyle.split(',');
      partyStyle[1]([false, ...guildTags.partyStyle.items.map((e) => temp.includes(e))]);
    }
    const SkillLevel = searchParam.get('skillLevel');
    if (SkillLevel && SkillLevel !== '전체') {
      const temp = SkillLevel.split(',');
      skillLevel[1]([false, ...guildTags.skillLevel.items.map((e) => temp.includes(e))]);
    }
    const Gender = searchParam.get('gender');
    if (Gender && Gender !== '전체') {
      const temp = Gender.split(',');
      gender[1]([false, ...guildTags.gender.items.map((e) => temp.includes(e))]);
    }
    const Friendly = searchParam.get('friendly');
    if (Friendly && Friendly !== '전체') {
      const temp = Friendly.split(',');
      friendly[1]([false, ...guildTags.friendly.items.map((e) => temp.includes(e))]);
    }

    // const Genres = searchParam.get('genres');
    // if (Genres) {
    //   const temp = Genres.split(',');
    //   setSelectedGames(temp);
    // }

    const searchByName = searchParam.get('name');
    if (searchByName) {
      setSearchByName(searchByName);
    }

    const SearchName = searchParam.get('appId');
    if (SearchName) {
      setSelectedGames(SearchName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`flex rounded-xl py-8 px-9 bg-neutral-50 gap-14 ${props.className}`}>
      <div className="flex flex-col w-[774px] gap-12">
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-2">
            <p>길드 이름</p>
            <SearchBar
              onChange={() => {}}
              onSearch={handleSearchByName}
              placeholder={searchByName}
              className="h-10"
              iconStyle="size-4"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p>길드 메인 게임</p>
            <GameSearch
              onSelect={(e) => {
                handleSearchName(e.appid);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {Object.values(guildTags).map((category, cat_ind) => (
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
          <span className="font-dgm text-neutral-900 text-center">게이머 홍길동님을 위한 길드를 찾아왔어요.</span>
        </p>
      </div>
    </div>
  );
}
