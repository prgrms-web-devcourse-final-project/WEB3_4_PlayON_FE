'use client';

import { guildCommunityTags } from '@/types/Tags/communityTags';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

type CapsuleCategoryMenuProps = {
  onClick?: (value: string) => void;
};

export default function CapsuleCategoryMenu(props: CapsuleCategoryMenuProps) {
  const labels = ['전체', ...guildCommunityTags];
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag') || '전체';
  const handleSelected = (value: string) => {
    if (props.onClick) {
      props.onClick(value);
      // console.log(value);
    } else return;
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {labels.map((e, ind) => (
        <CapsuleCategoryItem key={ind} selectedTag={selectedTag} itemLabel={e} onSelected={handleSelected} />
      ))}
    </div>
  );
}

function CapsuleCategoryItem({
  itemLabel,
  selectedTag,
  onSelected,
}: {
  itemLabel: string;
  selectedTag: string | null;
  onSelected: (value: string) => void;
}) {
  const radioRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = () => {
    // console.log(radioRef.current?.value);
    if (params.postid && radioRef.current?.checked) {
      onSelected(radioRef.current.value);
      return;
    }
    if (!radioRef.current) return;
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tag', radioRef.current.value);
    router.replace(newUrl.toString());
  };

  return (
    <label htmlFor={itemLabel}>
      <input
        ref={radioRef}
        type="radio"
        id={itemLabel}
        name="tag"
        value={itemLabel}
        checked={selectedTag === itemLabel}
        onChange={handleChange}
        className="hidden peer"
      />
      <div
        className={`transition-colors select-none cursor-pointer rounded-full py-2 px-5 justify-center font-suit text-sm border border-neutral-300 peer-checked:bg-neutral-900 peer-checked:text-white  peer-checked:font-bold`}
      >
        {itemLabel}
      </div>
    </label>
  );
}
