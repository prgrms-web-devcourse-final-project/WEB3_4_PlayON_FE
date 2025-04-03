import { userSimple } from '@/types/user';
import { Avatar } from '@radix-ui/react-avatar';

interface AuthorInfoProps {
  data: userSimple;
}

export default function AuthorInfo({ data }: AuthorInfoProps) {
  return (
    <div className="flex gap-6 justify-between items-center w-full">
      <Avatar
        style={{
          backgroundImage: `url(${data.img_src})`,
        }}
        className="bg-cover bg-center size-20 rounded-full shrink-0"
      />
      <div className="flex flex-col w-full">
        <div className="text-base text-neutral-900">{data.user_title}</div>
        <div className="text-xl text-neutral-900 font-bold">{data.username}님의 파티</div>
      </div>
    </div>
  );
}
