import GuildFullimage from "@/components/guild/guild-fullimage";
import GuildHorizon from "@/components/guild/guild-horizon";
import GuildVertical from "@/components/guild/guild-vertical";
import guild from "@/types/guild";

export default function Guild() {
  const dummyData: guild = {
    name: "건전한 길드명",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius massa et nulla vehicula pulvinar. Morbi mattis sem in nibh tristique, in commodo sapien hendrerit. Cras vel libero aliquam, pretium est vitae, cursus nulla. Morbi blandit nisl erat, eget fermentum diam suscipit id. Curabitur risus sem, pretium ac lacus vel, ultricies venenatis orci. Ut at lorem non urna egestas egestas in nec leo. Duis sagittis egestas nunc, vitae lobortis nisl elementum quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean at rhoncus dolor. Curabitur accumsan eget leo a ornare.",
    numMembers: 10,
    guildTags: ["건전한", "GUILD", "태그"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg?t=1742975808",
  };

  return (
    <div>
      <p className="text-center text-5xl p-5">Guild</p>
      <div className="flex justify-center gap-2 mb-5">
        <GuildHorizon data={dummyData} className="w-[25%]" />
        <GuildHorizon data={dummyData} className="w-[25%]" />
        <GuildHorizon data={dummyData} className="w-[25%]" />
      </div>
      <div className="flex flex-col items-center gap-2 mb-5">
        <GuildVertical data={dummyData} className="w-[50%] h-[200px]" />
        <GuildVertical data={dummyData} className="w-[50%] h-[200px]" />
        <GuildVertical data={dummyData} className="w-[50%] h-[200px]" />
      </div>
      <div className="flex justify-center gap-2 mb-5">
        <GuildFullimage data={dummyData} className="w-[25%]" />
        <GuildFullimage data={dummyData} className="w-[25%]" />
        <GuildFullimage data={dummyData} className="w-[25%]" />
      </div>
    </div>
  );
}
