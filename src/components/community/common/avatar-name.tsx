import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export default function AvatarName(props: { userName: string; avatar: string }) {
  return (
    <div className="flex items-center h-4 gap-1">
      <Avatar className="h-[16px] w-[16px] object-cover rounded-full overflow-hidden">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-xs font-medium gap-1">{props.userName}</p>
    </div>
  );
}
