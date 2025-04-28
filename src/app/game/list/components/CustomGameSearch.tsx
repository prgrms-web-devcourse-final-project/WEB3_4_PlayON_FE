'use client';

import { useGame } from '@/api/game';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gameSearchStore } from '../stores/gameSearchStore';
import { GAME_ROUTE } from '@/constants/routes/game';

type searchedGame = { appid: string; name: string };

type Props = {
  className?: string;
  placeholder?: string;
};

const CustomGameSearch = ({ className, placeholder }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const game = useGame();
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedList, setSearchedList] = useState<searchedGame[]>([]);
  const router = useRouter();
  const { setName, getQuery } = gameSearchStore();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (query) {
        setLoading(true);
        await game.GameSearchByKeyword(query).then((res) => {
          if (res) {
            setSearchedList(res);
          }
          setLoading(false);
        });
      } else {
        setSearchedList([]);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [query]);
  useEffect(() => {
    if (!placeholder) {
      setQuery('');
      setName(undefined);
    } else {
      setQuery(placeholder);
    }
  }, [placeholder]);

  return (
    <Command
      className={cn(
        'relative w-full h-10 px-4 py-2 ring-0  border border-neutral-300 rounded-lg group focus-within:ring-1 focus-within:ring-purple-600 outline-none',
        className
      )}
      ref={wrapperRef}
      shouldFilter={false}
    >
      <CommandInput
        className=""
        placeholder={placeholder ?? '게임 이름을 검색하세요'}
        value={query ?? ''}
        onValueChange={setQuery}
        onFocus={() => {
          setIsFocused(true);
        }}
      />
      {isFocused && query.length > 0 && (
        <CommandList className="border absolute top-full left-0 w-full bg-white z-10">
          {!loading && searchedList.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="검색된 게임 리스트" forceMount>
              {searchedList.map((game, idx) => (
                <CommandItem
                  key={game.appid + idx}
                  onSelect={() => {
                    setName(game.name);
                    setIsFocused(false);
                    setQuery(game.name);
                    router.push(GAME_ROUTE.game_list + getQuery(), { scroll: false });
                  }}
                >
                  <span>{game.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};
export default CustomGameSearch;
