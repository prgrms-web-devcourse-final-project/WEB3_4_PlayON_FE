'use client';
import { useFreeCommunity } from '@/api/free-community';
import CustomPagination from '@/components/common/CustomPagination';
import EmptyLottie from '@/components/common/EmptyLottie';
import SortRadioGroup, { SortOption } from '@/components/common/SortRadioGroup';
import CommunityMenuBar from '@/components/community/community-menu-bar';
import CommunityPostImageLong from '@/components/community/post-image-long';
import CommunityPostLong from '@/components/community/post-long';
import { PATH } from '@/constants/routes';
import { postSimple } from '@/types/community';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const sortOptions: SortOption[] = [
  { id: 'LATEST', label: '최신순' },
  { id: 'POPULAR', label: '인기순' },
];

const categoryList = {
  일상: 'DAILY',
  유머: 'HUMOR',
  게임추천: 'GAME_RECOMMEND',
  게임소식: 'GAME_NEWS',
  질문: 'QUESTION',
  파티모집: 'PARTY_RECRUIT',
};

function convertTag(tag: string) {
  return categoryList[tag as keyof typeof categoryList];
}

export default function Community() {
  const [postList, setPostList] = useState<postSimple[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const freeBoard = useFreeCommunity();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePostClick = (postId: string) => {
    router.push(PATH.community_detail(postId));
  };

  useEffect(() => {
    async function fetchPosts() {
      const data = {};
      const category = searchParams.get('category');
      const keyword = searchParams.get('keyword');
      const page = searchParams.get('page');
      const pageSize = 10;
      const sort = searchParams.get('sort') || 'LATEST';

      if (category) Object.assign(data, { category: convertTag(category) });
      if (keyword) Object.assign(data, { keyword });
      if (page !== null) Object.assign(data, { page: Number(page) });
      if (pageSize) Object.assign(data, { pageSize });
      if (sort) Object.assign(data, { sort });
      // console.log('data:', data);
      try {
        setIsLoading(true);
        const posts = await freeBoard.PostList(data);
        // console.log(posts);
        if (posts) {
          setPostList(posts.items);
          setTotalItems(posts.totalItems);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="wrapper relative mb-12 mt-28">
      <section>
        <div className=" bg-[url('/img/hero/bg_community_main.webp')] w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center" />
      </section>
      <section className="flex gap-12">
        <div className="w-1/3 relative -top-16">
          <CommunityMenuBar className="sticky top-10 bg-white" />
        </div>
        {totalItems > 0 && (
          <section className="w-full space-y-4 pt-16">
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
        {!isLoading && postList.length <= 0 && (
          <div className="w-full text-center justify-self-center place-self-center pt-16">
            <EmptyLottie className="w-[360px]" text="해당하는 게시글이 없어요"></EmptyLottie>
          </div>
        )}
      </section>
    </div>
  );
}
