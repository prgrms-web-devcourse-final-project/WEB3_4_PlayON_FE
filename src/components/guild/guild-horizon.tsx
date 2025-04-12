import { guild } from '@/types/guild';
import { UsersIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type GuildHorizonProps = {
  data: guild;
  className?: string;
};

export function GuildHorizonSkeleton(props: { className: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-200 ` + props.className}>
      <Skeleton className="w-full aspect-[16/9]" />
      <div className="flex flex-col p-5 gap-1">
        <Skeleton className="h-6 mb-4 w-[50%]" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-[25%]" />
      </div>
    </div>
  );
}

const defaultImg = '/img/hero/bg_community_main.webp';

export default function GuildHorizon(props: GuildHorizonProps) {
  const tagsArr = [
    ...props.data.play_style,
    ...props.data.skill_level,
    ...props.data.gender,
    ...props.data.friendly,
  ].slice(0, 3);
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-neutral-200 ` + props.className}>
      <img src={props.data.img_src || defaultImg} alt="loading" className="w-full object-cover aspect-[16/9]" />
      <div className="p-5 gap-1">
        <p className="font-suit text-2xl font-bold pb-2">{props.data.guild_name}</p>
        <p className="font-suit text-base font-medium text-nowrap text-ellipsis overflow-hidden">
          {props.data.description}
        </p>
        <div className="font-suit text-sm font-medium flex gap-4">
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
