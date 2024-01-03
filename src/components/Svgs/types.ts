import { HTMLAttributes } from 'react';

interface ISvg extends HTMLAttributes<SVGElement> {
  height?: number;
  width?: number;
}

export type { ISvg };
