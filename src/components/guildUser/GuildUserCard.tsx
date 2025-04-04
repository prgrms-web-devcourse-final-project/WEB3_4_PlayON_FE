import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { guildUser } from "@/types/guild";
import { Crown, Star } from "lucide-react";

// interface guildUserCardProps {
//   data: Pick<guildUser, 'joined_at' | 'guild_role' | 'user'> & {
//     user: Pick<guildUser['user'], 'img_src' | 'user_title' | 'username'>
//   }};
// type guildUserCardProps = Pick<guildUser, 'joined_at' | 'guild_role' | 'user'> & {
//     user: Pick<guildUser['user'], 'img_src' | 'user_title' | 'username'>
//   };

type PickedUser = Pick<guildUser["user"], "img_src" | "user_title" | "username">;

type guildUserCardProps = Pick<guildUser, "joined_at" | "guild_role"> & {
  user: PickedUser;
};

export default function GuildUserCard(props: guildUserCardProps) {
  
  // const { data } = props;
  let badge;
  const joindDate = new Date(props.joined_at).toLocaleDateString("ko-KR")
  
  switch (props.guild_role) {
    case 'leader':
      badge = (
        <div className="bg-amber-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <Crown className="w-5 h-5 p-1" color="#ffffff" />
          {/* <img src="crown.svg" className="p-1" /> */}
        </div>
      );
      break;

    case 'manager':
      badge = (
        <div className="bg-red-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <Star className="w-5 h-5 p-1" color="#ffffff" />
          {/* <img src="star.svg" className="p-1" /> */}
        </div>
      );
      break;
    case 'user':
      badge = <div></div>;
  }

  return (
    <>
      <div className="box-content rounded-lg border border-neutral-300 px-6 py-8">
        <div className="flex gap-5">
          <div className="w-16 h-16 aspect-square relative ">
            <Avatar className="bg-neutral-400 w-16 h-16">
              <AvatarImage src={props.user.img_src} />
            </Avatar>
            {badge}

            {/* <div className="bg-amber-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
            </div> */}
          </div>
          <div className="">
            {props.user.user_title && (
              <p className="font-suit text-sm font-normal text-neutral-500">{props.user.user_title}</p>
            )}
            <p className="font-suit text-xl font-medium">{props.user.username}</p>
            {props.joined_at && <p className="font-suit text-sm font-normal text-neutral-500">가입일 : {joindDate}</p>}
          </div>
        </div>
      </div>
    </>
  );
}