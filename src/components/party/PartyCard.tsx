import { Avatar } from '../ui/avatar';

// interface PartyCardProps {
//   image: string;
//   tags: string[];
// }

export default function PartyCard() {
  // 나중에는 props로 받아오기
  const image = 'test.png';

  return (
    <div className="flex flex-col gap-2 p-5 w-[410px] rounded-xl border-2 border-neutral-100">
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="h-[160px] rounded-xl"
      >
        <div className="ml-[14px] mt-[14px] flex gap-2">
          <div className="font-suit text-xs py-1 px-2 bg-neutral-100 rounded-sm">
            #tag name
          </div>
          <div className="font-suit text-xs py-1 px-2 bg-neutral-100 rounded-sm">
            마감임박
          </div>
        </div>
      </div>
      <div className="flex gap-2 py-2">
        {/* 나중에 tag 컴포넌트로 수정 */}
        <div className="font-suit text-xs py-1 px-2 bg-neutral-200 rounded-sm">
          #tag name
        </div>
      </div>
      <div className="flex flex-col gap-1 content-start">
        <div className="font-suit text-2xl">파티명</div>
        <p className="font-suit text-base line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sint?
        </p>
      </div>
      <div className="flex py-2 justify-between">
        <div className="flex gap-1 items-center">
          <Avatar className="bg-neutral-200 w-5 h-5" />
          <Avatar className="bg-neutral-200 w-5 h-5" />
          <Avatar className="bg-neutral-200 w-5 h-5" />
          <Avatar className="bg-neutral-200 w-5 h-5" />
          {/* 인원이 4명보다 많아지면 +로 표시하기 */}
          <div className="font-suit text-xs text-neutral-500">+2</div>
        </div>
        <div className="font-suit text-sm text-neutral-500">전체 0명</div>
      </div>
    </div>
  );
}
