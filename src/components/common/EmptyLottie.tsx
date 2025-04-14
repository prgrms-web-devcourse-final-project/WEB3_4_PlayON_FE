import catAni from '@/assets/cat_search.json';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div className="w-[500px] h-[500px]"></div>,
});

type Props = {
  children?: ReactNode;
  text?: string;
  className?: string;
  imgWidth?: number;
};

export default function EmptyLottie({ children, text, className, imgWidth = 380 }: Props) {
  return (
    <div className={cn('relative text-center -translate-y-[18%] mx-auto', className)}>
      <p className="absolute font-dgm right-0 text-xl top-20 mt-8 w-1/3 text-purple-700">I Can&apos;t find Data...</p>
      <Lottie loop animationData={catAni} play className={`w-full max-w-[${imgWidth}px]`}></Lottie>
      <img src="/img/box_for_cat.svg" alt="box" className={`w-full max-w-[${imgWidth}px] absolute top-0 left-0`} />
      <div className="pl-8">
        <p className="font-dgm text-2xl text-purple-800">{text || '플레이어님을 기다리고 있어요!'}</p>
        {children}
      </div>
    </div>
  );
}
