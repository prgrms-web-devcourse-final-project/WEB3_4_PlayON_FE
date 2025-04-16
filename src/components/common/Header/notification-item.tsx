import { useMembers } from '@/api/members';
import { Notification } from '@/api/notification';
import { useParty } from '@/api/party';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type NotificationItemProps = {
  data: Notification;
  handleAccept: () => Promise<void>;
  handleDecline: () => Promise<void>;
};

export default function NotificationItem(props: NotificationItemProps) {
  const party = useParty();
  const router = useRouter();
  const member = useMembers();

  const handleAccept = async () => {
    return props.handleAccept();
  };
  const handleDecline = async () => {
    return props.handleDecline();
  };

  return (
    <div className="flex gap-3 w-full place-content-between items-center">
      <img src="/img/dummy_profile.jpg" alt="" className="rounded-full w-10 h-10" />
      {!props.data.isRead && <div className="absolute w-2 h-2 rounded-full bg-cherry-main top-2 left-2"></div>}
      {!props.data.isRead && (
        <div className="absolute w-2 h-2 rounded-full bg-cherry-main top-2 left-2 blur-sm animate-pulse"></div>
      )}

      <div className="flex flex-col flex-auto pr-5">
        <p>{props.data.senderNickname}</p>
        <p>{props.data.content}</p>
        <p className="text-neutral-400 text-xs">{new Date(props.data.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex gap-1">
        <Button
          variant={'positive'}
          className="w-8 h-8"
          onClick={() => {
            handleAccept();
          }}
        >
          <CheckIcon />
        </Button>
        <Button
          variant={'negative'}
          className="w-8 h-8"
          onClick={() => {
            handleDecline();
          }}
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
}
