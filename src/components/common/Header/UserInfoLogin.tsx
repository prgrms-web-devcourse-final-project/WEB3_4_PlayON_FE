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
import { userSimple } from '@/types/user';
import Link from 'next/link';

type Props = {
  userInfo: userSimple;
};
export default function userInfoLogin({ userInfo }: Props) {
  const handleLogout = () => {
    alert('로그아웃 구현');
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-neutral-500 text-xs">{userInfo.user_title}</p>
            <p className="leading-4 font-medium">
              <span>{userInfo.nickname}</span>님
            </p>
          </div>
          <Avatar className="w-8 aspect-square rounded-full overflow-hidden">
            <AvatarImage src={userInfo.img_src} alt="프로필 이미지" />
            <AvatarFallback className="text-center">{userInfo.nickname}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuGroup>
          <Link href="/user/me">
            <DropdownMenuItem>
              <User /> 마이페이지
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="w-80">
          <DropdownMenuLabel>알림 목록</DropdownMenuLabel>
          <DropdownMenuItem>
            <p className="text-sm">
              알림이 생긴다면 이쪽에 렌더링하면 됩니다... flex로 왼쪽은 알림 내용 오른쪽은 확인 버튼이나 지우기
            </p>
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
