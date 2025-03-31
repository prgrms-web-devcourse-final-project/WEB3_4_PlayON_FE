import communityPost from '@/types/communityPosts';

type CommunityPostImageLongProps = {
  data: communityPost;
  className: string;
};

export default function CommunityPostImageLong(props: CommunityPostImageLongProps) {
  return (
    <div className={`flex ` + props.className}>
      <img src={props.data.imageUrl} alt="Loading" className="h-full aspect-[1/1]" />
      <div className="flex flex-col">
        <div>Avatar</div>
        <div className="flex"></div>
        <p>{props.data.title}</p>
        <p>{props.data.description}</p>
      </div>
    </div>
  );
}
