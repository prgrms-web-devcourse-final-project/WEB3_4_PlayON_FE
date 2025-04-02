// import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

interface HeroTypingBannerProps {
  title: string;
  isStatic?: boolean;
  children?: ReactNode;
}

export default function HeroTypingBanner({ title, isStatic, children }: HeroTypingBannerProps) {
  if (isStatic) {
    return (
      <div style={{ backgroundImage: `url('hero2.png')` }} className="size-full bg-center bg-cover">
        <div className="size-full bg-purple-800/50 place-content-center place-items-center space-y-5">
          <p className="text-white font-suit font-extrabold text-6xl">{title}</p>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="size-full bg-purple-800">
      <div
        style={{ backgroundImage: `url('hero1.png')` }}
        className="size-full bg-top bg-cover blur-sm opacity-30 place-content-center place-items-center space-y-5"
      ></div>
      <p className="text-black font-suit font-extrabold text-6xl blur-none">{title}</p>
      {children}
    </div>
  );
}
