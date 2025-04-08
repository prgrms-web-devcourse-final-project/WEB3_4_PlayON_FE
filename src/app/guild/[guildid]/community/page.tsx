import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import CommunityPostImageLong from '@/components/community/post-image-long';
import WeNeedYou from '@/components/guild/guild-we-need-you';
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
import { guild } from '@/types/guild';
import { dummyGuild, dummyPost } from '@/utils/dummyData';

const sortOptions: SortOption[] = [
  { id: 'latest', label: '최신순' },
  { id: 'popularity', label: '인기순' },
];

export default function Community() {
  const postList: post[] = Array(5).fill(dummyPost);
  const guild: guild = dummyGuild;

  return (
    <div className="wrapper relative mb-12 mt-28">
      <section>
        <div
          style={{ backgroundImage: `url(${guild.img_src})` }}
          className=" w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center"
        />
      </section>
      <section className="flex gap-12">
        <div className="w-1/3 relative -top-16">
          <WeNeedYou guildData={guild} className="sticky top-10 bg-white" />
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
