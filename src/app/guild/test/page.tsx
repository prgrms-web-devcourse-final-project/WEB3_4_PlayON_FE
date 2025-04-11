'use client';

import { useGuild } from '@/api/guild';
import { useGuildBoard } from '@/api/guildBoard';
import { useGuildJoin } from '@/api/guildJoin';
import UserApprove from '@/app/party/components/UserApprove';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdditionalInfo, GuildCreateRequest, GuildLIstRequest, GuildUpdateRequest } from '@/types/guildApi';
import { ChangeEvent, useState } from 'react';

export default function Test() {
  const Guild = useGuild();
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<AdditionalInfo[]>();

  const newData_create: GuildCreateRequest = {
    name: '테스트 최종!! 이미지 추가22',
    description: '테스트입니다.',

    maxMembers: 3,
    isPublic: true,
    appid: 1,
    fileType: 'webp',
    tags: [
      { type: '파티 스타일', value: '스피드러너' },
      { type: '파티 스타일', value: '맛보기' },
      { type: '게임 실력', value: '마스터' },
      { type: '성별', value: '여자만' },
      { type: '친목', value: '친목 환영' },
    ],
  };

  const newData_update: GuildUpdateRequest = {
    name: '테스트 최종 수정입니다',
    description: 'test2 test2',
    maxMembers: 3,
    isPublic: true,
    appid: 1,
    newFileType: 'jpg',
    tags: [
      { type: '파티 스타일', value: '스피드러너' },
      { type: '파티 스타일', value: '맛보기' },
      { type: '게임 실력', value: '마스터' },
      { type: '성별', value: '여자만' },
      { type: '친목', value: '친목 환영' },
      { type: '게임 실력', value: '해커' },
    ],
  };

  const guildListRequestData: GuildLIstRequest = {
    name: '테스트',
    appids: [],
    tags: [
      { type: '파티 스타일', value: '전체' },
      { type: '게임 실력', value: '전체' },
      { type: '성별', value: '전체' },
      { type: '친목', value: '전체' },
    ],
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const createGuild = async () => {
    await Guild.CreateGuildWithImg(newData_create, image);
    // console.log(response);
  };
  const updateGuild = async () => {
    await Guild.UpdateGuildWithImg(37, newData_update, image);
    // console.log(response);
  };

  const getGuildList = async () => {
    const response = await Guild.GetGuildList(guildListRequestData, 0);
    console.log(response);
  };
  const getGuildMembers = async () => {
    const response = await Guild.GetGuildMembers(33);
    console.log(response);
    // console.log(typeof response[0].memberId);
  };

  //  GuildJoin -----------------------------------------------
  const GuildJoin = useGuildJoin();

  const handleClickJoin = async () => {
    await GuildJoin.RequestGuildJoin(33);
  };
  const handleClickList = async () => {
    const data = await GuildJoin.GetGuildJoinRequests(33);
    if (data) {
      setData(data);
    }
  };
  const handleReject = async () => {
    await GuildJoin.RejectGuildJoin(33, 33);
  };
  const handleApprove = async () => {
    await GuildJoin.ApproveGuildJoin(33, 35);
  };

  // GuildBoard -----------------------------------------------
  const GuildBoard = useGuildBoard();

  const newPostData = {
    title: '자유 게시판 테스트2',
    content: 'test test',
    tag: '자유',
    fileType: 'webp',
  };
  const updatePostData = {
    title: '자유 게시판 webp를 jpg로 수정',
    content: 'test test',
    tag: '자유',
    newFileType: 'jpg',
  };

  const createPost = async () => {
    const response = await GuildBoard.GuildPostCreateWithImg(33, newPostData, image);
    console.log(response);
  };
  const updatePost = async () => {
    const response = await GuildBoard.GuildPostChangeWithImg(33, 41, updatePostData, image);
    console.log(response);
  };

  const getPostList = async () => {
    const response = await GuildBoard.GuildPostList(33, { keyword: '자유' });
    console.log(response);
  };
  const getPostDetail = async () => {
    const response = await GuildBoard.GuildPostDetail(33, 40);
    console.log(response);
  };
  const getLatestPost = async () => {
    const response = await GuildBoard.GuildLatestPost(33);
    console.log(response);
  };
  const getNoticesPost = async () => {
    const response = await GuildBoard.GuildNoticesPost(33);
    console.log(response);
  };
  const deletePost = async () => {
    const response = await GuildBoard.GuildPostDelete(33, 42);
    console.log(response);
  };
  const LikePost = async () => {
    const response = await GuildBoard.GuildPostLike(33, 40);
    console.log(response);
  };
  // 댓글
  const createComment = async () => {
    const response = await GuildBoard.GuildPostCommentCreate(33, 40, '최종 테스트!');
    console.log(response);
  };
  const updateComment = async () => {
    const response = await GuildBoard.GuildPostCommentChange(33, 40, 36, '최종 테스트!수정한 댓글');
    console.log(response);
  };
  const deleteComment = async () => {
    const response = await GuildBoard.GuildPostCommentDelete(33, 40, 36);
    console.log(response);
  };

  return (
    <div className="wrapper mt-32 mb-32">
      <Input type="file" onChange={handleChange} className="w-[500px]" />
      <div className="flex flex-col gap-4 items-start">
        <div className="inline-flex flex-col gap-5 mt-6 border border-neutral-300 p-4">
          <Button onClick={createGuild} className="bg-purple-500">
            길드 생성
          </Button>
          <Button onClick={updateGuild} className="bg-purple-400">
            37번 길드 수정
          </Button>
          <Button onClick={getGuildList} className="bg-purple-500">
            길드 리스트 보기
          </Button>
          <Button onClick={getGuildMembers} className="bg-purple-500">
            길드 멤버 보기
          </Button>
        </div>
        <div className="inline-flex flex-col gap-5 mt-6 border border-neutral-300 p-4">
          <Button onClick={handleClickJoin}>길드 참여 요청보내기</Button>
          <Button onClick={handleClickList}>길드 요청 리스트 확인</Button>
          <Button onClick={handleReject}>33번 요청 취소</Button>
          <Button onClick={handleApprove}>35번 요청 승인</Button>
          {data && <UserApprove data={data[0]} onApprove={() => {}} onReject={() => {}} />}
        </div>
        <div className="flex gap-5 mt-6 border border-neutral-300 p-4">
          <div className="flex flex-col gap-5">
            <Button onClick={createPost}>길드 게시글 생성</Button>
            <Button onClick={updatePost}>길드 게시글 수정</Button>
            <Button onClick={getPostList}>길드 게시글 목록 보기</Button>
            <Button onClick={getPostDetail}>길드 게시글 상세 보기</Button>
            <Button onClick={getLatestPost}>길드 최신글 보기</Button>
            <Button onClick={getNoticesPost}>길드 공지 보기</Button>
            <Button onClick={deletePost}>42번 게시글 삭제</Button>
            <Button onClick={LikePost}>40번 게시글 좋아요</Button>
          </div>
          <div className="flex flex-col gap-5">
            <Button onClick={createComment}> 40번 게시글 댓글 작성</Button>
            <Button onClick={updateComment}> 40번 게시글 36번 댓글 수정</Button>
            <Button onClick={deleteComment}> 40번 게시글 36번 댓글 삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
