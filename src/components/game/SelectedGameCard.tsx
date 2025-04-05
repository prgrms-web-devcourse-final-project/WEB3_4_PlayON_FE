import { gameSimple } from '@/types/games';

interface SelectedGameCardProps {
  data: gameSimple;
}

export default function SelectedGameCard({ data }: SelectedGameCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${data.img_src})` }}
      className="aspect-[410/180] rounded-2xl overflow-hidden bg-cover bg-center group"
    >
      <div className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-black/80 to-black/10 size-full px-8 py-12 place-content-center transition-all">
        <div className="text-white font-suit text-base font-normal ">선택된 게임</div>
        <div className="text-white font-suit text-4xl font-bold truncate">{data.title}</div>
      </div>
    </div>
  );
}
