import type { CoordinateEntry } from './schema';

/**
 * Spleen channel — 21 points. Medial foot chain SP1–SP5 runs the
 * red-and-white skin border just below the Liver dorsum line (pinned to
 * curated LV1/LV2/LV3/LV4); SP6–SP12 hold the medial leg/thigh, pinned to
 * curated SP6/SP9 and their neighbour anchors (malleolus tip ≈y117,
 * ≈3 units/cun ascending); SP13–SP21 on torso-supine: the 4-cun abdominal
 * line at x=62 (3 units/cun horizontal) and the 6-cun intercostal set at
 * x=68, with the nipple line y=48 marking the fourth intercostal space.
 */
export const spleenCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'SP1',
    regionTemplate: 'foot',
    marker: { x: 90, y: 54 },
    label: { x: 94, y: 44, text: 'SP1' },
    neighbors: [{ pointCode: 'SP2', x: 79, y: 82 }],
    note: 'Medial side of the big toe · 0.1 cun from the corner of the nail',
  },
  {
    pointCode: 'SP2',
    regionTemplate: 'foot',
    marker: { x: 79, y: 82 },
    label: { x: 90, y: 90, text: 'SP2' },
    neighbors: [
      { pointCode: 'SP1', x: 90, y: 54 },
      { pointCode: 'SP3', x: 73, y: 83 },
    ],
    note: 'Medial side of the foot · distal and inferior to the first metatarsophalangeal joint · red-and-white skin junction',
  },
  {
    pointCode: 'SP3',
    regionTemplate: 'foot',
    marker: { x: 73, y: 83 },
    label: { x: 62, y: 94, text: 'SP3' },
    neighbors: [
      { pointCode: 'SP2', x: 79, y: 82 },
      { pointCode: 'SP4', x: 64, y: 82 },
    ],
    note: 'Medial side of the foot · posterior and inferior to the first metatarsophalangeal joint · red-and-white skin junction',
  },
  {
    pointCode: 'SP4',
    regionTemplate: 'foot',
    marker: { x: 64, y: 82 },
    label: { x: 50, y: 88, text: 'SP4' },
    neighbors: [
      { pointCode: 'SP3', x: 73, y: 83 },
      { pointCode: 'SP5', x: 29, y: 65 },
    ],
    note: 'Medial side of the foot · anteroinferior to the base of the first metatarsal · red-and-white skin junction',
  },
  {
    pointCode: 'SP5',
    regionTemplate: 'foot',
    marker: { x: 29, y: 65 },
    label: { x: 16, y: 58, text: 'SP5' },
    neighbors: [{ pointCode: 'SP4', x: 64, y: 82 }],
    note: 'Anterior and inferior to the medial malleolus · midway between the navicular tuberosity and the malleolus tip',
  },
  {
    pointCode: 'SP6',
    regionTemplate: 'leg',
    marker: { x: 42, y: 108 },
    label: { x: 14, y: 100, text: 'SP6' },
    neighbors: [
      { pointCode: 'SP7', x: 44, y: 100 },
      { pointCode: 'KI8', x: 40, y: 110 },
    ],
    note: '3 cun directly above the tip of the medial malleolus · on the posterior border of the tibia',
  },
  {
    pointCode: 'SP7',
    regionTemplate: 'leg',
    marker: { x: 44, y: 100 },
    label: { x: 26, y: 106, text: 'SP7' },
    neighbors: [
      { pointCode: 'SP6', x: 42, y: 108 },
      { pointCode: 'SP8', x: 44, y: 86 },
    ],
    note: 'Medial lower leg · on the malleolus-tip-to-SP9 line · 6 cun above the tip of the medial malleolus · behind the tibial border',
  },
  {
    pointCode: 'SP8',
    regionTemplate: 'leg',
    marker: { x: 44, y: 86 },
    label: { x: 28, y: 82, text: 'SP8' },
    neighbors: [
      { pointCode: 'SP7', x: 44, y: 100 },
      { pointCode: 'SP9', x: 44, y: 78 },
    ],
    note: 'Medial lower leg · on the malleolus-tip-to-SP9 line · 3 cun inferior to Yinlingquan (SP9)',
  },
  {
    pointCode: 'SP9',
    regionTemplate: 'leg',
    marker: { x: 44, y: 78 },
    label: { x: 16, y: 72, text: 'SP9' },
    neighbors: [
      { pointCode: 'SP8', x: 44, y: 86 },
      { pointCode: 'LV8', x: 46, y: 74 },
    ],
    note: 'In the depression below the medial condyle of the tibia · on the lower border of the condyle, posterior to tibia',
  },
  {
    pointCode: 'SP10',
    regionTemplate: 'leg',
    marker: { x: 38, y: 56 },
    label: { x: 22, y: 50, text: 'SP10' },
    neighbors: [
      { pointCode: 'SP9', x: 44, y: 78 },
      { pointCode: 'SP11', x: 45, y: 35 },
    ],
    note: 'Knee flexed · medial thigh · 2 cun above the medial end of the patellar base · on the vastus medialis bulge',
  },
  {
    pointCode: 'SP11',
    regionTemplate: 'leg',
    marker: { x: 45, y: 35 },
    label: { x: 30, y: 30, text: 'SP11' },
    neighbors: [
      { pointCode: 'SP10', x: 38, y: 56 },
      { pointCode: 'SP12', x: 53, y: 9 },
    ],
    note: 'Medial thigh · on the SP10–SP12 line · 6 cun above Xuehai (SP10)',
  },
  {
    pointCode: 'SP12',
    regionTemplate: 'leg',
    marker: { x: 53, y: 9 },
    label: { x: 66, y: 6, text: 'SP12' },
    neighbors: [{ pointCode: 'SP11', x: 45, y: 35 }],
    note: 'Lateral groin · 3.5 cun lateral to the midpoint of the upper border of the pubic symphysis · lateral to the femoral pulse',
  },
  {
    pointCode: 'SP13',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 95 },
    label: { x: 78, y: 98, text: 'SP13' },
    neighbors: [{ pointCode: 'SP14', x: 62, y: 84 }],
    note: 'Lower abdomen · 4 cun below the umbilicus · 4 cun lateral to the anterior midline · 0.7 cun above SP12',
  },
  {
    pointCode: 'SP14',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 84 },
    label: { x: 78, y: 86, text: 'SP14' },
    neighbors: [
      { pointCode: 'SP13', x: 62, y: 95 },
      { pointCode: 'SP15', x: 62, y: 78 },
    ],
    note: 'Lower abdomen · 1.3 cun below Daheng (SP15) · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP15',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 78 },
    label: { x: 80, y: 74, text: 'SP15' },
    neighbors: [
      { pointCode: 'SP14', x: 62, y: 84 },
      { pointCode: 'SP16', x: 62, y: 65 },
    ],
    note: 'Middle abdomen · level with the centre of the umbilicus · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP16',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 65 },
    label: { x: 78, y: 64, text: 'SP16' },
    neighbors: [
      { pointCode: 'SP15', x: 62, y: 78 },
      { pointCode: 'SP17', x: 68, y: 53 },
    ],
    note: 'Upper abdomen · 3 cun above the centre of the umbilicus · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP17',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 53 },
    label: { x: 84, y: 50, text: 'SP17' },
    neighbors: [
      { pointCode: 'SP16', x: 62, y: 65 },
      { pointCode: 'SP18', x: 68, y: 48 },
    ],
    note: 'Lateral chest · fifth intercostal space · 6 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP18',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 48 },
    label: { x: 84, y: 44, text: 'SP18' },
    neighbors: [
      { pointCode: 'SP17', x: 68, y: 53 },
      { pointCode: 'SP19', x: 68, y: 43 },
    ],
    note: 'Lateral chest · fourth intercostal space · 6 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP19',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 43 },
    label: { x: 84, y: 40, text: 'SP19' },
    neighbors: [
      { pointCode: 'SP18', x: 68, y: 48 },
      { pointCode: 'SP20', x: 68, y: 38 },
    ],
    note: 'Lateral chest · third intercostal space · 6 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP20',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 38 },
    label: { x: 84, y: 34, text: 'SP20' },
    neighbors: [
      { pointCode: 'SP19', x: 68, y: 43 },
      { pointCode: 'SP21', x: 74, y: 58 },
    ],
    note: 'Lateral chest · second intercostal space · 6 cun lateral to the anterior midline',
  },
  {
    pointCode: 'SP21',
    regionTemplate: 'torso-supine',
    marker: { x: 74, y: 58 },
    label: { x: 88, y: 64, text: 'SP21' },
    neighbors: [{ pointCode: 'SP20', x: 68, y: 38 }],
    note: 'Lateral chest · on the midaxillary line · sixth intercostal space',
  },
];
