import { Notification } from '@/api/notification';
import GhostSVG from '@/components/svg/ghost_fill';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type NotificationItemProps = {
  data: Notification;
};

export default function NotificationItem(props: NotificationItemProps) {
  return (
    <div className="flex gap-2 w-full place-content-between items-center">
      <img src="/img/dummy_profile.jpg" alt="" className="rounded-full w-10 h-10" />
      {!props.data.isRead && <div className="absolute w-2 h-2 rounded-full bg-cherry-main top-2 left-2"></div>}
      {!props.data.isRead && (
        <div className="absolute w-2 h-2 rounded-full bg-cherry-main top-2 left-2 blur-sm animate-pulse"></div>
      )}
      <div className="flex flex-col flex-auto">
        <p>{props.data.senderNickname}</p>
        <p>{props.data.content}</p>
        <p className="text-neutral-400 text-xs">{new Date(props.data.createdAt).toLocaleString()}</p>
      </div>
      <Link href={`${props.data.redirectUrl}`}>
        <Button>참가</Button>
      </Link>
    </div>
  );
}
