import { useGuildBoard } from '@/api/guildBoard';
import { useToast } from '@/hooks/use-toast';
import { comment } from '@/types/community';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

interface CommentCardProps {
  data: comment;
  guildId: string;
  boardId: string;
}
export default function CommentCard({ data, guildId, boardId }: CommentCardProps) {
  const guildBoard = useGuildBoard();
  const queryClient = useQueryClient();
  const Toast = useToast();

  const deleteComment = useCallback(async () => {
    const response = await guildBoard.GuildPostCommentDelete(parseInt(guildId), parseInt(boardId), data.commentId);
    if (response) {
      Toast.toast({
        title: '댓글이 삭제되었습니다.',
        variant: 'primary',
      });
    }
    queryClient.refetchQueries({ queryKey: ['PostDetailData', guildId, boardId], exact: true });
  }, []);
  console.log(data);

  return (
    <div className="flex gap-4 py-5 w-full">
      <div
        style={{ backgroundImage: `url(${data.user.img_src})` }}
        className="size-10 rounded-full bg-cover bg-center shrink-0"
      />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className="text-neutral-900 text-base">{data.user.nickname}</p>
            <p className="text-neutral-500 text-sm">{data.createdAt.toLocaleTimeString()}</p>
          </div>
          {data.isAuthor && (
            <button className="text-sm text-neutral-500 hover:text-cherry-main" onClick={deleteComment}>
              삭제하기
            </button>
          )}
        </div>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
