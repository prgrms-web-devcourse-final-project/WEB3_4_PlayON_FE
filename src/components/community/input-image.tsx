import { Image } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputImageProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
}

export default function InputImage({ onChange, previewUrl }: InputImageProps) {
  return (
    <>
      <div className="flex gap-4">
        <Label
          htmlFor="image"
          className="flex aspect-[16/9] min-w-[400px] max-w-[400px] rounded-xl border border-neutral-200 bg-white cursor-pointer justify-center items-center overflow-hidden"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="미리보기" className="object-cover w-full h-full" />
          ) : (
            <Image strokeWidth={1.6} className="text-neutral-300 size-10 place-self-center" />
          )}
        </Label>
        <Input
          type="file"
          id="image"
          onChange={onChange}
          className="text-neutral-500 font-normal file:text-neutral-700 w-[400px] bg-white"
        />
      </div>
    </>
  );
}
