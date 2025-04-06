import { gameSimple } from '@/types/games';
import { PopularGameCard } from './PopularGameCard';

interface PopularGameListProps {
  data: gameSimple[];
}

export default function PopularGameList({ data }: PopularGameListProps) {
  return (
    <div
      className="w-full lg:aspect-[213/100] grid lg:grid-cols-4 lg:grid-rows-[repeat(2,_minmax(0,_1fr))] md:grid-cols-2 md:grid-rows-[repeat(7,_minmax(0,_100px))] gap-6
        sm:grid-cols-2 sm:grid-rows-[repeat(7,_minmax(0,_100px))]"
    >
      <div className=" lg:row-span-2 lg:col-span-2 md:row-span-3 md:col-span-2 sm:row-span-3 sm:col-span-2">
        <PopularGameCard data={data[0]} size="large" />
      </div>
      <div className=" lg:row-span-1 lg:col-span-2 md:row-span-2 md:col-span-2 md:row-start-4 sm:row-span-2 sm:col-span-2 sm:row-start-4">
        <PopularGameCard data={data[1]} size="medium" />
      </div>
      <div className=" lg:row-span-1 lg:col-span-1 md:row-span-2 md:col-span-1 md:row-start-6 md:col-start-1 sm:row-span-2 sm:col-span-1 sm:row-start-6 sm:col-start-1">
        <PopularGameCard data={data[2]} size="small" />
      </div>
      <div className=" lg:row-span-1 lg:col-span-1 md:row-span-2 md:col-span-1 md:row-start-6 md:col-start-2 sm:row-span-2 sm:col-span-1 sm:row-start-6 sm:col-start-2">
        <PopularGameCard data={data[3]} size="small" />
      </div>
    </div>
  );
}
