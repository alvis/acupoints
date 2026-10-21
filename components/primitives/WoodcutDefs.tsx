import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

/**
 * Mount once per document (the locale layout does). Defines the knife-edge
 * displacement filters every carved figure references.
 */
export const WoodcutDefs: FC = () => {
  return (
    <svg aria-hidden="true" className="absolute" focusable="false" height="0" width="0">
      <defs>
        <filter id={CUT_FILTER}>
          <feTurbulence baseFrequency="0.09" numOctaves="2" seed="5" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </defs>
    </svg>
  );
};
