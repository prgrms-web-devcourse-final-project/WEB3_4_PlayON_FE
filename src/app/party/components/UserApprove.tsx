'use client';

import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import User from '@/types/user';

interface UserApproveProps {
  data: User;
  onApprove: () => void;
  onReject: () => void;
}

export default function UserApprove({ data, onApprove, onReject }: UserApproveProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-3">
        <Avatar
          style={{
            backgroundImage: `url(${data.profile_img})`,
          }}
          className="bg-cover bg-center size-12 rounded-full shrink-0"
        />
        <div className="flex flex-col">
          <div className="text-sm text-neutral-500 leading-5">{data.title}</div>
          <div className="text-lg text-neutral-900 font-semibold">{data.username}</div>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <Button onClick={() => onApprove()} className="bg-neutral-900 text-sm px-4">
          승인
        </Button>
        <Button onClick={() => onReject()} variant={'outline'} className="border-neutral-900 text-neutral-900 text-sm">
          거부
        </Button>
      </div>
    </div>
  );
}
