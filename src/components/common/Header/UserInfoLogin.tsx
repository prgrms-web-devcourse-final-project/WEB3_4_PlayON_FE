'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { LogOut, User } from 'lucide-react';
import { userDetail } from '@/types/user';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useMembers } from '@/api/members';
import GhostSVG from '@/components/svg/ghost_fill';
import { PATH } from '@/constants/routes';
import NotificationItem from './notification-item';
import { Notification, useNotification } from '@/api/notification';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  userInfo: userDetail;
};
export default function UserInfoLogin({ userInfo }: Props) {
  const { logout } = useAuthStore();
  const member = useMembers();
  const clearUserStorage = useAuthStore.persist.clearStorage;
  const handleLogout = async () => {
    await member.logout();
    clearUserStorage();
    logout();
    //추후 수정 필요
    window.location.reload();
    // router.refresh();
  };

  const [getNoti, setGetNoti] = useState(false);
  const notification = useNotification();
  const { data: notifications, isFetched } = useQuery({
    queryKey: ['Notifications'],
    queryFn: async () => {
      setGetNoti(false);
      return await notification.GetNotifications();
    },
    enabled: getNoti,
    staleTime: 1000 * 60 * 5,
    select: (e) => {
      return e.slice(0, 5);
    },
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="cursor-pointer" onClick={() => setGetNoti(true)}>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-neutral-500 text-xs">{userInfo.user_title}</p>
            <p className="leading-4 font-medium">
              <span>{userInfo.nickname}</span>님
            </p>
          </div>
          <Avatar className="w-8 aspect-square rounded-full overflow-hidden bg-purple-500">
            <AvatarImage src={userInfo.img_src} alt="프로필 이미지" />
            <AvatarFallback className="flex items-end justify-center">
              <div className="animate-bounce duration-1000 mt-2 ">
                <GhostSVG fill="#FFFFFF" stroke="" width={20} />
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuGroup>
          <Link href={PATH.my_page}>
            <DropdownMenuItem>
              <User /> 마이페이지
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="w-80">
          <DropdownMenuLabel>알림 목록</DropdownMenuLabel>
          <DropdownMenuItem>
            {/* <p className="text-sm">
              알림이 생긴다면 이쪽에 렌더링하면 됩니다... flex로 왼쪽은 알림 내용 오른쪽은 확인 버튼이나 지우기
            </p> */}
            {isFetched &&
              notifications &&
              notifications.map((e) => <NotificationItem data={e} key={`noti_${e.id}_${e.createdAt}`} />)}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut /> 로그아웃
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
