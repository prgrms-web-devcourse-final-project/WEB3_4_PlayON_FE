import { guildUser } from '@/types/guildUser';
import { Avatar } from '../ui/avatar';

type chatprops = {
  data: guildUser;
  isSender: boolean;
  message: string;
}

export default function Chat({data, isSender, message}: chatprops) {
  return (
    <>
      <div className={`flex ${isSender ? 'flex-row-reverse' : 'justify-start flex-row'} gap-5 items-center`}>
        {<Avatar className="bg-neutral-400 w-16 h-16" />}

        <div className={`box-content bg-white rounded-lg px-5 py-2 ${isSender ? 'mr-3' : 'ml-3'}`}>
          <div className="flex gap-1 ">
            <p className="font-suit text-xs text-neutral-400 font-normal">{data.userTitle}</p>
            <p className="font-suit text-xs text-sky-700 font-bold">{data.name}</p>
          </div>

          <p className="font-suit text-base font-normal">{message}</p>
        </div>
      </div>
    </>
  );
}
