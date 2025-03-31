import { cn } from '@/lib/utils';
import { ClockIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface TagProps {
  size?: 'small' | 'big';
  style?: 'default' | 'retro' | 'time';
  background?: 'dark' | 'medium' | 'light' | 'red';
  children: ReactNode;
  className?: string;
}

export default function Tag({
  size = 'small',
  style = 'default',
  background = 'light',
  children,
  className,
}: TagProps) {
  console.log(size, style, background);
  return (
    <div
      className={cn(
        'inline-flex rounded-sm items-center gap-1 font-suit text-neutral-900 font-medium',
        // size
        {
          'px-2 py-1 text-xs': size === 'small',
          'px-3 py-1 text-base': size === 'big',
        },
        // style
        {
          'font-dgm py-[6px] px-2 leading-4 font-normal': style === 'retro',
        },
        // background
        {
          'bg-white': background === 'light',
          'bg-black/10': background === 'medium',
          'bg-black text-white': background === 'dark',
          'bg-cherry-main text-white': background === 'red',
        },
        className
      )}
    >
      {style === 'time' && <ClockIcon size={14} />}
      {children}
    </div>
  );
}
