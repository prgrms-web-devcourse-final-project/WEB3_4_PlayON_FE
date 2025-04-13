'use client';

import { userSimple } from '@/types/user';
import { Trophy } from 'lucide-react';
import { useRef } from 'react';

interface UserInfoProps {
  data: userSimple;
  isRadioBtn?: boolean;
  name?: string;
  onSelected?: (value: string) => void;
}

export default function UserInfoVertical({ isRadioBtn = false, data, name, onSelected }: UserInfoProps) {
  const radioRef = useRef<HTMLInputElement | null>(null);

  // 기본 이미지
  const defaultImg = '/img/dummy_profile.jpg';

  const handleChange = () => {
    if (!radioRef.current) return;
    else {
      if (onSelected) {
        onSelected(radioRef.current.value);
      }
    }
  };
  return (
    <div className="inline-flex items-center flex-col gap-2">
      <label htmlFor={data.partyMemberId} className="relative">
        {isRadioBtn && (
          <input
            ref={radioRef}
            type="radio"
            id={data.partyMemberId}
            name={name}
            value={data.partyMemberId}
            onChange={handleChange}
            className="hidden peer"
          />
        )}
        <div
          style={{
            background: 'linear-gradient(-27deg, #FCD34D 0%, #FFECAF 29%, #EFAE45 100%)',
          }}
          className="absolute opacity-0 -z-10 -top-1 -left-[5px] peer-checked:opacity-100 rounded-full bg-amber-300 size-[108px] transition-all ease-linear duration-100"
        ></div>
        <div
          style={{
            backgroundImage: `url(${data.img_src || defaultImg} )`,
          }}
          className="rounded-full bg-center bg-cover size-[100px] peer-checked:shadow-[inset_0px_0px_12px_3px_rgba(0,0,0,0.32)] place-self-center"
        />
        <div className="opacity-0 peer-checked:opacity-20 size-[100px] rounded-full bg-[#D18800] absolute top-0" />

        <div className="opacity-0 peer-checked:opacity-100 bg-amber-300 rounded-full p-1 absolute bottom-0 right-0 transition-all ease-linear duration-100">
          <Trophy className="size-5 stroke-[1.6px] text-amber-100" />
        </div>
      </label>

      <label htmlFor={data.nickname}>
        <p className="font-suit text-neutral-900 font-bold text-base w-[100px] text-center break-words">
          {data.nickname}
        </p>
      </label>
    </div>
  );
}
