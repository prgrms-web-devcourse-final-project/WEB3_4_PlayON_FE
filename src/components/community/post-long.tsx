import communityPost from '@/types/communityPosts';
import AvatarName, { AvatarNameSkeleton } from './common/avatar-name';
import { SubtitlesIcon, ThumbsUpIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

type CommunityPostImageLongProps = {
  data: communityPost;
  className: string;
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
  return (
    <div className={`flex flex-col py-7 justify-between ` + props.className}>
      <AvatarName userName={props.data.userName} avatar={props.data.userAvatar} />
      <div>
        <p className="text-xl font-suit font-bold">{props.data.title}</p>
        <p className="text-base font-suit line-clamp-2 text-justify ">{props.data.description}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          {props.data.tags.map((e, ind) => (
            <Badge className="px-2 py-1 bg-white text-black font-suit font-bold" variant={'outline'} key={ind}>
              {e}
            </Badge>
          ))}
        </div>
        <div className="flex place-items-center gap-3">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon size={16} strokeWidth={1} />
            <p className="font-suit text-sm font-medium text-neutral-400">{props.data.numLikes}</p>
          </div>
          <div className="flex items-center gap-1">
            <SubtitlesIcon size={16} strokeWidth={1} />
            <p className="font-suit text-sm font-medium text-neutral-400">{props.data.numComments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
