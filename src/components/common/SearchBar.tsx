'use client';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useRef } from 'react';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  iconStyle?: string;
}

export default function SearchBar({ className, placeholder, onChange, onSearch, iconStyle }: SearchBarProps) {
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      if (valueRef.current) {
        onSearch(valueRef.current.value);
        valueRef.current.value = '';
      }
    }
  };
  return (
    <div
      className={cn(
        'flex gap-2 justify-between align-middle bg-white w-full rounded-lg border border-neutral-300 text-neutral-900 text-sm px-3 py-3',
        className
      )}
    >
      <input
        type="text"
        ref={valueRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        className="font-suit placeholder:font-suit placeholder:text-neutral-400 placeholder:font-normal w-full focus:outline-none bg-transparent"
        placeholder={placeholder || '검색어를 입력하세요'}
      />
      <button
        className="cursor-pointer"
        onClick={() => {
          if (valueRef.current) {
            onSearch(valueRef.current.value);
            valueRef.current.value = '';
          }
        }}
      >
        <SearchIcon className={`text-neutral-400 ` + iconStyle} />
      </button>
    </div>
  );
}
