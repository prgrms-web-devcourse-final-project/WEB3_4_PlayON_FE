import { Party } from '@/types/party';
import { Avatar } from '../ui/avatar';
import Tag from '../common/Tag';

interface PartyCardProps {
  data: Party;
}

export default function PartyCard({ data }: PartyCardProps) {
  const open_position = data.maximum - data.members.length;
  const remainingHours = getRemainingHours(data.party_at);

  return (
    <div className="flex flex-col gap-2 p-5 w-[410px] rounded-xl bg-white border-2 border-neutral-300 cursor-pointer">
      <div
        style={{
          backgroundImage: `url(${data.game_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="flex flex-col h-[160px] rounded-xl overflow-hidden justify-between group"
      >
        <div className="flex gap-2 ml-4 mt-4">
          {remainingHours >= 3 ? (
            <Tag style="time">{formatDate(data.party_at)}</Tag>
          ) : (
            <Tag style="time" background="red">
              {formatDate(data.party_at)}
            </Tag>
          )}
          {open_position === 1 && <Tag background="red">마감임박</Tag>}
          {open_position < 1 && <Tag background="red">마감</Tag>}
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
          {data.members.length - 4 >= 1 && (
            <div className="font-suit text-xs text-neutral-500">+{data.members.length - 4}</div>
          )}
        </div>
        <div className="font-suit text-sm text-neutral-500">전체 {data.maximum}명</div>
        {/* <div className="font-suit text-sm text-neutral-500">
          {data.members.length}/{data.maximum}
        </div> */}
      </div>
    </div>
  );
}

// 현재시간으로부터 몇 시간 남았는지 구하는 함수
function getRemainingHours(targetDate: Date) {
  const currentTime = new Date().getTime();
  const targetTime = targetDate.getTime();

  const timeDifference = targetTime - currentTime;

  return timeDifference / (1000 * 60 * 60);
}

// 날짜 포맷팅 함수
function formatDate(targetDate: Date) {
  return targetDate.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
