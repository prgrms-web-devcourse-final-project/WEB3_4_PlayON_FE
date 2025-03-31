import { Party } from '@/types/party';
import { Avatar } from '../ui/avatar';
import Tag from '../common/Tag';

interface PartyCardProps {
  data: Party;
}

export default function PartyCard({ data }: PartyCardProps) {
  return (
    <div className="flex flex-col gap-2 p-5 w-[410px] rounded-xl border-2 border-neutral-100 cursor-pointer">
      <div
        style={{
          backgroundImage: `url(${data.game_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="flex flex-col h-[160px] rounded-xl overflow-hidden justify-between group"
      >
        <div className="flex gap-2 ml-4 mt-4">
          <Tag style="time">{data.party_at.toLocaleString()}</Tag>
          <Tag background="red">마감임박</Tag>
        </div>
        <div className="invisible relative bg-gradient-to-t from-neutral-900/70 to-neutral-900/0 p-4 h-28 group-hover:visible">
          <div className=" absolute bottom-2 right-4 font-suit text-4xl font-bold text-end text-white align-bottom">
            PICO PARK
          </div>
        </div>
      </div>
      <div className="flex gap-2 py-2">
        {data.party_tags.map((tag) => (
          <Tag background="medium" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex flex-col gap-1 content-start">
        <div className="font-suit text-2xl font-semibold line-clamp-1 text-neutral-900">{data.name}</div>
        <p className="font-suit text-base line-clamp-1 text-neutral-900">{data.description}</p>
      </div>
      <div className="flex py-2 justify-between">
        <div className="flex gap-1 items-center">
          {data.members.map((member, idx) =>
            idx < 4 ? (
              <Avatar
                key={idx}
                style={{
                  backgroundImage: `url(${member.image})`,
                }}
                className="bg-cover bg-center w-5 h-5"
              />
            ) : null
          )}
          {/* 인원이 4명보다 많아지면 +로 표시하기 */}
          <div className="font-suit text-xs text-neutral-500">+{data.members.length - 4}</div>
        </div>
        <div className="font-suit text-sm text-neutral-500">전체 {data.members.length}명</div>
      </div>
    </div>
  );
}
