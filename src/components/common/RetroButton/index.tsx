'use client';

import { MouseEventHandler, ReactNode, useState } from 'react';
import './style.css';

type RetroButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function RetroButton(props: RetroButtonProps) {
  const [tiltDirection, setTiltDirection] = useState('');

  const mouseMoveHandler: MouseEventHandler = (e) => {
    const bounds = (e.target as HTMLDivElement).getBoundingClientRect();
    const xPerc = ((e.clientX - bounds.left) / (bounds.right - bounds.left)) * 100;
    if (xPerc <= 30) {
      setTiltDirection('hover-left');
    } else if (xPerc >= 70) {
      setTiltDirection('hover-right');
    } else {
      setTiltDirection('hover');
    }
  };
  return (
    <div
      className={`retro-btn ${tiltDirection} ` + props.className}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={() => setTiltDirection('')}
    >
      {props.children}
    </div>
  );
}
