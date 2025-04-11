import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionBannerProps {
  introText?: string;
  description: string;
  highlight: string;
  children: ReactNode[] | ReactNode; // icon 넣기
  className?: string;
  onClick?: () => void;
}
export default function SectionBanner({
  introText,
  description,
  highlight,
  children,
  className,
  onClick,
}: SectionBannerProps) {
  return (
    <div
      className={cn(
        'w-full h-60 bg-purple-500 rounded-xl px-16 py-12 flex items-center justify-between cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className={`flex flex-col h-full ${introText ? 'justify-between' : 'justify-center'}`}>
        {introText && <p className="text-2xl text-white font-light">{introText}</p>}
        <div className="text-white">
          <p className="text-4xl font-light leading-9">{description}</p>
          <p className="text-[40px] font-bold">{highlight}</p>
        </div>
      </div>
      <div className="flex gap-14">{children}</div>
    </div>
  );
}
