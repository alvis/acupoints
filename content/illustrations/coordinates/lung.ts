import type { CoordinateEntry } from './schema';

/**
 * Lung channel — 11 points. Chest pair on torso-supine (6 cun lateral midline
 * = x 68; clavicle/1st-ICS band y 34–40), upper arm on `arm` (axillary fold
 * (26,32), ≈3.6 units/cun), distal channel on `hand` pinned to curated LU7.
 */
export const lungCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'LU1',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 40 },
    label: { x: 88, y: 32, text: 'LU1' },
    neighbors: [{ pointCode: 'LU2', x: 68, y: 34 }],
    note: 'Upper outer chest · 1 cun below LU2 · level with the first intercostal space · 6 cun lateral to the anterior midline',
  },
  {
    pointCode: 'LU2',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 34 },
    label: { x: 88, y: 26, text: 'LU2' },
    neighbors: [{ pointCode: 'LU1', x: 68, y: 40 }],
    note: 'Upper outer chest · in the depression below the lateral end of the clavicle · 6 cun lateral to the anterior midline',
  },
  {
    pointCode: 'LU3',
    regionTemplate: 'arm',
    marker: { x: 28, y: 43 },
    label: { x: 8, y: 34, text: 'LU3' },
    neighbors: [{ pointCode: 'LU4', x: 30, y: 48 }],
    note: 'Medial aspect of the arm · on the radial border of biceps brachii · 3 cun below the anterior end of the axillary fold',
  },
  {
    pointCode: 'LU4',
    regionTemplate: 'arm',
    marker: { x: 30, y: 48 },
    label: { x: 10, y: 56, text: 'LU4' },
    neighbors: [
      { pointCode: 'LU3', x: 28, y: 43 },
      { pointCode: 'LU5', x: 48, y: 65 },
    ],
    note: 'Medial aspect of the arm · radial border of biceps brachii · 4 cun below the axillary fold · 5 cun above the cubital crease',
  },
  {
    pointCode: 'LU5',
    regionTemplate: 'arm',
    marker: { x: 48, y: 65 },
    label: { x: 44, y: 88, text: 'LU5' },
    neighbors: [
      { pointCode: 'LU4', x: 30, y: 48 },
      { pointCode: 'LU6', x: 61, y: 82 },
    ],
    note: 'At the cubital crease · in the depression on the radial side of the tendon of biceps brachii',
  },
  {
    pointCode: 'LU6',
    regionTemplate: 'arm',
    marker: { x: 61, y: 82 },
    label: { x: 82, y: 92, text: 'LU6' },
    neighbors: [{ pointCode: 'LU5', x: 48, y: 65 }],
    note: 'Radial aspect of the palmar forearm · on the line connecting LU5 and LU9 · 7 cun above the wrist crease',
  },
  {
    pointCode: 'LU7',
    regionTemplate: 'hand',
    marker: { x: 42, y: 28 },
    label: { x: 18, y: 14, text: 'LU7' },
    neighbors: [
      { pointCode: 'LU8', x: 38, y: 38 },
      { pointCode: 'LU9', x: 34, y: 46 },
    ],
    note: 'Radial side of wrist · 1.5 cun proximal to styloid process of radius · in a depression above the styloid',
  },
  {
    pointCode: 'LU8',
    regionTemplate: 'hand',
    marker: { x: 38, y: 38 },
    label: { x: 14, y: 30, text: 'LU8' },
    neighbors: [
      { pointCode: 'LU7', x: 42, y: 28 },
      { pointCode: 'LU9', x: 34, y: 46 },
    ],
    note: 'Radial aspect of the palmar forearm · in the depression between the radial styloid and the radial artery · 1 cun above the wrist crease',
  },
  {
    pointCode: 'LU9',
    regionTemplate: 'hand',
    marker: { x: 34, y: 46 },
    label: { x: 8, y: 56, text: 'LU9' },
    neighbors: [
      { pointCode: 'LU8', x: 38, y: 38 },
      { pointCode: 'LU10', x: 63, y: 60 },
    ],
    note: 'Radial end of the palmar wrist crease · where the pulse of the radial artery is palpable',
  },
  {
    pointCode: 'LU10',
    regionTemplate: 'hand',
    marker: { x: 63, y: 60 },
    label: { x: 88, y: 70, text: 'LU10' },
    neighbors: [
      { pointCode: 'LU9', x: 34, y: 46 },
      { pointCode: 'LU11', x: 87, y: 62 },
    ],
    note: 'Behind the first metacarpophalangeal joint · midpoint of the first metacarpal on the radial side · at the junction of the red and white skin',
  },
  {
    pointCode: 'LU11',
    regionTemplate: 'hand',
    marker: { x: 87, y: 62 },
    label: { x: 92, y: 80, text: 'LU11' },
    neighbors: [{ pointCode: 'LU10', x: 63, y: 60 }],
    note: 'On the thumb · 0.1 cun from the corner of the nail · radial side of the distal phalanx',
  },
];
