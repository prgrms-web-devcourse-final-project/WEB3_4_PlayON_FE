import { guild } from '@/types/guild';
import { UsersIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

type GuildFullimageProps = {
  data: guild;
  className?: string;
};

export function GuildFullImageSkeleton(props: { className: string }) {
  return <Skeleton className={`rounded-lg aspect-[16/9] ` + props.className} />;
}

export default function GuildFullImage(props: GuildFullimageProps) {
  const tagsArr = [
    ...props.data.play_style,
    ...props.data.skill_level,
    ...props.data.gender,
    ...props.data.friendly,
  ].slice(0, 3);

  return (
    <div
      className={
        `rounded-lg overflow-hidden aspect-[16/9] px-6 py-7 flex flex-col justify-between bg-[#00000060] ` +
        props.className
      }
      style={{
        backgroundImage: `url(${props.data.img_src})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="flex place-content-between">
        <div className="flex gap-1">
          {tagsArr.map((e, ind) => (
            <Badge className="px-2 py-1 bg-white text-black font-suit font-bold" variant="outline" key={ind}>
              {e}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <UsersIcon size={14} color="#FFFFFF" strokeWidth={1} />
          <p className="text-white">{props.data.num_members}</p>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden gap-1">
        <div className="flex gap-3">
          <p className="text-white font-suit text-3xl font-bold">{props.data.guild_name}</p>
        </div>
        <div className="text-white text-nowrap text-ellipsis">{props.data.description}</div>
      </div>
    </div>
  );
}
