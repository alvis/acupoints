import type { CoordinateEntry } from './schema';

/**
 * Heart channel — 9 points. Upper arm on `arm` (axilla apex (25,31),
 * cubital crease medial end (30,64)), distal channel on `hand` pinned to
 * curated HT7 with the curated HT6 proximal ladder direction.
 */
export const heartCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'HT1',
    regionTemplate: 'arm',
    marker: { x: 25, y: 31 },
    label: { x: 6, y: 24, text: 'HT1' },
    neighbors: [{ pointCode: 'HT2', x: 27, y: 53 }],
    note: 'In the axilla · at the apex of the axillary fossa where the pulse of the axillary artery is palpable',
  },
  {
    pointCode: 'HT2',
    regionTemplate: 'arm',
    marker: { x: 27, y: 53 },
    label: { x: 8, y: 60, text: 'HT2' },
    neighbors: [
      { pointCode: 'HT1', x: 25, y: 31 },
      { pointCode: 'HT3', x: 30, y: 64 },
    ],
    note: 'Medial aspect of the arm · on the HT1–HT3 line · 3 cun above the cubital crease · in the medial groove of biceps brachii',
  },
  {
    pointCode: 'HT3',
    regionTemplate: 'arm',
    marker: { x: 30, y: 64 },
    label: { x: 10, y: 76, text: 'HT3' },
    neighbors: [{ pointCode: 'HT2', x: 27, y: 53 }],
    note: 'With the elbow flexed · midway between the medial end of the cubital crease and the medial epicondyle of the humerus',
  },
  {
    pointCode: 'HT4',
    regionTemplate: 'hand',
    marker: { x: 23, y: 20 },
    label: { x: 4, y: 10, text: 'HT4' },
    neighbors: [{ pointCode: 'HT5', x: 24, y: 27 }],
    note: 'Palmar forearm · radial border of flexor carpi ulnaris tendon · 1.5 cun above the wrist crease',
  },
  {
    pointCode: 'HT5',
    regionTemplate: 'hand',
    marker: { x: 24, y: 27 },
    label: { x: 4, y: 20, text: 'HT5' },
    neighbors: [
      { pointCode: 'HT4', x: 23, y: 20 },
      { pointCode: 'HT6', x: 26, y: 34 },
    ],
    note: 'Palmar forearm · radial border of flexor carpi ulnaris tendon · 1 cun above the wrist crease',
  },
  {
    pointCode: 'HT6',
    regionTemplate: 'hand',
    marker: { x: 26, y: 34 },
    label: { x: 4, y: 42, text: 'HT6' },
    neighbors: [
      { pointCode: 'HT5', x: 24, y: 27 },
      { pointCode: 'HT7', x: 28, y: 42 },
    ],
    note: 'Palmar forearm · radial border of flexor carpi ulnaris tendon · 0.5 cun above the wrist crease',
  },
  {
    pointCode: 'HT7',
    regionTemplate: 'hand',
    marker: { x: 28, y: 42 },
    label: { x: 8, y: 30, text: 'HT7' },
    neighbors: [
      { pointCode: 'HT6', x: 26, y: 34 },
      { pointCode: 'HT8', x: 34, y: 60 },
    ],
    note: 'Ulnar side of wrist crease · in the depression radial to flexor carpi ulnaris tendon',
  },
  {
    pointCode: 'HT8',
    regionTemplate: 'hand',
    marker: { x: 38, y: 56 },
    label: { x: 14, y: 50, text: 'HT8' },
    neighbors: [
      { pointCode: 'HT7', x: 28, y: 42 },
      { pointCode: 'HT9', x: 33, y: 92 },
    ],
    note: 'On the palm · between the fourth and fifth metacarpal bones · where the tip of the little finger rests when a fist is made',
  },
  {
    pointCode: 'HT9',
    regionTemplate: 'hand',
    marker: { x: 33, y: 92 },
    label: { x: 12, y: 104, text: 'HT9' },
    neighbors: [{ pointCode: 'HT8', x: 38, y: 56 }],
    note: 'On the little finger · 0.1 cun from the corner of the nail · radial side of the distal phalanx',
  },
];
