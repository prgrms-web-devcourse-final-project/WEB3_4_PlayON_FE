import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { PATH } from '@/constants/routes';
import { guildUserSimple } from '@/types/guild';
import { Crown, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface guildUserCardProps2 {
  data: guildUserSimple;
}

export default function GuildUserCard(props: guildUserCardProps2) {
  const { data } = props;
  let badge;
  const joinedDate = new Date(data.joined_at).toLocaleDateString('ko-KR');

  const router = useRouter();

  switch (data.role) {
    case 'LEADER':
      badge = (
        <div className="bg-amber-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <Crown className="w-5 h-5 p-1" color="#ffffff" />
        </div>
      );
      break;

    case 'MANAGER':
      badge = (
        <div className="bg-red-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <Star className="w-5 h-5 p-1" color="#ffffff" />
        </div>
      );
      break;
    case 'MEMBER':
      badge = <div></div>;
  }

  return (
    <>
      <div
        className="box-content rounded-lg border border-neutral-300 px-6 py-8 cursor-pointer"
        onClick={() => {
          router.push(PATH.user_page(String(data.member_id)));
        }}
      >
        <div className="flex gap-5">
          <div className="w-16 h-16 aspect-square relative ">
            <Avatar className="bg-neutral-400 w-16 h-16">
              <AvatarImage src={data.img_src} className="" />
            </Avatar>
            {badge}
          </div>
          <div>
            {data.title && <p className="font-suit text-sm font-normal text-neutral-500">{data.title}</p>}
            <p className="font-suit text-xl font-medium">{data.username}</p>
            {data.joined_at && <p className="font-suit text-sm font-normal text-neutral-500">가입일 : {joinedDate}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
