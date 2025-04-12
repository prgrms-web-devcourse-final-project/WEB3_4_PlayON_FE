import { GUILD_BOARD_ENDPOINTS } from '@/constants/endpoints/guild-board';
import { useAxios } from '@/hooks/useAxios';
import { postSimple } from '@/types/community';
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
  };
  type guild = {
    id: number;
    name: string;
    description: string;
    guildImg: string;
    memberCount: number;
  };
  type post = {
    id: number;
    title: string;
    content: string;
    tag: string;
    hit: number;
    likeCount: number;
    imageUrl: string;
    authorNickname: string;
    comments: comment[];
    guild: guild;
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
  };
  type createRequest = { title: string; content: string; tag: string; fileType: string };
  type updateRequest = { title: string; content: string; tag: string; newFileType: string };

  // ⚠️ 동작은 하는데, createdAt 정보 없음
  async function GuildPostDetail(guildId: number, boardId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostDetail(guildId, boardId), {}, true);
    if (response && response.status === 200) {
      const postData = response.data.data as post;
      return postData;
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
    console.log(data);
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostList(guildId), { params: { ...data } }, true);
    if (response && response.status === 200) {
      return {
        totalElements: response.data.data.totalElements as number,
        totalPages: response.data.data.totalPages as number,
        size: response.data.data.size as number,
        content: response.data.data.content as post[],
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
          tag: '자유',
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
