import PixelCharacter from '@/components/PixelCharacter/PixelCharacter';

export default function Home() {
  return (
    <div>
      <p className=" text-center text-5xl p-5">Play ON!</p>
      <div className="flex">
        <PixelCharacter char="mage" motion="attack" />
        <PixelCharacter char="mage" motion="run" />
      </div>
      <PixelCharacter char="archer" motion="run" />
      <PixelCharacter char="warrior" motion="ulti" />
    </div>
  );
}
