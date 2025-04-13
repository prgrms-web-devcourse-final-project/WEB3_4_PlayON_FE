import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function AvatarNameSkeleton() {
  return (
    <div className="flex w-full gap-1 ">
      <Skeleton className="rounded-full h-4 w-4" />
      <Skeleton className="w-[10%]" />
    </div>
  );
}

export default function AvatarName(props: { userName: string; avatar: string }) {
  return (
    <div className="flex items-center h-4 gap-1">
      <Avatar className="h-[16px] w-[16px] object-cover rounded-full overflow-hidden">
        <AvatarImage src={props.avatar || '/img/dummy_profile.jpg'} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-xs font-medium gap-1">{props.userName}</p>
    </div>
  );
}
