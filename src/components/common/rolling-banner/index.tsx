import { ReactNode } from 'react';

import './style.css';

type RollingBannerProps = {
  className?: string;
  children: ReactNode[];
  duration: number;
  direction: 'left' | 'right';
};

export default function RollingBanner(props: RollingBannerProps) {
  function RollingBannerItem(child: ReactNode, key: string) {
    return (
      <div className="rolling-item flex items-center justify-center" key={key}>
        {child}
      </div>
    );
  }

  const scrollDirection = props.direction === 'left' ? 'scrollLeft' : 'scrollRight';

  return (
    <div className={`relative flex items-center overflow-hidden ${props.className}`}>
      <div
        style={{ animationDuration: `${props.duration}s`, animationName: `${scrollDirection}` }}
        className={`absolute rolling-list flex items-center gap-5`}
      >
        {props.children.map((e, ind) => {
          return RollingBannerItem(e, `RB_1_${ind}`);
        })}
        {props.children.map((e, ind) => {
          return RollingBannerItem(e, `RB_2_${ind}`);
        })}
      </div>
    </div>
  );
}
