import { XIcon } from 'lucide-react';

type ChipProps = {
  content: string;
  onClickDelete: (content: string) => void;
};

export default function Chip(props: ChipProps) {
  return (
    <div className="w-fit px-1 py-2 border border-neutral-300 gap-1 flex justify-center items-center rounded">
      <p className="font-suit text-xs text-neutral-400 uppercase">{props.content}</p>
      <XIcon
        className="text-neutral-400 cursor-pointer"
        height={14}
        width={14}
        onClick={() => props.onClickDelete(props.content)}
      />
    </div>
  );
}
