import communityPost from '@/types/communityPosts';
import AvatarName, { AvatarNameSkeleton } from './common/avatar-name';
import { SubtitlesIcon, ThumbsUpIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import Tag from '@/components/common/Tag';

type CommunityPostImageShortProps = {
  data: communityPost;
  className: string;
};

export function CommunityPostShortSkeleton(props: { className: string }) {
  return (
    <div className={`flex flex-col border border-neutral-300 rounded-xl p-5 justify-between ` + props.className}>
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

export default function CommunityPostShort(props: CommunityPostImageShortProps) {
  return (
    <div className={`border border-neutral-300 rounded-xl p-5 flex flex-col justify-between ` + props.className}>
      <AvatarName userName={props.data.userName} avatar={props.data.userAvatar} />
      <div>
        <p className="text-xl font-suit font-bold">{props.data.title}</p>
        <p className="text-base font-suit line-clamp-2 text-justify ">{props.data.description}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          {props.data.tags.map((e, ind) => (
            <Tag background="medium" style="default" key={ind} className="font-bold">
              {e}
            </Tag>
          ))}
        </div>
        <div className="flex place-items-center gap-3">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="text-neutral-400 w-4 h-4 stroke" />
            <p className="font-suit text-sm font-medium text-neutral-400">{props.data.numLikes}</p>
          </div>
          <div className="flex items-center gap-1">
            <SubtitlesIcon className="text-neutral-400 w-4 h-4 stroke" />
            <p className="font-suit text-sm font-medium text-neutral-400">{props.data.numComments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
