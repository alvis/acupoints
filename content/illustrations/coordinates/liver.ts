import type { CoordinateEntry } from './schema';

/**
 * Liver channel — 14 points. Distal chain on `foot` pinned to curated
 * LV2/LV3/LV4; medial leg/thigh on `leg` (malleolus tip ≈y118,
 * ≈3.3 units/cun ascending); hypochondriac pair on torso-supine.
 */
export const liverCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'LV1',
    regionTemplate: 'foot',
    marker: { x: 89, y: 60 },
    label: { x: 94, y: 48, text: 'LV1' },
    neighbors: [{ pointCode: 'LV2', x: 80, y: 76 }],
    note: 'Lateral side of the end of the big toe · 0.1 cun from the corner of the nail',
  },
  {
    pointCode: 'LV2',
    regionTemplate: 'foot',
    marker: { x: 80, y: 76 },
    label: { x: 92, y: 86, text: 'LV2' },
    neighbors: [
      { pointCode: 'LV1', x: 89, y: 60 },
      { pointCode: 'LV3', x: 68, y: 72 },
    ],
    note: 'Dorsum of foot · between the first and second toes · just behind the web margin at the junction of the red and white skin',
  },
  {
    pointCode: 'LV3',
    regionTemplate: 'foot',
    marker: { x: 68, y: 72 },
    label: { x: 86, y: 58, text: 'LV3' },
    neighbors: [
      { pointCode: 'LV2', x: 80, y: 76 },
      { pointCode: 'LV4', x: 50, y: 70 },
    ],
    note: 'Dorsum of foot · depression between 1st and 2nd metatarsal bones, proximal to the junction of their bases',
  },
  {
    pointCode: 'LV4',
    regionTemplate: 'foot',
    marker: { x: 50, y: 70 },
    label: { x: 52, y: 58, text: 'LV4' },
    neighbors: [{ pointCode: 'LV3', x: 68, y: 72 }],
    note: 'Dorsum of foot · anterior to the medial malleolus · between SP5 and ST41 · medial to the tibialis anterior tendon',
  },
  {
    pointCode: 'LV5',
    regionTemplate: 'leg',
    marker: { x: 40, y: 101 },
    label: { x: 18, y: 96, text: 'LV5' },
    neighbors: [{ pointCode: 'LV6', x: 40, y: 95 }],
    note: 'Medial aspect of the lower leg · 5 cun above the tip of the medial malleolus · middle of the medial surface of the tibia',
  },
  {
    pointCode: 'LV6',
    regionTemplate: 'leg',
    marker: { x: 40, y: 95 },
    label: { x: 18, y: 88, text: 'LV6' },
    neighbors: [
      { pointCode: 'LV5', x: 40, y: 101 },
      { pointCode: 'LV7', x: 41, y: 81 },
    ],
    note: 'Medial aspect of the lower leg · 7 cun above the tip of the medial malleolus · middle of the medial surface of the tibia',
  },
  {
    pointCode: 'LV7',
    regionTemplate: 'leg',
    marker: { x: 41, y: 81 },
    label: { x: 18, y: 74, text: 'LV7' },
    neighbors: [
      { pointCode: 'LV6', x: 40, y: 95 },
      { pointCode: 'LV8', x: 46, y: 74 },
    ],
    note: 'Medial lower leg · posterior and inferior to the medial condyle of the tibia · 1 cun behind SP9',
  },
  {
    pointCode: 'LV8',
    regionTemplate: 'leg',
    marker: { x: 46, y: 74 },
    label: { x: 24, y: 64, text: 'LV8' },
    neighbors: [
      { pointCode: 'LV7', x: 41, y: 81 },
      { pointCode: 'LV9', x: 43, y: 54 },
    ],
    note: 'Medial aspect of the knee · with the knee flexed, at the medial end of the popliteal crease · posterior to the medial condyle of the femur',
  },
  {
    pointCode: 'LV9',
    regionTemplate: 'leg',
    marker: { x: 43, y: 54 },
    label: { x: 22, y: 48, text: 'LV9' },
    neighbors: [
      { pointCode: 'LV8', x: 46, y: 74 },
      { pointCode: 'LV10', x: 44, y: 20 },
    ],
    note: 'Medial aspect of the thigh · 4 cun above the medial epicondyle of the femur · between sartorius and vastus medialis',
  },
  {
    pointCode: 'LV10',
    regionTemplate: 'leg',
    marker: { x: 44, y: 20 },
    label: { x: 24, y: 16, text: 'LV10' },
    neighbors: [
      { pointCode: 'LV9', x: 43, y: 54 },
      { pointCode: 'LV11', x: 45, y: 15 },
    ],
    note: 'Medial aspect of the thigh · 3 cun below ST30 · at the root of the thigh below the pubic tubercle',
  },
  {
    pointCode: 'LV11',
    regionTemplate: 'leg',
    marker: { x: 45, y: 15 },
    label: { x: 25, y: 10, text: 'LV11' },
    neighbors: [
      { pointCode: 'LV10', x: 44, y: 20 },
      { pointCode: 'LV12', x: 47, y: 10 },
    ],
    note: 'Medial aspect of the thigh · 2 cun below ST30 · at the root of the thigh below the pubic tubercle',
  },
  {
    pointCode: 'LV12',
    regionTemplate: 'leg',
    marker: { x: 47, y: 10 },
    label: { x: 62, y: 8, text: 'LV12' },
    neighbors: [{ pointCode: 'LV11', x: 45, y: 15 }],
    note: 'Groin · lateral to the pubic tubercle · inferior and lateral to ST30 · where the femoral pulse is palpable · 2.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'LV13',
    regionTemplate: 'torso-supine',
    marker: { x: 28, y: 84 },
    label: { x: 10, y: 94, text: 'LV13' },
    neighbors: [{ pointCode: 'LV14', x: 38, y: 54 }],
    note: 'Lateral side of the abdomen · below the free end of the eleventh rib',
  },
  {
    pointCode: 'LV14',
    regionTemplate: 'torso-supine',
    marker: { x: 38, y: 54 },
    label: { x: 16, y: 50, text: 'LV14' },
    neighbors: [
      { pointCode: 'LV13', x: 28, y: 84 },
      { pointCode: 'CV17', x: 50, y: 48 },
    ],
    note: 'On the chest · directly below the nipple · sixth intercostal space · 4 cun lateral to the anterior midline',
  },
];
