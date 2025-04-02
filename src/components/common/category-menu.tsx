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
  const [selected, setSelected] = useState<boolean[]>([true, ...props.categoryItems.map((e) => false)]);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

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

// USAGE
// 'use client';

// import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';
// import CategoryMenu from '@/components/common/category-menu';
// import { categories } from '@/types/categories';
// import { useCallback } from 'react';

// export default function Home() {
//   const onSelect = useCallback((newSelected: boolean[], index: number) => {
//     console.log(index + ': ' + newSelected);
//   }, []);

//   return (
//     <div className="flex justify-center">
//       <div className="flex flex-col items-center w-[60%] gap-5">
//         <p className=" text-center text-5xl p-5">Play ON!</p>
//         <div className="flex flex-col items-start gap-3">
//           {Object.values(categories).map((value, ind) => (
//             <div className="w-[765px] flex gap-5" key={value.name}>
//               <p className="w-32 text-base font-suit font-bold pr-3 border-r border-neutral-300">{value.name}</p>
//               <CategoryMenu
//                 categoryName={value.name}
//                 categoryItems={value.items}
//                 onSelect={(newSelected) => {
//                   onSelect(newSelected, ind);
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
