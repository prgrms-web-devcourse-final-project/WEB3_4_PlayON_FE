import { Trophy } from 'lucide-react';

interface UserInfoProps {
  isRadioBtn?: boolean;
  data: User;
}

export default function UserInfoVertical({ isRadioBtn = false, data }: UserInfoProps) {
  return (
    <label htmlFor={data.username} className="inline-flex items-center flex-col gap-2">
      {isRadioBtn && <input type="radio" id={data.username} name="vipUser" className=" peer" />}

      <div
        style={{
          backgroundImage: `url(${data.profile_img})`,
        }}
        className="relative rounded-full bg-center bg-cover w-[100px] h-[100px] peer-checked:outline-4 peer-checked:outline-yellow-400"
      >
        <div className="bg-amber-300 rounded-full p-1 absolute bottom-0 right-0">
          <Trophy className="size-5 stroke-[1.6px] text-amber-100" />
        </div>
      </div>

      <p className="font-suit text-neutral-900 font-bold text-base w-[100px] line-clamp-1">{data.username}</p>
    </label>
  );
}
