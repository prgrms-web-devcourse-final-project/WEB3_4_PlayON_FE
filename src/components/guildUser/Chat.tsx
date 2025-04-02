import { guildUser } from '@/types/guildUser';
import { Avatar } from '../ui/avatar';

type chatProps = {
  data: guildUser;
  isSender: boolean;
  message: string;
}

export default function Chat(props: chatProps) {
  const {data, isSender, message} = props

  return (
    <>
      <div className={`flex ${isSender ? 'justify-start flex-row' : 'flex-row-reverse'} gap-5 items-center`}>
        {<Avatar className="bg-neutral-400 w-16 h-16" />}

        <div className={`box-content bg-neutral-200 rounded-lg px-5 py-2 ${isSender ? 'mr-3' : 'ml-3'}`}>
          <div className="flex gap-1">
            {isSender && (
              <div>
                <p className="font-suit text-xs text-neutral-400 font-normal">{data.userTitle}</p>
                <p className="font-suit text-xs text-purple-600 font-bold">{data.name}</p>
              </div>
            )}
          </div>

          <p className="font-suit text-base font-normal">{message}</p>
        </div>
      </div>
    </>
  );
}
