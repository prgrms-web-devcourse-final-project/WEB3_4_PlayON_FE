import { gameSimple } from '@/types/games';

type SteamCardProps = {
  data: gameSimple;
  titleColor: string;
};

export default function SteamCard(props: SteamCardProps) {
  const { data } = props;
  const genreStr = data.genre.join(', ');

  return (
    <>
      <div className="flex flex-col gap-4">
        <img src={data.img_src} className="w-full aspect-square rounded-xl object-cover" />
        <div>
          <p className={`${props.titleColor} font-suit text-xl font-semibold`}> {data.title}</p>
          <p className={`text-sm text-neutral-400 font-medium`}> {genreStr}</p>
        </div>
      </div>
    </>
  );
}
