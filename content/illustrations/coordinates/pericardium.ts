import type { CoordinateEntry } from './schema';

/**
 * Pericardium channel — 9 points. Chest point on torso-supine (nipple line
 * y=48, 5 cun lateral midline = x 35), upper arm/elbow on `arm`, distal
 * channel on `hand` pinned to the curated PC5/PC6/PC7 ladder.
 */
export const pericardiumCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'PC1',
    regionTemplate: 'torso-supine',
    marker: { x: 35, y: 48 },
    label: { x: 14, y: 40, text: 'PC1' },
    neighbors: [{ pointCode: 'LU1', x: 68, y: 40 }],
    note: 'On the chest · fourth intercostal space · 1 cun lateral to the nipple · 5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'PC2',
    regionTemplate: 'arm',
    marker: { x: 28, y: 40 },
    label: { x: 8, y: 34, text: 'PC2' },
    neighbors: [{ pointCode: 'PC3', x: 42, y: 64 }],
    note: 'Medial aspect of the arm · 2 cun below the anterior end of the axillary fold · between the heads of biceps brachii',
  },
  {
    pointCode: 'PC3',
    regionTemplate: 'arm',
    marker: { x: 42, y: 64 },
    label: { x: 38, y: 86, text: 'PC3' },
    neighbors: [
      { pointCode: 'PC2', x: 28, y: 40 },
      { pointCode: 'PC4', x: 65, y: 89 },
    ],
    note: 'At the cubital crease · on the ulnar side of the tendon of biceps brachii',
  },
  {
    pointCode: 'PC4',
    regionTemplate: 'arm',
    marker: { x: 65, y: 89 },
    label: { x: 84, y: 98, text: 'PC4' },
    neighbors: [{ pointCode: 'PC3', x: 42, y: 64 }],
    note: 'Palmar forearm · on the PC3–PC7 line · 5 cun above the wrist crease · between palmaris longus and flexor carpi radialis',
  },
  {
    pointCode: 'PC5',
    regionTemplate: 'hand',
    marker: { x: 60, y: 22 },
    label: { x: 90, y: 10, text: 'PC5' },
    neighbors: [
      { pointCode: 'PC6', x: 55, y: 30 },
      { pointCode: 'PC7', x: 48, y: 38 },
    ],
    note: 'Palmar forearm · on the PC3–PC7 line · 3 cun above the wrist crease · between the two tendons',
  },
  {
    pointCode: 'PC6',
    regionTemplate: 'hand',
    marker: { x: 55, y: 30 },
    label: { x: 88, y: 18, text: 'PC6' },
    neighbors: [
      { pointCode: 'PC7', x: 48, y: 38 },
      { pointCode: 'PC5', x: 60, y: 22 },
    ],
    note: 'Middle of inner wrist · 2 cun proximal to wrist crease · between palmaris longus and flexor carpi radialis',
  },
  {
    pointCode: 'PC7',
    regionTemplate: 'hand',
    marker: { x: 48, y: 38 },
    label: { x: 66, y: 46, text: 'PC7' },
    neighbors: [
      { pointCode: 'PC6', x: 55, y: 30 },
      { pointCode: 'PC8', x: 52, y: 62 },
    ],
    note: 'Midpoint of the palmar wrist crease · between the tendons of palmaris longus and flexor carpi radialis',
  },
  {
    pointCode: 'PC8',
    regionTemplate: 'hand',
    marker: { x: 52, y: 62 },
    label: { x: 76, y: 70, text: 'PC8' },
    neighbors: [
      { pointCode: 'PC7', x: 48, y: 38 },
      { pointCode: 'PC9', x: 52, y: 100 },
    ],
    note: 'Centre of the palm · between the second and third metacarpals, closer to the third · where the middle-finger tip rests in a fist',
  },
  {
    pointCode: 'PC9',
    regionTemplate: 'hand',
    marker: { x: 52, y: 100 },
    label: { x: 74, y: 110, text: 'PC9' },
    neighbors: [{ pointCode: 'PC8', x: 52, y: 62 }],
    note: 'At the centre of the tip of the middle finger',
  },
];
