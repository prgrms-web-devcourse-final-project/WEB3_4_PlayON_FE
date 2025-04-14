import { GUILD_BOARD_ENDPOINTS } from '@/constants/endpoints/guild-board';
import { useAxios } from '@/hooks/useAxios';
import { postSimple, post } from '@/types/community';
import { uploadToS3 } from '@/utils/uploadToS3';
// import { guildCommunityTags } from '@/types/Tags/communityTags';

export const useGuildBoard = () => {
  const axios = useAxios();
  type comment = {
    id: number;
    authorNickname: string;
    authorProfileImg: string;
    content: string;
    createdAt: Date;
    isAuthor: boolean;
  };
  type guild = {
    id: number;
    name: string;
    description: string;
    guildImg: string;
    memberCount: number;
  };
  type postType = {
    id: number;
    title: string;
    content: string;
    tag: string;
    hit: number;
    likeCount: number;
    imageUrl: string;
    authorNickname: string;
    comments: comment[];
    commentCount: number;
    guild: guild;
    createdAt: string;
    isAuthor: boolean;
    isLiked: boolean;
  };
  type noticesPost = {
    id: number;
    title: string;
    content: string;
    authorNickname: string;
    authorAvatar: string;
    likeCount: number;
    commentCount: number;
    imageUrl: string;
    tag: string;
  };
  type postDetailResponse = { data: postType; msg: string; resultCode: string };
  type createRequest = { title: string; content: string; tag: string; fileType: string };
  type updateRequest = { title: string; content: string; tag: string; newFileType: string };

  async function GuildPostDetail(guildId: number, boardId: number) {
    const response = await axios.TypedGet<postDetailResponse>(
      GUILD_BOARD_ENDPOINTS.guildPostDetail(guildId, boardId),
      {},
      true
    );
    // console.log('GuildPostDetail', response);
    if (response && response.msg === 'OK') {
      const postData = response.data;
      // console.log('postData', postData);
      const postDetail: post & { isAuthor: boolean; isLiked: boolean } = {
        user: {
          username: postData.authorNickname,
          nickname: postData.authorNickname,
          user_title: '',
          img_src: '/img/dummy_profile.jpg',
          memberId: '',
        },
        title: postData.title,
        content: postData.content,
        img_src: postData.imageUrl,
        created_at: new Date(postData.createdAt),
        num_likes: postData.likeCount,
        comments: postData.comments.map((comment: comment) => ({
          user: {
            username: comment.authorNickname,
            nickname: comment.authorNickname,
            user_title: '',
            img_src: comment.authorProfileImg || '/img/dummy_profile.jpg',
            memberId: '',
          },
          content: comment.content,
          createdAt: new Date(comment.createdAt),
          commentId: comment.id,
          isAuthor: comment.isAuthor,
        })),
        num_comments: postData.commentCount,
        hits: postData.hit,
        channel: '길드',
        tag: postData.tag,
        isAuthor: postData.isAuthor,
        isLiked: postData.isLiked,
      };
      // console.log('postDetail', postDetail);
      return postDetail;
    }
    return false;
  }

  async function GuildPostChange(guildId: number, boardId: number, data: updateRequest) {
    const response = await axios.Put(GUILD_BOARD_ENDPOINTS.guildPostChange(guildId, boardId), data, {}, true);
    if (response && response.status === 200) {
      return {
        boardId: response.data.data.id as number,
        presignedUrl: response.data.data.presignedUrl as string,
      };
    }
    return false;
  }

  async function GuildPostChangeWithImg(guildId: number, boardId: number, data: updateRequest, imageFile: File | null) {
    try {
      // 1. 게시글 수정
      const changeResponse = await GuildPostChange(guildId, boardId, data);
      if (changeResponse && imageFile) {
        const { boardId, presignedUrl } = changeResponse;
        // 2. S3 presigned URL로 이미지 업로드
        const s3Response = await uploadToS3(imageFile, presignedUrl);
        if (s3Response.success) {
          const imageUrl = s3Response.url;
          console.log('이미지 업로드 완료: ', imageUrl);
          // 3. 이미지 URL 서버에 등록
          await GuildPostImageUpload(guildId, boardId, imageUrl);
          console.log('길드 생성 완료(이미지O)');
          return true;
        }
      }
      console.log('길드 생성 완료(이미지X)');
      return true;
    } catch (error) {
      console.log('길드 생성 중 오류 발생: ', error);
    }
  }

  async function GuildPostDelete(guildId: number, boardId: number) {
    const response = await axios.Delete(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
    if (response && response.status === 200) return true;
    return false;
  }

  async function GuildPostCommentChange(guildId: number, boardId: number, commentId: number, comment: string) {
    const response = await axios.Put(
      GUILD_BOARD_ENDPOINTS.guildPostCommentChange(guildId, boardId, commentId),
      { comment: comment },
      {},
      true
    );
    // console.log(response);
    if (response && response.status === 200) {
      return response.data.data as string;
    }
    return false;
  }

  async function GuildPostCommentDelete(guildId: number, boardId: number, commentId: number) {
    const response = await axios.Delete(
      GUILD_BOARD_ENDPOINTS.guildPostCommentDelete(guildId, boardId, commentId),
      {},
      true
    );
    if (response && response.status === 200) {
      return response.data.data as string;
    }
    return false;
  }

  async function GuildPostList(
    guildId: number,
    data: {
      tag?: string;
      keyword?: string;
      sort?: 'LATEST' | 'POPULAR';
      page?: number;
      pageSize?: number;
    }
  ) {
    // console.log(data);
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostList(guildId), { params: { ...data } }, true);
    if (response && response.status === 200) {
      const postList = response.data.data.content.map((post: postType) => {
        return {
          postId: post.id,
          author_nickname: post.authorNickname,
          author_img: '',
          title: post.title,
          content: post.content,
          img_src: post.imageUrl,
          num_likes: post.likeCount,
          comments_num: post.commentCount,
          tag: post.tag,
        };
      });
      // console.log('postList', postList);
      return {
        totalElements: response.data.data.totalElements as number,
        totalPages: response.data.data.totalPages as number,
        size: response.data.data.size as number,
        content: postList as postSimple[],
      };
    }
    return false;
  }

  async function GuildPostCreate(guildId: number, data: createRequest) {
    const response = await axios.Post(GUILD_BOARD_ENDPOINTS.guildPostCreate(guildId), data, {}, true);
    console.log(response);
    if (response && (response.status === 200 || response.status === 201)) {
      return {
        boardId: response.data.data.id as number,
        presignedUrl: response.data.data.presignedUrl as string,
      };
    }
    console.log('길드 게시글 생성에 실패했습니다.');
    return false;
  }

  async function GuildPostCreateWithImg(guildId: number, data: createRequest, imageFile: File | null) {
    try {
      // 1. 게시글 생성
      const createResponse = await GuildPostCreate(guildId, data);
      if (createResponse && imageFile) {
        const { boardId, presignedUrl } = createResponse;
        // 2. S3 presigned URL로 이미지 업로드
        const s3Response = await uploadToS3(imageFile, presignedUrl);
        if (s3Response.success) {
          const imageUrl = s3Response.url;
          console.log('이미지 업로드 완료: ', imageUrl);
          // 3. 이미지 URL 서버에 등록
          await GuildPostImageUpload(guildId, boardId, imageUrl);
          console.log('길드 생성 완료(이미지O)');
          return true;
        }
      }
      console.log('길드 생성 완료(이미지X)');
      return true;
    } catch (error) {
      console.log('길드 생성 중 오류 발생: ', error);
    }
  }

  async function GuildPostLike(guildId: number, boardId: number) {
    const response = await axios.Post(GUILD_BOARD_ENDPOINTS.guildPostLike(guildId, boardId), {}, {}, true);
    if (response && response.status === 200) {
      return {
        liked: response.data.data.liked as boolean,
        likeCount: response.data.data.likeCount as number,
      };
    }
    return false;
  }

  async function GuildPostCommentCreate(guildId: number, boardId: number, comment: string) {
    const response = await axios.Post(
      GUILD_BOARD_ENDPOINTS.guildPostCommentCreate(guildId, boardId),
      { comment: comment },
      {},
      true
    );
    // console.log(response);
    if (response && response.status === 201) {
      return {
        id: response.data.data.id as number,
      };
    }
    return false;
  }

  async function GuildNoticesPost(guildId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildNoticesPost(guildId), {}, true);
    if (response && response.status === 200) {
      // return response.data.data as noticesPost[];
      const data = response.data.data as noticesPost[];
      const postData = data.map((post) => {
        return {
          postId: post.id,
          author_nickname: post.authorNickname,
          author_img: post.authorAvatar,
          title: post.title,
          content: post.content,
          img_src: post.imageUrl,
          num_likes: post.likeCount,
          comments_num: post.commentCount,
          tag: '공지',
        };
      });
      return postData as postSimple[];
    }
    return false;
    // throw new Error('Fail to fetch');
  }

  async function GuildLatestPost(guildId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildLatestPost(guildId), {}, true);
    if (response && response.status === 200) {
      // return response.data.data as noticesPost[];
      const data = response.data.data as noticesPost[];
      const postData = data.map((post) => {
        return {
          postId: post.id,
          author_nickname: post.authorNickname,
          author_img: post.authorAvatar,
          title: post.title,
          content: post.content,
          img_src: post.imageUrl,
          num_likes: post.likeCount,
          comments_num: post.commentCount,
          tag: post.tag,
        };
      });
      return postData as postSimple[];
    }
    return false;
  }

  async function GuildPostImageUpload(guildId: number, boardId: number, url: string) {
    const response = await axios.Post(
      GUILD_BOARD_ENDPOINTS.guildPostImageUpload(guildId, boardId),
      { url: url },
      {},
      true
    );
    console.log('GuildPostImageUpload Response: ', response);
    if (response && response.status === 204) {
      return true;
    }
    return false;
  }

  return {
    GuildPostDetail,
    GuildPostChange,
    GuildPostDelete,
    GuildPostCommentChange,
    GuildPostCommentDelete,
    GuildPostList,
    GuildPostCreate,
    GuildPostLike,
    GuildPostCommentCreate,
    GuildNoticesPost,
    GuildLatestPost,
    GuildPostImageUpload,
    GuildPostCreateWithImg,
    GuildPostChangeWithImg,
  };
};
