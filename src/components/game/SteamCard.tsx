import { gameSimple } from '@/types/games';

type SteamCardProps = {
  data: gameSimple;
  theme: 'light' | 'dark';
  className?: string;
  selected?: boolean;
};

export default function SteamCard(props: SteamCardProps) {
  const { data } = props;
  const genreStr = data.genre.join(', ');

  return (
    <>
      <div className={`flex flex-col gap-4 rounded-xl p-2 ${props.className}`}>
        <div
          className={`transition-all rounded-xl p-1 ${props.selected ? 'outline outline-4' : ''} ${props.theme === 'light' ? 'outline-purple-500' : 'outline-purple-200'}`}
        >
          <img src={data.img_src} className={`w-full aspect-square rounded-xl object-cover`} />
        </div>
        <div className="p-2">
          <p
            className={`${props.theme === 'light' ? 'text-black' : 'text-white'} line-clamp-1 font-suit text-xl font-semibold`}
          >
            {' '}
            {data.title}
          </p>
          <p className={`text-sm text-neutral-400 font-medium line-clamp-2`}> {genreStr}</p>
        </div>
      </div>
    </>
  );
}
