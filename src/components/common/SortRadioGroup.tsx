'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface SortOption {
  id: string;
  label: string;
}

interface SortRadioGroupProps {
  options: SortOption[];
}

export default function SortRadioGroup({ options }: SortRadioGroupProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSort = searchParams.get('sort') || options[0].id;
  const [selectedSort, setSelectedSort] = useState(initialSort);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', selectedSort);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams, selectedSort]);

  return (
    <div className="flex gap-7">
      {options.map((option) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            type="radio"
            id={option.id}
            name="sort"
            checked={selectedSort === option.id}
            className="hidden peer"
            onChange={() => setSelectedSort(option.id)}
          />
          <p className="text-neutral-500 text-2xl peer-checked:text-neutral-900 peer-checked:font-semibold">
            {option.label}
          </p>
        </label>
      ))}
    </div>
  );
}
