import { guild } from '@/types/guild';
import { UsersIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type GuildVerticalProps = {
  data: guild;
  className?: string;
};

export function GuildVerticalSkeleton(props: { className: string }) {
  return (
    <div className={`overflow-hidden flex gap-6 ` + props.className}>
      <Skeleton className="rounded-2xl h-full aspect-square" />
      <div className="py-4 flex flex-col h-full w-full justify-between">
        <div className="h-[90%]">
          <Skeleton className="h-6 mb-4 w-[50%]" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>
        <Skeleton className="h-4 w-[25%]" />
      </div>
    </div>
  );
}

export default function GuildVertical(props: GuildVerticalProps) {
  const tagsArr = [
    ...props.data.play_style,
    ...props.data.skill_level,
    ...props.data.gender,
    ...props.data.friendly,
  ].slice(0, 3);
  return (
    <div className={`overflow-hidden flex gap-6 ` + props.className}>
      <img src={props.data.img_src} alt="Loading" className="rounded-2xl h-full aspect-square object-cover" />
      <div className="py-4 flex flex-col h-full justify-between">
        <p className="font-suit text-2xl font-bold pb-4 flex-1">{props.data.guild_name}</p>
        <p className="font-suit text-base/5 font-medium text-ellipsis line-clamp-4">{props.data.description}</p>
        <div className="font-suit text-sm font-medium flex gap-4 flex-1 items-center">
          <div className="flex gap-1">
            {tagsArr.map((e, ind) => (
              <p key={ind}>#{e}</p>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon size={14} color="#737373" strokeWidth={1} />
            <p className="text-neutral-500">{props.data.num_members}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
