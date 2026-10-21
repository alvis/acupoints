import type { CoordinateEntry } from './schema';

/**
 * Large Intestine channel — 20 points. Index-finger/dorsum chain LI1–LI4
 * pins to curated LI4 and its neighbour anchors LI3/LI5; LI6 finishes the
 * `hand` forearm stub above the radial wrist crease. LI7–LI15 climb the
 * radial border on `arm` (elbow flexed lateral profile: cubital crease arc
 * ends at curated LI11 (66,66), wrist ≈(80,106), shoulder ≈(24,12));
 * LI16 joins the arm beside LI15 per its acromion/clavicle location.
 * LI17–LI18 sit on `head` beside the SCM (profile compression flagged,
 * schematic like SI16/SI17), and LI19–LI20 close along the nostril and
 * nasolabial groove.
 */
export const largeIntestineCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'LI1',
    regionTemplate: 'hand',
    marker: { x: 43, y: 99 },
    label: { x: 24, y: 110, text: 'LI1' },
    neighbors: [{ pointCode: 'LI2', x: 39, y: 93 }],
    note: 'Index finger · radial side of the distal segment · 0.1 cun from the corner of the nail',
  },
  {
    pointCode: 'LI2',
    regionTemplate: 'hand',
    marker: { x: 39, y: 93 },
    label: { x: 20, y: 96, text: 'LI2' },
    neighbors: [
      { pointCode: 'LI1', x: 43, y: 99 },
      { pointCode: 'LI3', x: 35, y: 85 },
    ],
    note: 'Index finger · radial side · depression distal to the second metacarpophalangeal joint · red-and-white skin junction',
  },
  {
    pointCode: 'LI3',
    regionTemplate: 'hand',
    marker: { x: 35, y: 85 },
    label: { x: 14, y: 74, text: 'LI3' },
    neighbors: [
      { pointCode: 'LI2', x: 39, y: 93 },
      { pointCode: 'LI4', x: 58, y: 55 },
    ],
    note: 'Index finger · radial side · depression proximal to the second metacarpophalangeal joint · red-and-white skin junction',
  },
  {
    pointCode: 'LI4',
    regionTemplate: 'hand',
    marker: { x: 58, y: 55 },
    label: { x: 88, y: 30, text: 'LI4' },
    neighbors: [
      { pointCode: 'LI3', x: 35, y: 85 },
      { pointCode: 'LI5', x: 70, y: 35 },
    ],
    note: 'Between the 1st and 2nd metacarpals · lat 38mm · supine',
  },
  {
    pointCode: 'LI5',
    regionTemplate: 'hand',
    marker: { x: 70, y: 35 },
    label: { x: 82, y: 44, text: 'LI5' },
    neighbors: [
      { pointCode: 'LI4', x: 58, y: 55 },
      { pointCode: 'LI6', x: 64, y: 22 },
    ],
    note: 'Radial end of the dorsal wrist crease · between extensor pollicis longus and brevis tendons with the thumb tilted up',
  },
  {
    pointCode: 'LI6',
    regionTemplate: 'hand',
    marker: { x: 64, y: 22 },
    label: { x: 46, y: 14, text: 'LI6' },
    neighbors: [{ pointCode: 'LI5', x: 70, y: 35 }],
    note: 'Radial side of the dorsum of the forearm · on the LI5-to-LI11 line · 3 cun above the dorsal wrist crease',
  },
  {
    pointCode: 'LI7',
    regionTemplate: 'arm',
    marker: { x: 75, y: 93 },
    label: { x: 88, y: 100, text: 'LI7' },
    neighbors: [{ pointCode: 'LI8', x: 72, y: 85 }],
    note: 'Radial side of the dorsum of the forearm · on the LI5-to-LI11 line · 5 cun above the dorsal wrist crease',
  },
  {
    pointCode: 'LI8',
    regionTemplate: 'arm',
    marker: { x: 72, y: 85 },
    label: { x: 52, y: 88, text: 'LI8' },
    neighbors: [
      { pointCode: 'LI7', x: 75, y: 93 },
      { pointCode: 'LI9', x: 70, y: 80 },
    ],
    note: 'Radial side of the dorsum of the forearm · on the LI5-to-LI11 line · 4 cun below the elbow crease',
  },
  {
    pointCode: 'LI9',
    regionTemplate: 'arm',
    marker: { x: 70, y: 80 },
    label: { x: 56, y: 68, text: 'LI9' },
    neighbors: [
      { pointCode: 'LI8', x: 72, y: 85 },
      { pointCode: 'LI10', x: 74, y: 76 },
    ],
    note: 'Radial side of the dorsum of the forearm · on the LI5-to-LI11 line · 3 cun below the elbow crease',
  },
  {
    pointCode: 'LI10',
    regionTemplate: 'arm',
    marker: { x: 74, y: 76 },
    label: { x: 88, y: 84, text: 'LI10' },
    neighbors: [
      { pointCode: 'LI9', x: 70, y: 80 },
      { pointCode: 'LI11', x: 66, y: 66 },
    ],
    note: 'Radial side of the dorsum of the forearm · on the LI5-to-LI11 line · 2 cun below the elbow crease',
  },
  {
    pointCode: 'LI11',
    regionTemplate: 'arm',
    marker: { x: 66, y: 66 },
    label: { x: 90, y: 54, text: 'LI11' },
    neighbors: [
      { pointCode: 'LI10', x: 74, y: 76 },
      { pointCode: 'LI12', x: 58, y: 60 },
    ],
    note: 'Lateral end of the elbow crease · midway between LU5 and the lateral epicondyle of the humerus (elbow flexed)',
  },
  {
    pointCode: 'LI12',
    regionTemplate: 'arm',
    marker: { x: 58, y: 60 },
    label: { x: 42, y: 64, text: 'LI12' },
    neighbors: [
      { pointCode: 'LI11', x: 66, y: 66 },
      { pointCode: 'LI13', x: 50, y: 49 },
    ],
    note: 'Outer aspect of the arm · elbow flexed · 1 cun above Quchi (LI11) · on the border of the humerus',
  },
  {
    pointCode: 'LI13',
    regionTemplate: 'arm',
    marker: { x: 50, y: 49 },
    label: { x: 32, y: 50, text: 'LI13' },
    neighbors: [
      { pointCode: 'LI12', x: 58, y: 60 },
      { pointCode: 'LI14', x: 36, y: 31 },
    ],
    note: 'Outer aspect of the arm · on the LI11-to-LI15 line · 3 cun above Quchi (LI11)',
  },
  {
    pointCode: 'LI14',
    regionTemplate: 'arm',
    marker: { x: 36, y: 31 },
    label: { x: 18, y: 30, text: 'LI14' },
    neighbors: [
      { pointCode: 'LI13', x: 50, y: 49 },
      { pointCode: 'LI15', x: 26, y: 17 },
    ],
    note: 'On the LI11-to-LI15 line · 7 cun above Quchi (LI11) · outer arm at the insertion of the deltoid',
  },
  {
    pointCode: 'LI15',
    regionTemplate: 'arm',
    marker: { x: 26, y: 17 },
    label: { x: 38, y: 8, text: 'LI15' },
    neighbors: [
      { pointCode: 'LI14', x: 36, y: 31 },
      { pointCode: 'LI16', x: 14, y: 14 },
    ],
    note: 'Shoulder · on the deltoid · anteroinferior depression below the acromion when the arm is abducted',
  },
  {
    pointCode: 'LI16',
    regionTemplate: 'arm',
    marker: { x: 14, y: 14 },
    label: { x: 4, y: 24, text: 'LI16' },
    neighbors: [{ pointCode: 'LI15', x: 26, y: 17 }],
    note: 'Shoulder girdle · depression between the acromial end of the clavicle and the spine of the scapula',
  },
  {
    pointCode: 'LI17',
    regionTemplate: 'head',
    marker: { x: 40, y: 92 },
    label: { x: 24, y: 102, text: 'LI17' },
    neighbors: [{ pointCode: 'LI18', x: 32, y: 90 }],
    note: 'Lateral neck · posterior border of the sternocleidomastoid beside the laryngeal prominence · midway between LI18 and ST12',
  },
  {
    pointCode: 'LI18',
    regionTemplate: 'head',
    marker: { x: 32, y: 90 },
    label: { x: 20, y: 94, text: 'LI18' },
    neighbors: [
      { pointCode: 'LI17', x: 40, y: 92 },
      { pointCode: 'LI19', x: 16, y: 84 },
    ],
    note: 'Lateral neck · level with the laryngeal prominence · between the anterior and posterior borders of the sternocleidomastoid',
  },
  {
    pointCode: 'LI19',
    regionTemplate: 'head',
    marker: { x: 16, y: 84 },
    label: { x: 4, y: 72, text: 'LI19' },
    neighbors: [
      { pointCode: 'LI18', x: 32, y: 90 },
      { pointCode: 'LI20', x: 22, y: 80 },
    ],
    note: 'Upper lip · directly below the lateral border of the nostril · level with Shuigou (GV26)',
  },
  {
    pointCode: 'LI20',
    regionTemplate: 'head',
    marker: { x: 22, y: 80 },
    label: { x: 36, y: 70, text: 'LI20' },
    neighbors: [{ pointCode: 'LI19', x: 16, y: 84 }],
    note: 'Beside the midpoint of the lateral border of the nasal ala · in the nasolabial groove',
  },
];
