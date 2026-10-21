import type { CoordinateEntry } from './schema';

/**
 * Kidney channel — 27 points. Sole/medial-foot KI1–KI6 pin to curated KI3
 * and its neighbour anchors KI4/KI6; the malleolar cluster is anatomically
 * tight on the profile drawing (flagged in spot-check notes). KI7–KI10 hold
 * the medial calf behind the Spleen line, anchored by curated KI8 (40,110)
 * = 2 cun above the malleolus. KI11–KI21 run torso-supine on the 0.5-cun
 * line (x=52, ≈4.4 units/cun below and ≈4/cun above the umbilicus, matched
 * to the curated CV16/CV17 ladder); KI22–KI27 descend the intercostal
 * ladder at 2 cun (x=56) from the clavicle's inferior border.
 */
export const kidneyCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'KI1',
    regionTemplate: 'foot',
    marker: { x: 60, y: 82 },
    label: { x: 72, y: 94, text: 'KI1' },
    neighbors: [{ pointCode: 'KI2', x: 33, y: 73 }],
    note: 'Sole of the foot · depression in plantar flexion · junction of the anterior third and posterior two-thirds of the toe-web-to-heel line',
  },
  {
    pointCode: 'KI2',
    regionTemplate: 'foot',
    marker: { x: 33, y: 73 },
    label: { x: 8, y: 70, text: 'KI2' },
    neighbors: [
      { pointCode: 'KI1', x: 60, y: 82 },
      { pointCode: 'KI3', x: 22, y: 68 },
    ],
    note: 'Medial side of the foot · below the tuberosity of the navicular bone · red-and-white skin junction',
  },
  {
    pointCode: 'KI3',
    regionTemplate: 'foot',
    marker: { x: 22, y: 68 },
    label: { x: 4, y: 56, text: 'KI3' },
    neighbors: [
      { pointCode: 'KI4', x: 20, y: 76 },
      { pointCode: 'KI6', x: 26, y: 74 },
    ],
    note: 'Medial ankle · midpoint between medial malleolus tip and Achilles tendon',
  },
  {
    pointCode: 'KI4',
    regionTemplate: 'foot',
    marker: { x: 20, y: 76 },
    label: { x: 6, y: 84, text: 'KI4' },
    neighbors: [
      { pointCode: 'KI3', x: 22, y: 68 },
      { pointCode: 'KI5', x: 24, y: 78 },
    ],
    note: 'Posterior and inferior to the medial malleolus · depression anteromedial to the Achilles tendon attachment',
  },
  {
    pointCode: 'KI5',
    regionTemplate: 'foot',
    marker: { x: 24, y: 78 },
    label: { x: 12, y: 94, text: 'KI5' },
    neighbors: [
      { pointCode: 'KI4', x: 20, y: 76 },
      { pointCode: 'KI6', x: 26, y: 74 },
    ],
    note: '1 cun directly below Taixi (KI3) · depression on the medial side of the calcaneal tuberosity',
  },
  {
    pointCode: 'KI6',
    regionTemplate: 'foot',
    marker: { x: 26, y: 74 },
    label: { x: 38, y: 62, text: 'KI6' },
    neighbors: [{ pointCode: 'KI5', x: 24, y: 78 }],
    note: 'Medial side of the foot · depression directly below the tip of the medial malleolus',
  },
  {
    pointCode: 'KI7',
    regionTemplate: 'leg',
    marker: { x: 36, y: 112 },
    label: { x: 20, y: 116, text: 'KI7' },
    neighbors: [{ pointCode: 'KI8', x: 40, y: 110 }],
    note: 'Medial lower leg · 2 cun directly above Taixi (KI3) · anterior to the Achilles tendon',
  },
  {
    pointCode: 'KI8',
    regionTemplate: 'leg',
    marker: { x: 40, y: 110 },
    label: { x: 56, y: 116, text: 'KI8' },
    neighbors: [
      { pointCode: 'KI7', x: 36, y: 112 },
      { pointCode: 'KI9', x: 39, y: 99 },
    ],
    note: '2 cun above Taixi (KI3) · 0.5 cun anterior to Fuliu (KI7) · posterior to the medial border of the tibia',
  },
  {
    pointCode: 'KI9',
    regionTemplate: 'leg',
    marker: { x: 39, y: 99 },
    label: { x: 24, y: 94, text: 'KI9' },
    neighbors: [
      { pointCode: 'KI8', x: 40, y: 110 },
      { pointCode: 'KI10', x: 38, y: 76 },
    ],
    note: 'On the KI3–KI10 line · 5 cun above Taixi · at the lower inner border of the gastrocnemius belly',
  },
  {
    pointCode: 'KI10',
    regionTemplate: 'leg',
    marker: { x: 38, y: 76 },
    label: { x: 22, y: 80, text: 'KI10' },
    neighbors: [{ pointCode: 'KI9', x: 39, y: 99 }],
    note: 'Medial end of the popliteal fossa · knee flexed · between the tendons of semitendinosus and semimembranosus',
  },
  {
    pointCode: 'KI11',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 100 },
    label: { x: 66, y: 104, text: 'KI11' },
    neighbors: [{ pointCode: 'KI12', x: 52, y: 96 }],
    note: 'Lower abdomen · 5 cun below the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI12',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 96 },
    label: { x: 66, y: 92, text: 'KI12' },
    neighbors: [
      { pointCode: 'KI11', x: 52, y: 100 },
      { pointCode: 'KI13', x: 52, y: 91 },
    ],
    note: 'Lower abdomen · 4 cun below the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI13',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 91 },
    label: { x: 36, y: 92, text: 'KI13' },
    neighbors: [
      { pointCode: 'KI12', x: 52, y: 96 },
      { pointCode: 'KI14', x: 52, y: 87 },
    ],
    note: 'Lower abdomen · 3 cun below the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI14',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 87 },
    label: { x: 66, y: 84, text: 'KI14' },
    neighbors: [
      { pointCode: 'KI13', x: 52, y: 91 },
      { pointCode: 'KI15', x: 52, y: 82 },
    ],
    note: 'Lower abdomen · 2 cun below the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI15',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 82 },
    label: { x: 36, y: 80, text: 'KI15' },
    neighbors: [
      { pointCode: 'KI14', x: 52, y: 87 },
      { pointCode: 'KI16', x: 52, y: 78 },
    ],
    note: 'Lower abdomen · 1 cun below the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI16',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 78 },
    label: { x: 66, y: 72, text: 'KI16' },
    neighbors: [
      { pointCode: 'KI15', x: 52, y: 82 },
      { pointCode: 'KI17', x: 52, y: 70 },
    ],
    note: 'Middle abdomen · level with the centre of the umbilicus · 0.5 cun lateral to it',
  },
  {
    pointCode: 'KI17',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 70 },
    label: { x: 36, y: 68, text: 'KI17' },
    neighbors: [
      { pointCode: 'KI16', x: 52, y: 78 },
      { pointCode: 'KI18', x: 52, y: 66 },
    ],
    note: 'Upper abdomen · 2 cun above the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI18',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 66 },
    label: { x: 66, y: 62, text: 'KI18' },
    neighbors: [
      { pointCode: 'KI17', x: 52, y: 70 },
      { pointCode: 'KI19', x: 52, y: 62 },
    ],
    note: 'Upper abdomen · 3 cun above the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI19',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 62 },
    label: { x: 36, y: 58, text: 'KI19' },
    neighbors: [
      { pointCode: 'KI18', x: 52, y: 66 },
      { pointCode: 'KI20', x: 52, y: 58 },
    ],
    note: 'Upper abdomen · 4 cun above the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI20',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 58 },
    label: { x: 66, y: 52, text: 'KI20' },
    neighbors: [
      { pointCode: 'KI19', x: 52, y: 62 },
      { pointCode: 'KI21', x: 52, y: 54 },
    ],
    note: 'Upper abdomen · 5 cun above the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI21',
    regionTemplate: 'torso-supine',
    marker: { x: 52, y: 54 },
    label: { x: 36, y: 50, text: 'KI21' },
    neighbors: [
      { pointCode: 'KI20', x: 52, y: 58 },
      { pointCode: 'KI22', x: 56, y: 53 },
    ],
    note: 'Upper abdomen · 6 cun above the centre of the umbilicus · 0.5 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI22',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 53 },
    label: { x: 72, y: 56, text: 'KI22' },
    neighbors: [
      { pointCode: 'KI21', x: 52, y: 54 },
      { pointCode: 'KI23', x: 56, y: 48 },
    ],
    note: 'Chest · fifth intercostal space · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI23',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 48 },
    label: { x: 72, y: 44, text: 'KI23' },
    neighbors: [
      { pointCode: 'KI22', x: 56, y: 53 },
      { pointCode: 'KI24', x: 56, y: 44 },
    ],
    note: 'Chest · fourth intercostal space · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI24',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 44 },
    label: { x: 40, y: 42, text: 'KI24' },
    neighbors: [
      { pointCode: 'KI23', x: 56, y: 48 },
      { pointCode: 'KI25', x: 56, y: 39 },
    ],
    note: 'Chest · third intercostal space · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI25',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 39 },
    label: { x: 72, y: 34, text: 'KI25' },
    neighbors: [
      { pointCode: 'KI24', x: 56, y: 44 },
      { pointCode: 'KI26', x: 56, y: 35 },
    ],
    note: 'Chest · second intercostal space · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI26',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 35 },
    label: { x: 40, y: 32, text: 'KI26' },
    neighbors: [
      { pointCode: 'KI25', x: 56, y: 39 },
      { pointCode: 'KI27', x: 56, y: 31 },
    ],
    note: 'Chest · first intercostal space · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'KI27',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 31 },
    label: { x: 72, y: 24, text: 'KI27' },
    neighbors: [{ pointCode: 'KI26', x: 56, y: 35 }],
    note: 'Chest · at the inferior border of the clavicle · 2 cun lateral to the anterior midline',
  },
];
