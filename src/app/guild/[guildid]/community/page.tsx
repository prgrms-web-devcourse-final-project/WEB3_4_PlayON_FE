'use client';

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
import { useEffect } from 'react';
import { useGuildBoard } from '@/api/guildBoard';
import { useSearchParams, usePathname, useParams } from 'next/navigation';
import typeConverter from '@/utils/typeConverter';
import { guildCommunityTags } from '@/types/Tags/communityTags';

const sortOptions: SortOption[] = [
  { id: 'LATEST', label: '최신순' },
  { id: 'POPULAR', label: '인기순' },
];

export default function Community() {
  const postList: post[] = Array(5).fill(dummyPost);
  const guild: guild = dummyGuild;

  const guildBoards = useGuildBoard();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const guildId = params.guildid[0];

  useEffect(() => {
    // searchParams.forEach((value, key) => {
    //   console.log(`${key} : ${value}`);
    // });
    function convertTag(tag: string) {
      if (tag === '공지') return 'NOTICE';
      if (tag === '자유') return 'FREE';
      if (tag === '게임관련') return 'GAMES';
      return '';
    }
    async function fetchPosts() {
      const data = {};
      const tag = searchParams.get('tag');
      const keyword = searchParams.get('search');
      const page = 0;
      const pageSize = 10;
      const sort = searchParams.get('sort');

      if (tag && tag !== '전체') Object.assign(data, { tag: convertTag(tag) });
      if (keyword) Object.assign(data, { keyword });
      if (page !== null) Object.assign(data, { page });
      if (pageSize) Object.assign(data, { pageSize });
      if (sort) Object.assign(data, { sort });

      const posts = await guildBoards.GuildPostList(parseInt(guildId), data);
      console.log(posts);
    }
    fetchPosts();
  }, [guildBoards, guildId, searchParams]);

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
