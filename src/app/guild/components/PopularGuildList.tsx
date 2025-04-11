import GuildHorizon from '@/components/guild/guild-horizon';
import { guild } from '@/types/guild';

export default function PopularGuildList(data: guild[]) {
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {data.map((guild) => (
          <GuildHorizon key={guild.guild_id} data={guild} />
        ))}
      </div>
    </>
  );
}
