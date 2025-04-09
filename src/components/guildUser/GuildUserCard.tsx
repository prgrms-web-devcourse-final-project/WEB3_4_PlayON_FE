import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guildUser } from '@/types/guild';
import { Crown, Star } from 'lucide-react';

interface guildUserCardProps2 {
  data: guildUser;
}

export default function GuildUserCard(props: guildUserCardProps2) {
  const { data } = props;
  let badge;
  const joindDate = new Date(data.joined_at).toLocaleDateString('ko-KR');

  switch (data.guild_role) {
    case 'leader':
      badge = (
        <div className="bg-amber-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <Crown className="w-5 h-5 p-1" color="#ffffff" />
        </div>
      );
      break;

    case 'manager':
      badge = (
        <div className="bg-red-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <Star className="w-5 h-5 p-1" color="#ffffff" />
        </div>
      );
      break;
    case 'user':
      badge = <div></div>;
  }

  return (
    <>
      <div className="box-content rounded-lg border border-neutral-300 px-6 py-8">
        <div className="flex gap-5">
          <div className="w-16 h-16 aspect-square relative ">
            <Avatar className="bg-neutral-400 w-16 h-16">
              <AvatarImage src={data.user.img_src} />
            </Avatar>
            {badge}
          </div>
          <div>
            {data.user.user_title && (
              <p className="font-suit text-sm font-normal text-neutral-500">{data.user.user_title}</p>
            )}
            <p className="font-suit text-xl font-medium">{data.user.nickname}</p>
            {data.joined_at && <p className="font-suit text-sm font-normal text-neutral-500">가입일 : {joindDate}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
