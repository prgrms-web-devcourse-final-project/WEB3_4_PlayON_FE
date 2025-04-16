'use client';

import { useGuild } from '@/api/guild';
import { useGuildBoard } from '@/api/guildBoard';
import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import Tag from '@/components/common/Tag';
import CommentCard from '@/components/community/comment-card';
import WeNeedYou from '@/components/guild/guild-we-need-you';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { PATH } from '@/constants/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, ThumbsUp, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './guildCommunityDetail.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import SafeHtml from '@/components/common/SafeHtml';

const commentSchema = z.object({
  comment: z.string().min(1, { message: '댓글을 입력해주세요' }),
});

type CommentType = z.infer<typeof commentSchema>;

export default function GuildCommunityDetail() {
  const form = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(commentSchema),
  });

  const guild = useGuild();
  const guildBoard = useGuildBoard();
  const param = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const Toast = useToast();
  const guildId = param.guildid as string;
  const boardId = param.postid as string;
  const [isLiked, setIsLiked] = useState(false);

  const { data: guildData } = useQuery({
    queryKey: ['GuildDetail', guildId],
    queryFn: () => guild.GetGuild(guildId),
  });

  const { data: postData } = useQuery({
    queryKey: ['PostDetailData', guildId, boardId],
    queryFn: () => guildBoard.GuildPostDetail(parseInt(guildId), parseInt(boardId)),
  });
  // console.log('postData', postData);

  const handleClickLike = useCallback(async () => {
    const response = await guildBoard.GuildPostLike(parseInt(guildId), parseInt(boardId));
    console.log(response);
    queryClient.refetchQueries({ queryKey: ['PostDetailData', guildId, boardId], exact: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, guildId]);

  const deletePost = useCallback(async () => {
    const response = await guildBoard.GuildPostDelete(parseInt(guildId), parseInt(boardId));
    if (response) {
      Toast.toast({
        title: '게시물이 삭제되었습니다.',
        variant: 'primary',
      });
    }
    router.push(PATH.guild_community(guildId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, guildId]);

  async function onSubmit(data: CommentType) {
    const response = await guildBoard.GuildPostCommentCreate(Number(guildId), Number(boardId), data.comment);
    if (response) form.setValue('comment', '');
    queryClient.refetchQueries({ queryKey: ['PostDetailData', guildId, boardId], exact: true });
  }
  useEffect(() => {
    if (postData) {
      setIsLiked(postData.isLiked);
    }
  }, [postData]);

  return (
    <div className="wrapper relative mb-12 mt-28">
      <div>
        <div
          style={{ backgroundImage: `url(${guildData && guildData.img_src})` }}
          className=" w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center"
        />
      </div>
      <div className="flex gap-12">
        {guildData && (
          <section className="w-1/3 relative -top-16">
            <WeNeedYou guildData={guildData} className="sticky top-10 bg-white" />
          </section>
        )}
        {postData && (
          <section className="space-y-8 mt-10 w-full">
            <div className="space-y-4">
              <p className="text-[40px] font-semibold">{postData.title}</p>
              <div className="flex gap-4 items-center">
                <div className="flex gap-4 items-center">
                  <UserInfoHorizontal size="small" data={postData.user} />
                  <p className="text-base text-neutral-500">{postData.created_at.toLocaleDateString()}</p>
                  <Tag background="medium">#{postData.tag}</Tag>
                </div>
                <div className="flex text-neutral-400 space-x-1 items-center">
                  <Eye className="size-5" /> <span>{postData.hits}</span>
                </div>
              </div>
            </div>
            <div className={`flex  ${postData.isAuthor ? 'justify-between' : 'justify-end'}`}>
              {postData.isAuthor && (
                <div className="flex gap-2">
                  {/* <Button size="sm" className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm">
                    <SquarePen strokeWidth={1.4} /> 수정
                  </Button> */}

                  <Button
                    size="sm"
                    className="bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm shadow-none"
                    onClick={deletePost}
                  >
                    <Trash2 strokeWidth={1.4} /> 삭제
                  </Button>
                </div>
              )}
              <div>
                <Button
                  size="sm"
                  className="bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm shadow-none"
                  onClick={() => router.push(PATH.guild_community(guildId))}
                >
                  목록
                </Button>
              </div>
            </div>
            {postData.img_src && (
              <div>
                <div
                  style={{ backgroundImage: `url(${postData.img_src})` }}
                  className=" rounded-xl w-full h-[440px] bg-cover bg-center"
                />
              </div>
            )}
            {/* <div className={`${styles.ql}`} dangerouslySetInnerHTML={{ __html: postData.content }} /> */}
            <SafeHtml html={postData.content} className={`${styles.ql}`} />
            <div className="flex justify-end gap-2">
              <Toggle
                variant="outline"
                size="lg"
                pressed={isLiked}
                className="rounded-full text-neutral-400 border-neutral-300 text-xl min-w-[60px] hover:text-purple-500 hover:bg-purple-50 focus-visible:text-purple-500 data-[state=on]:bg-purple-50 data-[state=on]:text-purple-500"
                onClick={handleClickLike}
              >
                <ThumbsUp /> {postData.num_likes}
              </Toggle>
            </div>
            <div className="divide-y divide-neutral-300">
              {postData.comments.map((comment, idx) => (
                <CommentCard key={idx} data={comment} guildId={guildId} boardId={boardId} />
              ))}
            </div>
            <div className="space-y-5">
              <p className="text-neutral-900 text-2xl font-semibold">
                댓글 <span className="text-purple-600">{postData.comments.length}</span>개
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="댓글을 남겨주세요."
                            className="h-24 resize-none focus-visible:ring-purple-400 placeholder:text-neutral-400"
                          />
                        </FormControl>
                        <FormMessage className="text-purple-400" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 self-end"
                  >
                    댓글 작성
                  </Button>
                </form>
              </Form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
