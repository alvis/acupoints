import type { CoordinateEntry } from './schema';

/**
 * The 20 curated overlay placements migrated verbatim from
 * content/illustrations/overlays/*.ts via the PM's draft table
 * (.state/works/llm-search-uplift/artifacts/w5-draft-coordinate-table.ts).
 * These positions are AUTHORITATIVE — extension batches pin their local
 * calibration to these anchors and never re-derive them.
 *
 * NOT imported into the live table: every entry here is re-transcribed in
 * its channel module (EX-HN5 via coordinates/index.ts). Re-importing this
 * array wholesale would trip the duplicate-code guard at build.
 */
export const CURATED_COORDINATES: CoordinateEntry[] = [
  {
    pointCode: 'BL40',
    regionTemplate: 'leg',
    marker: { x: 48, y: 72 },
    label: { x: 78, y: 60, text: 'BL40' },
    neighbors: [
      { pointCode: 'BL39', x: 56, y: 72 },
      { pointCode: 'BL57', x: 46, y: 96 },
    ],
    note: 'Midpoint of the popliteal crease (back of knee) · between the tendons of biceps femoris and semitendinosus',
  },
  {
    pointCode: 'BL57',
    regionTemplate: 'leg',
    marker: { x: 46, y: 96 },
    label: { x: 78, y: 104, text: 'BL57' },
    neighbors: [
      { pointCode: 'BL56', x: 46, y: 88 },
      { pointCode: 'BL58', x: 46, y: 102 },
    ],
    note: 'Midpoint of the posterior calf · in the depression below the gastrocnemius muscle bellies, where the Achilles tendon begins',
  },
  {
    pointCode: 'CV17',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 48 },
    label: { x: 80, y: 38, text: 'CV17' },
    neighbors: [
      { pointCode: 'CV16', x: 50, y: 58 },
      { pointCode: 'CV18', x: 50, y: 42 },
    ],
    note: 'On the anterior midline of the sternum · level with the 4th intercostal space (approximately between the nipples)',
  },
  {
    pointCode: 'EX-HN5',
    regionTemplate: 'head',
    marker: { x: 30, y: 50 },
    label: { x: 6, y: 38, text: 'EX-HN5' },
    neighbors: [
      { pointCode: 'GB1', x: 36, y: 54 },
      { pointCode: 'ST8', x: 32, y: 38 },
    ],
    note: 'Temple · in the depression about 1 cun posterior to the midpoint between the lateral end of the eyebrow and the outer canthus',
  },
  {
    pointCode: 'GB20',
    regionTemplate: 'head',
    marker: { x: 58, y: 94 },
    label: { x: 86, y: 104, text: 'GB20' },
    neighbors: [
      { pointCode: 'GB12', x: 68, y: 86 },
      { pointCode: 'GV16', x: 50, y: 96 },
    ],
    note: 'Base of the occiput · in the hollow between the upper trapezius and sternocleidomastoid attachments, level with GV16',
  },
  {
    pointCode: 'GV14',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 30 },
    label: { x: 78, y: 20, text: 'GV14' },
    neighbors: [
      { pointCode: 'GV13', x: 50, y: 38 },
      { pointCode: 'BL11', x: 58, y: 34 },
    ],
    note: 'Below the spinous process of C7 · on the posterior midline, in the depression between C7 and T1 (head flexed forward)',
  },
  {
    pointCode: 'GV20',
    regionTemplate: 'head',
    marker: { x: 46, y: 18 },
    label: { x: 78, y: 10, text: 'GV20' },
    neighbors: [
      { pointCode: 'GV21', x: 38, y: 20 },
      { pointCode: 'GV19', x: 54, y: 18 },
    ],
    note: 'Vertex of the head · on the midline, 5 cun posterior to the anterior hairline (midway between the apexes of both ears)',
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
    pointCode: 'SI3',
    regionTemplate: 'hand',
    marker: { x: 30, y: 58 },
    label: { x: 10, y: 70, text: 'SI3' },
    neighbors: [
      { pointCode: 'SI2', x: 36, y: 78 },
      { pointCode: 'SI4', x: 28, y: 48 },
    ],
    note: 'Ulnar side of the palm · proximal to the 5th metacarpophalangeal joint · on the border of palmar and dorsal skin',
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
    pointCode: 'ST36',
    regionTemplate: 'leg',
    marker: { x: 50, y: 84 },
    label: { x: 78, y: 72, text: 'ST36' },
    neighbors: [
      { pointCode: 'ST35', x: 50, y: 74 },
      { pointCode: 'ST37', x: 50, y: 96 },
    ],
    note: '3 cun below ST35 (lateral eye of knee) · one finger-breadth lateral to anterior crest of tibia · on tibialis anterior',
  },
  {
    pointCode: 'ST44',
    regionTemplate: 'foot',
    marker: { x: 86, y: 72 },
    label: { x: 94, y: 58, text: 'ST44' },
    neighbors: [
      { pointCode: 'ST43', x: 78, y: 72 },
      { pointCode: 'ST45', x: 92, y: 74 },
    ],
    note: 'Dorsum of foot · proximal to the web margin between 2nd and 3rd toes',
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
];
