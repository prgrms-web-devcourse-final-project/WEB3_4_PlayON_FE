import CommunityPostImageLong from '@/components/community/post-image-long';
import communityPost from '@/types/communityPosts';

export default function Community() {
  const dummy: communityPost = {
    userName: '',
    description: '',
    imageUrl: '',
    numComments: 10,
    numLikes: 50,
    tags: [],
    title: '',
    userAvatar: '',
  };

  return (
    <div>
      <p className="text-center text-5xl p-5">Community</p>
      <CommunityPostImageLong data={dummy} className="" />
    </div>
  );
}
