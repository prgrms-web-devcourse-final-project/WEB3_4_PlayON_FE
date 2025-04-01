'use client';

import { MouseEventHandler, ReactNode, useState } from 'react';
import './style.css';

type RetroButtonProps = {
  children: ReactNode;
  type: 'purple';
  callback?: () => void;
  className?: string;
};

export default function RetroButton(props: RetroButtonProps) {
  const [tiltDirection, setTiltDirection] = useState('');
  const [active, setActive] = useState('');

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
  const mouseDownHandler: MouseEventHandler = () => {
    setActive('active');
  };
  const mouseUpHandler: MouseEventHandler = () => {
    if (props.callback) props.callback();
    setActive('');
  };
  return (
    <div className="relative">
      <div
        className={`retro-btn ${tiltDirection} ${active} ${props.type} ` + props.className}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={() => setTiltDirection('')}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      >
        {props.children}
      </div>
      <div className={`retro-btn-box-shadow ${tiltDirection} ${active} ${props.type} ` + props.className}></div>
      <div className={`retro-btn-shadow ${tiltDirection} ${active} ${props.type} ` + props.className}></div>
    </div>
  );
}
