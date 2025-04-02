import { Avatar } from "@/components/ui/avatar";
import { guildUser } from "@/types/guildUser";

type guildUserCardProps = {
  data: guildUser;
  memberLevel: string; // leader, manager, user
  // avatarClassName: string;
};



export default function GuildUserCard(props: guildUserCardProps) {
  
  const { data, memberLevel } = props;
  let badge;
  
  switch (memberLevel) {
    case 'leader':
      badge = (
        <div className="bg-amber-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <img src="crown.svg" className="p-1" />
        </div>
      );
      break;

    case 'manager':
      badge = (
        <div className="bg-red-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
          <img src="star.svg" className="p-1" />
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
            <Avatar className="bg-neutral-400 w-16 h-16" />
            {badge}

            {/* <div className="bg-amber-300 rounded-full w-5 h-5 absolute bottom-0 right-0">
            </div> */}
          </div>
          <div className="">
            {data.userTitle && <p className="font-suit text-sm font-normal text-neutral-500">{data.userTitle}</p>}
            <p className="font-suit text-xl font-medium">{data.name}</p>
            {data.guildJoinDate && (
              <p className="font-suit text-sm font-normal text-neutral-500">가입일 : {data.guildJoinDate}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}