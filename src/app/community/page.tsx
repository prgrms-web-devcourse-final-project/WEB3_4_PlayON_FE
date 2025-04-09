import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import CommunityMenuBar from '@/components/community/community-menu-bar';
import CommunityPostImageLong from '@/components/community/post-image-long';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { post } from '@/types/community';
import { dummyPost } from '@/utils/dummyData';

const sortOptions: SortOption[] = [
  { id: 'latest', label: '최신순' },
  { id: 'popularity', label: '인기순' },
];

export default function Community() {
  const postList: post[] = Array(10).fill(dummyPost);
  return (
    <div className="wrapper relative mb-12 mt-28">
      <section>
        <div className=" bg-[url('/img/hero/bg_community_main.webp')] w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center" />
      </section>
      <section className="flex gap-12">
        <div className="w-1/3 relative -top-16">
          <CommunityMenuBar className="sticky top-10 bg-white" />
        </div>
        <section className="space-y-10 pt-8">
          <SortRadioGroup options={sortOptions} />
          <div className="divide-y divide-neutral-200">
            {postList.map((post) => (
              <CommunityPostImageLong key={post.title} data={post} className="w-full h-[180px]" />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="text-base" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="text-base" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </section>
    </div>
  );
}
