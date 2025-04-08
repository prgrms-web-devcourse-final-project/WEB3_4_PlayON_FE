import { comment } from '@/types/community';

interface CommentCardProps {
  data: comment;
}
export default function CommentCard({ data }: CommentCardProps) {
  return (
    <div className="flex gap-4 py-5">
      <div
        style={{ backgroundImage: `url(${data.user.img_src})` }}
        className="size-10 rounded-full bg-cover bg-center shrink-0"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="text-neutral-900 text-base">{data.user.nickname}</p>
          <p className="text-neutral-500 text-sm">{data.createdAt.toLocaleTimeString()}</p>
        </div>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
