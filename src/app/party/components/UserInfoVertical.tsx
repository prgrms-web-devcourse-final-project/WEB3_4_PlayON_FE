import { Trophy } from 'lucide-react';
import { useRef, useState } from 'react';

interface UserInfoProps {
  data: User;
  isRadioBtn?: boolean;
  name?: string;
  onSelected?: (value: string) => void;
}

export default function UserInfoVertical({ isRadioBtn = false, data, name, onSelected }: UserInfoProps) {
  const radioRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (!radioRef.current) return;
    else {
      // console.log(radioRef.current.value);
      if (onSelected) {
        onSelected(radioRef.current.value);
      }
    }
  };
  return (
    <div className="inline-flex items-center flex-col gap-2">
      <label htmlFor={data.username} className="relative">
        {isRadioBtn && (
          <input
            ref={radioRef}
            type="radio"
            id={data.username}
            name={name}
            value={data.username}
            onChange={handleChange}
            className="hidden peer"
          />
        )}
        <div
          style={{
            background: 'linear-gradient(-27deg, #FCD34D 0%, #FFECAF 29%, #EFAE45 100%)',
          }}
          className="opacity-0 peer-checked:opacity-100 rounded-full bg-amber-300 size-[100px] transition-all ease-linear duration-100"
        ></div>
        <div
          style={{
            backgroundImage: `url(${data.profile_img})`,
          }}
          className="absolute top-0 rounded-full bg-center w-[100px] h-[100px] peer-checked:size-[92px] peer-checked:top-1 peer-checked:left-1 peer-checked:shadow-[inset_0px_0px_12px_3px_rgba(0,0,0,0.32)]"
        />
        <div className="opacity-0 peer-checked:opacity-20 absolute top-1 left-1 size-[92px] rounded-full bg-[#D18800]" />

        <div className="opacity-0 peer-checked:opacity-100 bg-amber-300 rounded-full p-1 absolute bottom-0 right-0 transition-all ease-linear duration-100">
          <Trophy className="size-5 stroke-[1.6px] text-amber-100" />
        </div>
      </label>

      <label htmlFor={data.username}>
        <p className="font-suit text-neutral-900 font-bold text-base w-[100px] text-center">{data.username}</p>
      </label>
    </div>
  );
}
