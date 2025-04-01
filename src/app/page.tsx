import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';

export default function Home() {
  return (
    <div>
      <p className=" text-center text-5xl p-5">Play ON!</p>
      <div className="flex justify-center">
        <RetroButton className="w-[200px] h-[50px] font-suit font-semibold">Hello World!</RetroButton>
      </div>
    </div>
  );
}
