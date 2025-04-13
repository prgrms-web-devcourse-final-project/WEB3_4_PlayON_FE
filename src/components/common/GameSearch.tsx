import { useGame } from '@/api/game';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type searchedGame = { appid: string; name: string };

const GameSearch = ({ onSelect }: { onSelect: (game: searchedGame) => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const game = useGame();
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedList, setSearchedList] = useState<searchedGame[]>([]);

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

  return (
    <Command
      className="relative w-full h-10 px-4 py-2 ring-0  border border-neutral-300 rounded-lg group focus-within:ring-1 focus-within:ring-purple-600 outline-none"
      ref={wrapperRef}
      shouldFilter={false}
    >
      <CommandInput
        className=""
        placeholder="Type a command or search..."
        value={query ?? ''}
        onValueChange={setQuery}
        onFocus={() => {
          setIsFocused(true);
        }}
      />
      {isFocused && query.length > 0 && (
        <CommandList className="border absolute top-10 left-0 w-full bg-white z-10">
          {!loading && searchedList.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="검색된 게임 리스트" forceMount>
              {searchedList.map((game, idx) => (
                <CommandItem
                  key={game.appid + idx}
                  onSelect={() => {
                    onSelect(game);
                    setIsFocused(false);
                    setQuery(game.name);
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
export default GameSearch;
