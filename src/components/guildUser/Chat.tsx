import { userSimple } from '@/types/user';
import { Avatar, AvatarImage } from '../ui/avatar';
import { guildUser } from '@/types/guild';

interface chatCradProps {
  data: userSimple;
  isSender?: boolean;
  message: string;
}

export default function Chat(props: chatCradProps) {
  const { data, isSender, message } = props;

  return (
    <>
      <div className={`flex ${!isSender ? 'justify-start flex-row' : 'flex-row-reverse'} gap-2 items-center`}>
        {!isSender && (
          <Avatar className="bg-neutral-400 w-16 h-16">
            <AvatarImage src={data.img_src} />
          </Avatar>
        )}
        <div className={`box-content bg-neutral-200 rounded-lg px-5 py-2 ${isSender ? 'mr-3' : 'ml-3'}`}>
          <div className="flex gap-1">
            {!isSender && (
              <div>
                <p className="font-suit text-xs text-neutral-400 font-normal">{data.user_title}</p>
                <p className="font-suit text-xs text-purple-600 font-bold">{data.nickname}</p>
              </div>
            )}
          </div>

          <p className="font-suit text-base font-normal">{message}</p>
        </div>
      </div>
    </>
  );
}
