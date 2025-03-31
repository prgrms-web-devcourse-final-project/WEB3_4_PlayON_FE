import communityPost from '@/types/communityPosts';
import { Badge } from '@/components/ui/badge';
import { ThumbsUpIcon, SubtitlesIcon } from 'lucide-react';
import AvatarName, { AvatarNameSkeleton } from './common/avatar-name';
import { Skeleton } from '../ui/skeleton';

type CommunityPostImageShortProps = {
  data: communityPost;
  className: string;
};

export function CommunityPostImageShortSkeleton(props: { className: string }) {
  return (
    <div className={`flex gap-5 p-5 border border-neutral-300 rounded-xl ` + props.className}>
      <Skeleton className="h-full aspect-[1/1] rounded-xl " />
      <div className="flex flex-col justify-between w-full ">
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
    </div>
  );
}

export default function CommunityPostImageShort(props: CommunityPostImageShortProps) {
  return (
    <div className={`flex gap-5 p-5 rounded-xl border border-neutral-300 ` + props.className}>
      <img src={props.data.imageUrl} alt="Loading" className="object-cover h-full aspect-[1/1] rounded-xl" />
      <div className="flex flex-col justify-between">
        <AvatarName userName={props.data.userName} avatar={props.data.userAvatar} />
        <p className="text-xl font-suit font-bold">{props.data.title}</p>
        <p className="text-base font-suit line-clamp-2 text-justify ">{props.data.description}</p>
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
    </div>
  );
}
