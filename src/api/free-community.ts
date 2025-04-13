import { FREECOMMUNITY_ENDPOINTS } from '@/constants/endpoints/free-community';
import { useAxios } from '@/hooks/useAxios';
import { comment, post, postSimple } from '@/types/community';

const categories = ['DAILY', 'HUMOR', 'GAME_RECOMMEND', 'GAME_NEWS', 'QUESTION', 'PARTY_RECRUIT'] as const;
const typeMap = {
  FreeCommunityCategories: {
    KoToEn: {
      일상: 'DAILY',
      유머: 'HUMOR',
      게임추천: 'GAME_RECOMMEND',
      게임소식: 'GAME_NEWS',
      질문: 'QUESTION',
      파티모집: 'PARTY_RECRUIT',
    },
    EnToKo: {
      DAILY: '일상',
      HUMOR: '유머',
      GAME_RECOMMEND: '게임추천',
      GAME_NEWS: '게임소식',
      QUESTION: '질문',
      PARTY_RECRUIT: '파티모집',
    },
  },
};
type TypeMap = typeof typeMap;
type ConvertingType = keyof TypeMap;
type Direction = keyof TypeMap[ConvertingType];

export default function typeConverter<T extends ConvertingType, D extends Direction, I extends keyof TypeMap[T][D]>(
  convertingType: T,
  direction: D,
  input: I
): TypeMap[T][D][I] | undefined {
  return typeMap[convertingType][direction][input];
}

//멤버 아이디 부족, 유저 아이디 없음
export const useFreeCommunity = () => {
  const axios = useAxios();
  async function PostDetail(boardId: number): Promise<post> {
    const response = await axios.Get(FREECOMMUNITY_ENDPOINTS.postDetail(boardId), {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        channel: '자유',
        comments: [],
        content: data.content as string,
        created_at: data.createAt as Date,
        hits: data.hit as number,
        img_src: data.imgUrl as string,
        num_likes: data.like as number,
        tag: typeConverter('FreeCommunityCategories', 'EnToKo', data.boardCategory),
        title: data.title as string,
        user: {
          img_src: data.profileImage as string,
          memberId: '0',
          nickname: data.authorNickname as string,
          user_title: data.title as string,
          username: '',
        },
      };
    }
    throw new Error('Failed to fetch');
  }
  async function PostUpdate(
    boardId: number,
    input: { title: string; content: string; category: string; newFileType: string; deleteUrl: string }
  ) {
    const response = await axios.Put(FREECOMMUNITY_ENDPOINTS.postUpdate(boardId), { ...input }, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        boardId: data.boardId as number,
        presignedUrl: data.presignedUrl as string,
      };
    }
    throw new Error('Failed to update');
  }
  async function PostDelete(boardId: number) {
    const response = await axios.Delete(FREECOMMUNITY_ENDPOINTS.postDelete(boardId), {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return true;
    }
    throw new Error('Failed to delete');
  }
  async function PostCreate(input: { title: string; content: string; category: string; fileType: string }) {
    const response = await axios.Post(FREECOMMUNITY_ENDPOINTS.postCreate, { ...input }, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        boardId: data.boardId as number,
        presignedUrl: data.presignedUrl as string,
      };
    }
  }
  async function PostImg(boardId: number, input: { url: string }) {
    const response = await axios.Post(FREECOMMUNITY_ENDPOINTS.postImg(boardId), { ...input }, {}, true);
    if (response && response.status === 200) {
      // const data = response.data.data;
      return true;
    }
    throw new Error('Failed to send image url');
  }
  async function PostList(input: {
    page?: number;
    pageSize?: number;
    sort?: 'LATEST' | 'POPULAR';
    keyword?: string;
    category?: (typeof categories)[number];
  }): Promise<{
    currentPageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    items: postSimple[];
  }> {
    const response = await axios.Get(FREECOMMUNITY_ENDPOINTS.postList, { params: { ...input } }, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        currentPageNumber: data.currentPageNumber,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        items: data.items.map((e) => ({
          postId: e.boardId as number,
          author_nickname: e.authorNickname as string,
          author_img: e.profileImg as string,
          title: e.title as string,
          content: e.boardContent as string,
          img_src: e.imageUrl as string,
          num_likes: e.likeCount as number,
          comments_num: e.commentCount as number,
          tag: typeConverter('FreeCommunityCategories', 'EnToKo', e.boardCategory),
        })),
      };
    }
    throw new Error('Failed to fetch list');
  }
  async function PostLike(boardId: number) {
    const response = await axios.Post(FREECOMMUNITY_ENDPOINTS.postLike(boardId), {}, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return true;
    }
    throw new Error('Failed to like post');
  }
  async function PostUnlike(boardId: number) {
    const response = await axios.Delete(FREECOMMUNITY_ENDPOINTS.postUnlike(boardId), {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return true;
    }
    throw new Error('Failed to unlike post');
  }
  async function CommentUpdate(boardId: number, commentId: number, input: { comment: string }) {
    const response = await axios.Put(FREECOMMUNITY_ENDPOINTS.commentUpdate(boardId, commentId), { ...input }, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        commentId: data.commentId as number,
      };
    }
    throw new Error('Failed to update comment');
  }
  async function CommentDelete(boardId: number, commentId: number) {
    const response = await axios.Delete(FREECOMMUNITY_ENDPOINTS.commentDelete(boardId, commentId), {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return true;
    }
    throw new Error('Failed to delete comment');
  }
  //유저 정보에 멤버 아이디, 유저 네임, 유저 칭호 정보가 없음
  async function CommentGet(
    boardId: number,
    input: { page?: number; pageSize?: number }
  ): Promise<{
    currentPageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    items: { comment: comment; created_at: Date }[];
  }> {
    const response = await axios.Get(FREECOMMUNITY_ENDPOINTS.commentGet(boardId), { params: { ...input } }, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        currentPageNumber: data.currentPageNumber,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
        items: data.items.map((e) => ({
          comment: {
            user: {
              username: '',
              nickname: e.nickname,
              user_title: '',
              img_src: e.profileImg,
              memberId: '',
            },
            content: e.comment,
          },
          created_at: e.createAt,
        })),
      };
    }
    throw new Error('Failed to fetch comments');
  }
  async function CommentCreate(boardId: number, input: { comment: string }) {
    const response = await axios.Post(FREECOMMUNITY_ENDPOINTS.commentCreate(boardId), { ...input }, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        commentId: data.commentId,
      };
    }
    throw new Error('Failed to create comment');
  }

  return {
    PostDetail,
    PostUpdate,
    PostDelete,
    PostCreate,
    PostImg,
    PostList,
    PostLike,
    PostUnlike,
    CommentUpdate,
    CommentDelete,
    CommentGet,
    CommentCreate,
  };
};
