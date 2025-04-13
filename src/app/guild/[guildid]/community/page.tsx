'use client';

import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import CommunityPostImageLong from '@/components/community/post-image-long';
import WeNeedYou from '@/components/guild/guild-we-need-you';
import { postSimple } from '@/types/community';
import { useEffect, useState } from 'react';
import { useGuildBoard } from '@/api/guildBoard';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import CustomPagination from '@/components/common/CustomPagination';
import CommunityPostLong from '@/components/community/post-long';
import { useQuery } from '@tanstack/react-query';
import { useGuild } from '@/api/guild';
import GhostSVG from '@/components/svg/ghost_fill';
import { PATH } from '@/constants/routes';

const sortOptions: SortOption[] = [
  { id: 'LATEST', label: '최신순' },
  { id: 'POPULAR', label: '인기순' },
];

export default function GuildCommunity() {
  const [postList, setPostList] = useState<postSimple[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const guild = useGuild();
  const guildBoard = useGuildBoard();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const guildId = params.guildid as string;

  const { data: guildData } = useQuery({
    queryKey: ['GuildDetail', guildId],
    queryFn: () => guild.GetGuild(guildId),
  });

  const handlePostClick = (postId: string) => {
    router.push(PATH.guild_community_detail(guildId, postId));
  };

  useEffect(() => {
    function convertTag(tag: string) {
      if (tag === '공지') return 'NOTICE';
      if (tag === '자유') return 'FREE';
      if (tag === '게임관련') return 'GAME';
      return '';
    }
    async function fetchPosts() {
      const data = {};
      const tag = searchParams.get('tag');
      const keyword = searchParams.get('search');
      const page = searchParams.get('page');
      const pageSize = 10;
      const sort = searchParams.get('sort');

      if (tag && tag !== '전체') Object.assign(data, { tag: convertTag(tag) });
      if (keyword) Object.assign(data, { keyword });
      if (page !== null) Object.assign(data, { page: Number(page) - 1 });
      if (pageSize) Object.assign(data, { pageSize });
      if (sort) Object.assign(data, { sort });
      // console.log('data:', data);

      const posts = await guildBoard.GuildPostList(parseInt(guildId), data);
      console.log(posts);
      if (posts) {
        setPostList(posts.content);
        setTotalItems(posts.totalElements);
      }
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId, searchParams]);

  return (
    <div className="wrapper relative mb-12 mt-28">
      <section>
        <div
          style={{ backgroundImage: `url(${guildData && guildData.img_src})` }}
          className=" w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center bg-neutral-100"
        />
      </section>
      <section className="flex gap-12">
        {guildData && (
          <div className="w-1/3 relative -top-16">
            <WeNeedYou guildData={guildData} className="sticky top-10 bg-white" />
          </div>
        )}
        {totalItems > 0 && (
          <section className="w-full space-y-10 pt-8">
            <SortRadioGroup options={sortOptions} />
            <div className="w-full divide-y divide-neutral-200">
              {postList.map((post) => {
                if (post.img_src) {
                  return (
                    <CommunityPostImageLong
                      key={post.postId}
                      data={post}
                      onClick={() => handlePostClick(String(post.postId))}
                      className="w-full h-[180px]"
                    />
                  );
                } else {
                  return (
                    <CommunityPostLong
                      key={post.postId}
                      data={post}
                      onClick={() => handlePostClick(String(post.postId))}
                      className="w-full h-[180px]"
                    />
                  );
                }
              })}
            </div>
            <CustomPagination totalItems={totalItems} pageSize={10} />
          </section>
        )}
        {guildData && totalItems <= 0 && (
          <div className="flex self-start pt-20 gap-4">
            <GhostSVG width={32} fill="#9884F0" stroke="" />
            <p className="font-dgm text-2xl text-neutral-800">게시글이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
