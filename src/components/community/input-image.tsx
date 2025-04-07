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
      <Label>
        <Input type="file" id="image" onChange={onChange} className="hidden" />
        <div className="flex w-full h-[180px] rounded-xl border border-neutral-300 bg-white cursor-pointer justify-center items-center overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="미리보기" className="object-cover w-full h-full" />
          ) : (
            <Image strokeWidth={1.6} className="text-neutral-300 size-10" />
          )}
        </div>
      </Label>
    </>
  );
}
