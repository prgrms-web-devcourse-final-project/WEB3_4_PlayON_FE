type Game = {
  name: string;
  header_image: string;
};

interface SelectedGameCardProps {
  game: Game;
}

export default function SelectedGameCard({ game }: SelectedGameCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${game.header_image})` }}
      className="aspect-[410/180] rounded-2xl overflow-hidden bg-cover bg-center"
    >
      <div className="bg-gradient-to-r from-black/80 to-black/10 size-full px-8 py-12 place-content-center">
        <div className="text-white font-suit text-base font-normal">선택된 게임</div>
        <div className="text-white font-suit text-4xl font-bold">{game.name}</div>
      </div>
    </div>
  );
}
