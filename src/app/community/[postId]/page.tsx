import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import Tag from '@/components/common/Tag';
import CommentCard from '@/components/community/comment-card';
import CommunityMenuBar from '@/components/community/community-menu-bar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { post } from '@/types/community';
import { dummyPost } from '@/utils/dummyData';
import { ChevronDown, ChevronUp, Eye, SquarePen, ThumbsUp, Trash2 } from 'lucide-react';

export default function Community() {
  const post: post = dummyPost;
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
          <div className="space-y-4">
            <p className="text-[40px] font-semibold">{post.title}</p>
            <div className="flex gap-4 items-center">
              <UserInfoHorizontal size="small" data={post.user} />
              <p className="text-base text-neutral-500">{post.created_at.toLocaleDateString()}</p>
              <Tag background="medium">#{post.tag}</Tag>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button size="sm" className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm">
                <SquarePen strokeWidth={1.4} /> 수정
              </Button>
              <Button size="sm" className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm">
                <Trash2 strokeWidth={1.4} /> 삭제
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm">
                <ChevronUp strokeWidth={1.4} /> 이전글
              </Button>
              <Button size="sm" className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm">
                <ChevronDown strokeWidth={1.4} /> 다음글
              </Button>
              <Button size="sm" className=" bg-neutral-200 hover:bg-neutral-100 text-neutral-500 text-sm">
                목록
              </Button>
            </div>
          </div>
          <div>
            <div
              style={{ backgroundImage: `url(${post.img_src})` }}
              className=" rounded-xl w-full h-[440px] bg-cover bg-center border"
            />
          </div>
          <div className="text-xl">{post.content}</div>
          <div className="flex justify-end gap-2">
            <Toggle
              disabled
              variant="outline"
              size="lg"
              className="rounded-full disabled:text-neutral-400 disabled:border-neutral-300 disabled:opacity-100 text-xl"
            >
              <Eye className="size-10" /> {post.hits}
            </Toggle>
            <Toggle variant="outline" size="lg" className="rounded-full text-neutral-400 border-neutral-300 text-xl">
              <ThumbsUp /> {post.num_likes}
            </Toggle>
          </div>
          <div className="divide-y divide-neutral-300">
            {post.comments.map((comment, idx) => (
              <CommentCard key={idx} data={comment} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-neutral-900 text-2xl font-semibold">
              댓글 <span className="text-purple-600">{post.comments.length}</span>개
            </p>
            <Textarea
              placeholder="댓글을 남겨주세요."
              className="h-24 resize-none focus-visible:ring-purple-400 placeholder:text-neutral-400"
            />
            <Button size="lg" className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 self-end">
              댓글 작성
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
