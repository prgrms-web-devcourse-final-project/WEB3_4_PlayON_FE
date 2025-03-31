import CommunityPostImageLong from '@/components/community/post-image-long';
import CommunityPostImageShort from '@/components/community/post-image-short';
import CommunityPostLong from '@/components/community/post-long';
import CommunityPostShort from '@/components/community/post-short';
import communityPost from '@/types/communityPosts';

export default function Community() {
  const dummy: communityPost = {
    userName: 'Morty',
    description:
      'Ut rutrum dictum nibh, nec tincidunt lectus ornare at. Fusce auctor mi a nibh egestas, vitae venenatis nunc posuere. Suspendisse sagittis eu magna vel tincidunt. Nullam nunc ipsum, volutpat eu cursus at, pharetra id magna. Nunc vehicula augue eget tortor aliquam porta. Suspendisse lorem diam, laoreet ut ipsum id, sagittis sagittis eros. Etiam tempus ligula vel tristique tempor. Aenean finibus dui erat, eu feugiat dui lacinia non.',
    imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1509960/header.jpg?t=1740033204',
    numComments: 10,
    numLikes: 50,
    tags: ['Adventure', 'Time!'],
    title: '릭 앤 모티',
    userAvatar: 'https://avatars.githubusercontent.com/u/124599?v=4',
  };

  return (
    <div>
      <p className="text-center text-5xl p-5">Community</p>
      <div className="flex flex-col items-center gap-1">
        <CommunityPostImageLong data={dummy} className="w-[1282px] h-[177px]" />
        <CommunityPostImageShort data={dummy} className="w-[628px] h-[177px]" />
        <CommunityPostLong data={dummy} className="w-[1282px] h-[177px]" />
        <CommunityPostShort data={dummy} className="w-[628px] h-[177px]" />
      </div>
    </div>
  );
}
