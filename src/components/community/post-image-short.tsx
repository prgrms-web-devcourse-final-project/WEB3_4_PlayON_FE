import { postSimple } from '@/types/community';
import { ThumbsUpIcon, SubtitlesIcon } from 'lucide-react';
import AvatarName, { AvatarNameSkeleton } from './common/avatar-name';
import { Skeleton } from '../ui/skeleton';
import Tag from '@/components/common/Tag';
import { PATH } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import removeHtmlTags from '@/utils/removeHtmlTags';

type CommunityPostImageShortProps = {
  data: postSimple;
  className: string;
  guildId?: string;
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
  const router = useRouter();
  const content = removeHtmlTags(props.data.content);
  const handleClick = () => {
    if (props.guildId) {
      router.push(PATH.guild_community_detail(props.guildId, String(props.data.postId)));
    } else {
      router.push(PATH.community_detail(String(props.data.postId)));
    }
  };
  return (
    <div className={`flex gap-5 p-5 rounded-xl border border-neutral-300 ` + props.className} onClick={handleClick}>
      <img src={props.data.img_src} alt="Loading" className="object-cover h-full aspect-[1/1] rounded-xl" />
      <div className="flex flex-col justify-between w-full">
        <AvatarName userName={props.data.author_nickname} avatar={props.data.author_img} />
        <p className="text-xl font-suit font-bold">{props.data.title}</p>
        <p style={{ wordBreak: 'break-all' }} className="text-base font-suit text-ellipsis line-clamp-2">
          {content}
        </p>
        <div className="flex justify-between">
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
    </div>
  );
}
