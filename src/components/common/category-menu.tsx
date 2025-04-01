'use client';

import { useEffect, useState } from 'react';
import TiltToggle from '@/components/common/tilt-toggle';

type CategoryMenuProps = {
  categoryName: string;
  categoryItems: string[];
  onSelect: (newSelected: boolean[]) => void;
  className?: string;
};

export default function CategoryMenu(props: CategoryMenuProps) {
  const { onSelect } = props;
  const [selected, setSelected] = useState<boolean[]>(new Array(props.categoryItems.length + 1).fill(false));

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  function onClick(index: number) {}

  return (
    <div className={`w-full flex items-center gap-5 ` + props.className}>
      <p className="text-base font-suit font-bold pr-3 border-r border-neutral-300">{props.categoryName}</p>
      <div className="flex-auto flex justify-between flex-wrap">
        <TiltToggle key={`${props.categoryName}_all`} label={'전체'} toggle={selected[0]} />
        {props.categoryItems.map((e, ind) => (
          <TiltToggle key={e} label={e} toggle={selected[ind + 1]} />
        ))}
      </div>
    </div>
  );
}
