import { MouseEventHandler, TouchEventHandler } from 'react';
import styles from './styles.module.css';

interface PixelProps {
  color: string;
  index: number;
  onMouseDown: MouseEventHandler<HTMLDivElement>
  onMouseEnter: MouseEventHandler<HTMLDivElement>
  onTouchStart: TouchEventHandler<HTMLDivElement>
  onTouchMove: TouchEventHandler<HTMLDivElement>
}

export function Pixel({ color, onMouseDown, onMouseEnter, onTouchStart, onTouchMove, index }: PixelProps) {
  return (
    <div
      data-index={index}
      className={styles.pixel}
      style={{ backgroundColor: color }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    ></div>
  );
}
