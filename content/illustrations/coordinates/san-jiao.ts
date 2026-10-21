import type { CoordinateEntry } from './schema';

/**
 * San Jiao channel — 23 points. Dorsal hand chain TH1–TH6 pins to curated
 * TH5 and its neighbour anchors TH4/TH6. TH7–TH13 climb the posterior
 * forearm/arm on `arm`, anchored to the olecranon ≈(31,68) and the
 * deltoid shoulder ≈(21,17) (≈4.5 units/cun forearm, ≈4.2 upper arm);
 * TH14–TH15 hold the posterolateral shoulder/scapula on torso-prone;
 * TH16–TH23 sit on `head`, where the retroauricular ladder runs the
 * TH17→TH20 helix line in thirds past the ear disc centred ≈(66,82).
 */
export const sanJiaoCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'TH1',
    regionTemplate: 'hand',
    marker: { x: 39, y: 106 },
    label: { x: 22, y: 114, text: 'TH1' },
    neighbors: [{ pointCode: 'TH2', x: 36, y: 86 }],
    note: 'Ring finger · ulnar side of the distal segment · 0.1 cun from the corner of the nail',
  },
  {
    pointCode: 'TH2',
    regionTemplate: 'hand',
    marker: { x: 36, y: 86 },
    label: { x: 20, y: 92, text: 'TH2' },
    neighbors: [
      { pointCode: 'TH1', x: 39, y: 106 },
      { pointCode: 'TH3', x: 33, y: 72 },
    ],
    note: 'Dorsum of the hand · between the fourth and fifth fingers · red-and-white skin junction behind the web margin',
  },
  {
    pointCode: 'TH3',
    regionTemplate: 'hand',
    marker: { x: 33, y: 72 },
    label: { x: 16, y: 78, text: 'TH3' },
    neighbors: [
      { pointCode: 'TH2', x: 36, y: 86 },
      { pointCode: 'TH4', x: 52, y: 36 },
    ],
    note: 'Dorsum of the hand · proximal to the fourth metacarpophalangeal joint · between the fourth and fifth metacarpals',
  },
  {
    pointCode: 'TH4',
    regionTemplate: 'hand',
    marker: { x: 52, y: 36 },
    label: { x: 78, y: 44, text: 'TH4' },
    neighbors: [
      { pointCode: 'TH3', x: 33, y: 72 },
      { pointCode: 'TH5', x: 58, y: 25 },
    ],
    note: 'On the dorsal transverse wrist crease · depression on the ulnar side of the common extensor tendon',
  },
  {
    pointCode: 'TH5',
    regionTemplate: 'hand',
    marker: { x: 58, y: 25 },
    label: { x: 88, y: 12, text: 'TH5' },
    neighbors: [
      { pointCode: 'TH4', x: 52, y: 36 },
      { pointCode: 'TH6', x: 62, y: 18 },
    ],
    note: 'Dorsum of forearm · 2 cun proximal to dorsal wrist crease · between radius and ulna',
  },
  {
    pointCode: 'TH6',
    regionTemplate: 'hand',
    marker: { x: 62, y: 18 },
    label: { x: 84, y: 8, text: 'TH6' },
    neighbors: [{ pointCode: 'TH5', x: 58, y: 25 }],
    note: 'Dorsum of forearm · 3 cun proximal to the dorsal wrist crease · between radius and ulna',
  },
  {
    pointCode: 'TH7',
    regionTemplate: 'arm',
    marker: { x: 66, y: 102 },
    label: { x: 84, y: 110, text: 'TH7' },
    neighbors: [{ pointCode: 'TH8', x: 66, y: 95 }],
    note: 'Dorsum of forearm · 3 cun above the dorsal wrist crease · one finger-breadth ulnar to Zhigou (TH6)',
  },
  {
    pointCode: 'TH8',
    regionTemplate: 'arm',
    marker: { x: 66, y: 95 },
    label: { x: 84, y: 90, text: 'TH8' },
    neighbors: [
      { pointCode: 'TH7', x: 66, y: 102 },
      { pointCode: 'TH9', x: 52, y: 84 },
    ],
    note: 'Dorsum of forearm · 4 cun above the dorsal wrist crease · between the radius and the ulna',
  },
  {
    pointCode: 'TH9',
    regionTemplate: 'arm',
    marker: { x: 52, y: 84 },
    label: { x: 34, y: 88, text: 'TH9' },
    neighbors: [
      { pointCode: 'TH8', x: 66, y: 95 },
      { pointCode: 'TH10', x: 28, y: 62 },
    ],
    note: 'Dorsum of forearm · on the TH4-to-elbow-tip line · 5 cun below the olecranon · between radius and ulna',
  },
  {
    pointCode: 'TH10',
    regionTemplate: 'arm',
    marker: { x: 28, y: 62 },
    label: { x: 10, y: 66, text: 'TH10' },
    neighbors: [
      { pointCode: 'TH9', x: 52, y: 84 },
      { pointCode: 'TH11', x: 27, y: 58 },
    ],
    note: 'Outer arm · elbow flexed · depression 1 cun directly above the tip of the olecranon',
  },
  {
    pointCode: 'TH11',
    regionTemplate: 'arm',
    marker: { x: 27, y: 58 },
    label: { x: 10, y: 52, text: 'TH11' },
    neighbors: [
      { pointCode: 'TH10', x: 28, y: 62 },
      { pointCode: 'TH12', x: 25, y: 44 },
    ],
    note: 'Outer arm · elbow flexed · 2 cun directly above the tip of the elbow · 1 cun above Tianjing (TH10)',
  },
  {
    pointCode: 'TH12',
    regionTemplate: 'arm',
    marker: { x: 25, y: 44 },
    label: { x: 8, y: 40, text: 'TH12' },
    neighbors: [
      { pointCode: 'TH11', x: 27, y: 58 },
      { pointCode: 'TH13', x: 23, y: 30 },
    ],
    note: 'Outer arm · midway between Qinglengyuan (TH11) and Naohui (TH13)',
  },
  {
    pointCode: 'TH13',
    regionTemplate: 'arm',
    marker: { x: 23, y: 30 },
    label: { x: 6, y: 24, text: 'TH13' },
    neighbors: [{ pointCode: 'TH12', x: 25, y: 44 }],
    note: 'Outer arm · on the elbow-tip-to-TH14 line · 3 cun below Jianliao (TH14) · posteroinferior deltoid border',
  },
  {
    pointCode: 'TH14',
    regionTemplate: 'torso-prone',
    marker: { x: 69, y: 28 },
    label: { x: 86, y: 24, text: 'TH14' },
    neighbors: [{ pointCode: 'TH15', x: 57, y: 36 }],
    note: 'Shoulder · posterior to Jianyu (LI15) · depression below and behind the acromion with the arm abducted',
  },
  {
    pointCode: 'TH15',
    regionTemplate: 'torso-prone',
    marker: { x: 57, y: 36 },
    label: { x: 40, y: 34, text: 'TH15' },
    neighbors: [
      { pointCode: 'TH14', x: 69, y: 28 },
      { pointCode: 'SI13', x: 56, y: 43 },
    ],
    note: 'Scapula · midway between Jianjing (GB21) and Quyuan (SI13) · at the superior angle of the scapula',
  },
  {
    pointCode: 'TH16',
    regionTemplate: 'head',
    marker: { x: 70, y: 90 },
    label: { x: 84, y: 96, text: 'TH16' },
    neighbors: [{ pointCode: 'TH17', x: 62, y: 90 }],
    note: 'Lateral neck · directly below and behind the mastoid process · level with the angle of the mandible · posterior SCM border',
  },
  {
    pointCode: 'TH17',
    regionTemplate: 'head',
    marker: { x: 62, y: 90 },
    label: { x: 48, y: 100, text: 'TH17' },
    neighbors: [
      { pointCode: 'TH16', x: 70, y: 90 },
      { pointCode: 'TH18', x: 64, y: 83 },
    ],
    note: 'Behind the earlobe · depression between the mastoid process and the angle of the mandible · clearer with the mouth open',
  },
  {
    pointCode: 'TH18',
    regionTemplate: 'head',
    marker: { x: 64, y: 83 },
    label: { x: 78, y: 84, text: 'TH18' },
    neighbors: [
      { pointCode: 'TH17', x: 62, y: 90 },
      { pointCode: 'TH19', x: 65, y: 77 },
    ],
    note: 'Head · centre of the mastoid process behind the ear · junction of the middle and lower thirds of the TH20–TH17 line',
  },
  {
    pointCode: 'TH19',
    regionTemplate: 'head',
    marker: { x: 65, y: 77 },
    label: { x: 80, y: 72, text: 'TH19' },
    neighbors: [
      { pointCode: 'TH18', x: 64, y: 83 },
      { pointCode: 'TH20', x: 67, y: 70 },
    ],
    note: 'Head · junction of the upper and middle thirds of the helix line between Jiaosun (TH20) and Yifeng (TH17)',
  },
  {
    pointCode: 'TH20',
    regionTemplate: 'head',
    marker: { x: 67, y: 70 },
    label: { x: 82, y: 64, text: 'TH20' },
    neighbors: [
      { pointCode: 'TH19', x: 65, y: 77 },
      { pointCode: 'TH21', x: 58, y: 76 },
    ],
    note: 'Head · directly above the tip of the ear within the hairline · marked by the ear apex folded forward',
  },
  {
    pointCode: 'TH21',
    regionTemplate: 'head',
    marker: { x: 58, y: 76 },
    label: { x: 42, y: 74, text: 'TH21' },
    neighbors: [
      { pointCode: 'TH20', x: 67, y: 70 },
      { pointCode: 'TH22', x: 54, y: 68 },
    ],
    note: 'Face · anterior to the supratragic notch · behind the condyloid process of the mandible · depression opens with the mouth',
  },
  {
    pointCode: 'TH22',
    regionTemplate: 'head',
    marker: { x: 54, y: 68 },
    label: { x: 40, y: 62, text: 'TH22' },
    neighbors: [
      { pointCode: 'TH21', x: 58, y: 76 },
      { pointCode: 'TH23', x: 26, y: 66 },
    ],
    note: 'Side of the head · posterior border of the temple hairline · anterior to the root of the ear',
  },
  {
    pointCode: 'TH23',
    regionTemplate: 'head',
    marker: { x: 26, y: 66 },
    label: { x: 10, y: 60, text: 'TH23' },
    neighbors: [{ pointCode: 'TH22', x: 54, y: 68 }],
    note: 'Face · depression at the lateral end of the eyebrow',
  },
];
