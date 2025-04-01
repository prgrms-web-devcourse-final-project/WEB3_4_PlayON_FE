import { ReactNode } from 'react';

import './style.css';

type RollingBannerProps = {
  className?: string;
  children: ReactNode[];
};

export default function RollingBanner(props: RollingBannerProps) {
  return (
    <div className={`flex items-center py-5 relative overflow-hidden ` + props.className}>
      {props.children.map((c, ind) => {
        const delay = (80 / props.children.length) * (props.children.length - (ind + 1)) * -1;
        return (
          <div className="item" key={ind} style={{ animationDelay: `${delay}s` }}>
            {c}
          </div>
        );
      })}
    </div>
  );
}
