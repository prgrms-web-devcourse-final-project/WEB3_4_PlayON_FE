'use client';

import { useFreeCommunity } from '@/api/free-community';
import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import Tag from '@/components/common/Tag';
import CommentCard from '@/components/community/comment-card';
import CommunityMenuBar from '@/components/community/community-menu-bar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { PATH } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, SquarePen, ThumbsUp, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './freeCommunityDetail.module.css';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/stores/authStore';
import { div } from 'three/src/nodes/TSL.js';
import Link from 'next/link';

const commentSchema = z.object({
  comment: z.string().min(1, { message: '댓글을 입력해주세요' }),
});

type CommentType = z.infer<typeof commentSchema>;

export default function Community() {
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(commentSchema),
  });

  const freeBoard = useFreeCommunity();
  const param = useParams();
  const Toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const boardId = param.postid as string;

  const [isLiked, setIsLiked] = useState(false);

  const { data: postData } = useQuery({
    queryKey: ['FreePostDetail', boardId],
    queryFn: () => freeBoard.PostDetail(parseInt(boardId)),
  });

  const { data: commentsData } = useQuery({
    queryKey: ['FreePostComments', boardId],
    queryFn: () => freeBoard.CommentGet(parseInt(boardId), {}),
  });
  console.log('commentsData', commentsData);

  const handleClickLike = useCallback(async () => {
    const response = await freeBoard.PostLike(parseInt(boardId));
    console.log(response);
    queryClient.refetchQueries({ queryKey: ['FreePostDetail', boardId], exact: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const deletePost = useCallback(async () => {
    const response = await freeBoard.PostDelete(parseInt(boardId));
    if (response) {
      Toast.toast({
        title: '게시물이 삭제되었습니다.',
        variant: 'primary',
      });
    }
    router.push(PATH.community);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  async function onSubmit(data: CommentType) {
    const response = await freeBoard.CommentCreate(Number(boardId), { comment: data.comment });
    if (response) form.setValue('comment', '');
    queryClient.refetchQueries({ queryKey: ['FreePostComments', boardId], exact: true });
  }

  useEffect(() => {
    if (postData) {
      setIsLiked(postData.isLiked);
    }
  }, [postData]);

  return (
    <div className="wrapper relative mb-12 mt-28">
      <div>
        <div className=" bg-[url('/img/hero/bg_community_main.webp')] w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center" />
      </div>
      <div className="flex gap-12">
        <section className="w-1/3 relative -top-16">
          <CommunityMenuBar className="sticky top-10 bg-white" />
        </section>

        <section className="space-y-8 mt-10 w-full">
          {postData && (
            <section className="space-y-8">
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
                      className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm"
                      onClick={deletePost}
                    >
                      <Trash2 strokeWidth={1.4} /> 삭제
                    </Button>
                  </div>
                )}
                <div>
                  <Button
                    size="sm"
                    className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm"
                    onClick={() => router.push(PATH.community)}
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
              <div className={`${styles.ql}`} dangerouslySetInnerHTML={{ __html: postData.content }} />
              <div className="flex justify-end gap-2">
                <Toggle
                  variant="outline"
                  size="lg"
                  disabled={!user}
                  pressed={isLiked}
                  className="rounded-full text-neutral-400 border-neutral-300 text-xl min-w-[60px] hover:text-purple-500 hover:bg-purple-50 focus-visible:text-purple-500 data-[state=on]:bg-purple-50 data-[state=on]:text-purple-500 disabled:opacity-100"
                  onClick={handleClickLike}
                >
                  <ThumbsUp /> {postData.num_likes}
                </Toggle>
              </div>
            </section>
          )}
          {commentsData && (
            <section className="space-y-8">
              <div className="divide-y divide-neutral-300">
                {commentsData.items.map((comment, idx) => (
                  <CommentCard key={idx} data={comment} boardId={boardId} />
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-neutral-900 text-2xl font-semibold">
                  댓글 <span className="text-purple-600">{commentsData.totalItems}</span>개
                </p>
                {user ? (
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
                ) : (
                  <div className="w-full border border-neutral-300 h-24 rounded-lg px-4 py-3 text-base text-neutral-500">
                    <Link href={PATH.login} className="hover:text-purple-500 hover:font-bold">
                      로그인
                    </Link>{' '}
                    후 댓글을 남겨 보세요
                  </div>
                )}
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
