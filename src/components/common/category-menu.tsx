'use client';

import { useEffect, useState } from 'react';
import TiltToggle from '@/components/common/tilt-toggle';

type CategoryMenuProps = {
  categoryName: string;
  categoryItems: string[];
  onSelect: (newSelected: boolean[], categoryName: string) => void;
  className?: string;
};

export default function CategoryMenu(props: CategoryMenuProps) {
  const { onSelect } = props;
  const [selected, setSelected] = useState<boolean[]>([true, ...props.categoryItems.map(() => false)]);

  useEffect(() => {
    onSelect(selected, props.categoryName);
  }, [selected, onSelect, props.categoryName]);

  function onClick(index: number) {
    const newSelected = [...selected];
    newSelected.splice(index, 1, !selected[index]);

    if (newSelected.filter((e) => e).length === 0) {
      newSelected[0] = true;
    }
    if (newSelected.slice(1, newSelected.length).filter((e) => e).length > 0) {
      newSelected[0] = false;
    }
    if (index === 0) {
      newSelected[0] = true;
      for (let i = 1; i < newSelected.length; i++) newSelected[i] = false;
    }
    setSelected(newSelected);
  }

  return (
    <div className={`w-full flex items-center gap-5 ` + props.className}>
      <div className="flex gap-2 flex-wrap">
        <div onClick={() => onClick(0)}>
          <TiltToggle label={'전체'} toggle={selected[0]} />
        </div>
        {props.categoryItems.map((e, ind) => (
          <div onClick={() => onClick(ind + 1)} key={`${props.categoryName}_${ind}`}>
            <TiltToggle label={e} toggle={selected[ind + 1]} />
          </div>
        ))}
      </div>
    </div>
  );
}
