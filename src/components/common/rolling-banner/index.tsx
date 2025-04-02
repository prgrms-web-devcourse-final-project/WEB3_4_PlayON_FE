import { CSSProperties, ReactNode } from 'react';

import './style.css';

type RollingBannerProps = {
  className?: string;
  children: ReactNode[];
  speed: number;
  direction: 'left' | 'right';
};

export default function RollingBanner(props: RollingBannerProps) {
  function RollingBannerItem(child: ReactNode) {
    return <div className="rolling-item flex items-center justify-center">{child}</div>;
  }

  const scrollDirection = props.direction === 'left' ? 'scrollLeft' : 'scrollRight';

  return (
    <div className={`relative flex items-center overflow-hidden ${props.className}`}>
      <div
        style={{ animationDuration: `${props.speed}s`, animationName: `${scrollDirection}` }}
        className={`absolute rolling-list flex items-center gap-5`}
      >
        {props.children.map((e) => {
          return RollingBannerItem(e);
        })}
        {props.children.map((e) => {
          return RollingBannerItem(e);
        })}
      </div>
    </div>
  );
}
