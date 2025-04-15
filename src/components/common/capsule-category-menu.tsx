'use client';

import { useEffect, useState } from 'react';

type CapsuleCategoryMenuProps = {
  items: string[];
  multiple: boolean;
  onSelectChange: (newSelected: boolean[]) => void;
};

export default function CapsuleCategoryMenu(props: CapsuleCategoryMenuProps) {
  const initialSelected = new Array(props.items.length + 1).fill(false);
  initialSelected[0] = true;
  const labels = ['전체', ...props.items];
  const [selected, setSelected] = useState<boolean[]>(initialSelected);
  const { onSelectChange } = props;
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    onSelectChange(selected);
    console.log('change!!!');
  }, [selected, onSelectChange, isInitial]);

  function ItemClickHandler(index: number) {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    if (newSelected.filter((e) => e).length === 0) {
      newSelected[0] = true;
    }
    if (newSelected.filter((e) => e).length > 1) {
      for (let i = 0; i < newSelected.length; i++) newSelected[i] = false;
      newSelected[index] = true;
    }
    setSelected(newSelected);
  }
  function CapsuleCategoryItem(itemLabel: string, selectedStatus: boolean) {
    const selected = 'bg-neutral-900 text-white font-bold';
    const notSelected = 'border border-neutral-300';
    return (
      <div
        className={`transition-colors select-none cursor-pointer rounded-full py-2 px-5 justify-center font-suit text-sm ${selectedStatus ? selected : notSelected}`}
      >
        {itemLabel}
      </div>
    );
  }
  return (
    <div className="flex gap-2 overflow-x-auto">
      {props.multiple
        ? labels.map((e, ind) => (
            <div key={e} onClick={() => ItemClickHandler(ind)}>
              {CapsuleCategoryItem(e, selected[ind])}
            </div>
          ))
        : labels.slice(1, labels.length).map((e, ind) => (
            <div key={e} onClick={() => ItemClickHandler(ind)}>
              {CapsuleCategoryItem(e, selected[ind + 1])}
            </div>
          ))}
    </div>
  );
}
