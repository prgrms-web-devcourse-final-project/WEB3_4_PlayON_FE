import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import Tag from '@/components/common/Tag';
import CommunityMenuBar from '@/components/community/community-menu-bar';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { post } from '@/types/community';
import { dummyPost } from '@/utils/dummyData';
import { ChevronDown, ChevronUp, Eye, SquarePen, ThumbsUp, Trash2 } from 'lucide-react';

export default function Community() {
  const post: post = dummyPost;
  return (
    <div className="wrapper relative mb-12">
      <div>
        <div className="bg-neutral-300 w-full h-[160px] rounded-2xl mt-12" />
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
            {/* <Button
              variant="outline"
              className="rounded-full text-xl text-neutral-400 hover:bg-white hover:text-neutral-400 hover:cursor-default"
            >
              <Eye /> {post.hits}
            </Button>
            <Button variant="outline" className="rounded-full text-xl text-neutral-400">
              <ThumbsUp /> {post.num_likes}
            </Button> */}
            <Toggle variant="outline" size="lg" className="rounded-full text-neutral-400">
              <Eye /> {post.hits}
            </Toggle>
          </div>
        </section>
      </div>
    </div>
  );
}
