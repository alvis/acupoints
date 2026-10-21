import { cn } from '@/utilities/cn';

import { selectedMark, markPosition } from './chartMarks';

import type { FC } from 'react';

import type { ChartPoint, ChartPlate, PlateSize, PointChartProps } from './PointChart';

const UNSELECTED_RADIUS = 2.3;

type PlateDrawingProps = Pick<PointChartProps, 'figure' | 'copy'> & {
  tall: boolean;
  plate: ChartPlate | undefined;
  current: ChartPoint;
  size: PlateSize;
  mark: number;
  selected: number;
  onPlate: Array<{ point: ChartPoint; index: number }>;
  isSealed: (code: string) => boolean;
  pickFromPlate: (index: number) => void;
};

export const PlateDrawing: FC<Readonly<PlateDrawingProps>> = ({
  figure,
  tall,
  copy,
  plate,
  current,
  size,
  onPlate,
  selected,
  isSealed,
  mark,
  pickFromPlate,
}) => (
  <div className="flex items-start gap-4">
    {figure ? <div className="w-[28%] max-w-[150px] shrink-0">{figure}</div> : null}
    <div
      className={cn(
        'relative mx-auto w-full flex-1',
        tall
          ? 'max-w-[360px]'
          : `max-w-[400px]`,
      )}>
      <svg
        aria-label={copy.plateAria
          .replace('{plate}', plate?.label ?? '')
          .replace('{code}', current.code)
          .replace('{name}', current.name)}
        className="block h-auto w-full"
        role="img"
        viewBox={`${size.x ?? 0} ${size.y ?? 0} ${size.width} ${size.height}`}>
        {plate?.base}
        {onPlate.map(({ point, index }) =>
          index === selected ? null : (
            <circle
              cx={point.x}
              cy={point.y}
              fill={isSealed(point.code) ? 'var(--color-cinnabar)' : 'var(--color-paper)'}
              key={point.code}
              r={UNSELECTED_RADIUS * mark}
              stroke="var(--color-cinnabar)"
              strokeWidth={mark}
            />
          ),
        )}
        {selectedMark(current, size, mark)}
      </svg>
      <div aria-hidden="true" className="absolute inset-0">
        {onPlate.map(({ point, index }) => (
          <button
            className="
              absolute size-[22px] -translate-1/2 cursor-pointer rounded-full
              border-0 bg-transparent p-0
            "
            key={point.code}
            style={markPosition(point, size)}
            tabIndex={-1}
            type="button"
            onClick={() => pickFromPlate(index)}
          />
        ))}
      </div>
    </div>
  </div>
);
