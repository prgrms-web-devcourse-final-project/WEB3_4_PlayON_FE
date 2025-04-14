'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useInviteStore } from '@/stores/inviteStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useCallback, useState } from 'react';
import { useMembers } from '@/api/members';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';

export function InviteModal() {
  const { isOpen, closeAction, onAction, actionName } = useInviteStore();
  const member = useMembers();
  const [selectedUser, setSelectedUser] = useState<number | undefined>();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<
    {
      memberId: number;
      username: string;
      profileImg: string;
    }[]
  >([]);
  const submitCallback = useCallback(async () => {
    const response = await member.SearchByNickname(searchQuery);
    setSearchResult(response);
    setSearchQuery('');
  }, [searchQuery, member]);
  const SelectComponent = (props: {
    data: { memberId: number; username: string; profileImg: string };
    className: string;
  }) => {
    return (
      <div className={`flex gap-5 items-center cursor-pointer transition-all ${props.className}`}>
        <Avatar>
          <AvatarImage src={props.data.profileImg ? props.data.profileImg : '/img/dummy_profile.jpg'} />
        </Avatar>
        <p>{props.data.username}</p>
      </div>
    );
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAction();
          setSearchQuery('');
          setSearchResult([]);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`다른 유저를 초대하세요`}</AlertDialogTitle>
          <AlertDialogDescription>{`다른 사용자의 닉네임으로 초대장을 보낼 수 있습니다`}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitCallback();
              }
            }}
          />
          <Button onClick={() => submitCallback()}>검색</Button>
        </div>
        <ScrollArea className="h-[200px] border border-neutral-300 rounded p-2">
          {searchResult.map((e) => (
            <div
              className="rounded-xl overflow-hidden"
              key={e.memberId}
              onClick={() => {
                if (e.memberId === selectedUser) {
                  setSelectedUser(undefined);
                } else setSelectedUser(e.memberId);
              }}
            >
              <SelectComponent data={e} className={`p-2  ${e.memberId === selectedUser ? 'bg-neutral-50' : ''}`} />
            </div>
          ))}
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              closeAction();
            }}
          >
            닫기
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (selectedUser) {
                onAction(selectedUser);
              } else {
                toast({ title: '선택된 유저가 없습니다', variant: 'destructive' });
              }
            }}
          >
            {actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
