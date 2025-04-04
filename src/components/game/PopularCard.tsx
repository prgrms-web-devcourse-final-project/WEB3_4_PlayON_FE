import { gameDetail } from "@/types/games";

interface PopularCardProps {
  data: Pick<gameDetail, "img_src" | "title" | "genre" >;
};

// type PopularCardProps = {
//   data: gameDetail;
// };

export default function PopularCard(props: PopularCardProps) {
  
  const { data } = props;
  
  return (
    <>
      <div>
        <img src={data.img_src} className="w-full aspect-[16/7] rounded-xl bg-neutral-400 object-cover" />
        {/* <div className="bg-neutral-400 w-full aspect-[16/7] rounded-xl"></div> */}
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {data.genre}</p>
      </div>
    </>
  );
}