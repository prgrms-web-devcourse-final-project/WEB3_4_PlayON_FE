import { postSimple } from '@/types/community';

import AvatarName, { AvatarNameSkeleton } from './common/avatar-name';
import { SubtitlesIcon, ThumbsUpIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import Tag from '@/components/common/Tag';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';

type CommunityPostImageLongProps = {
  data: postSimple;
  className: string;
  onClick?: () => void;
};

export function CommunityPostLongSkeleton(props: { className: string }) {
  return (
    <div className={`flex flex-col py-7 justify-between ` + props.className}>
      <AvatarNameSkeleton />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-[25%]" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[10%]" />
        <Skeleton className="h-4 w-[10%]" />
      </div>
    </div>
  );
}

export default function CommunityPostLong(props: CommunityPostImageLongProps) {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col py-7 justify-between cursor-pointer ` + props.className}
      onClick={props.onClick ? props.onClick : () => router.push(PATH.community_detail(String(props.data.postId)))}
    >
      <AvatarName userName={props.data.author_nickname} avatar={props.data.author_img} />
      <div>
        <p className="text-xl font-suit font-bold">{props.data.title}</p>
        <p className="text-base font-suit line-clamp-2 text-justify ">{props.data.content}</p>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex gap-1">
          <Tag background="medium" style="default" className="font-bold">
            {props.data.tag}
          </Tag>
        </div>
        <div className="flex place-items-center gap-3">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="text-neutral-400 w-4 h-4 stroke" />
            <p className="font-suit text-sm font-medium text-neutral-400">{props.data.num_likes}</p>
          </div>
          <div className="flex items-center gap-1">
            <SubtitlesIcon className="text-neutral-400 w-4 h-4 stroke" />
            <p className="font-suit text-sm font-medium text-neutral-400">{props.data.comments_num}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
