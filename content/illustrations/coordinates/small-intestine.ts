import type { CoordinateEntry } from './schema';

/**
 * Small Intestine channel — 19 points. Hand chain SI1–SI6 pinned to curated
 * SI3/SI2/SI4 anchors (ulnar border of the little finger → wrist); SI7–SI8
 * move to `arm` (>4 cun proximal: ulnar forearm border and medial elbow,
 * beside HT3); scapular arc SI9–SI15 on torso-prone right of the spine
 * (≈5.3 units/cun horizontal, ≈4.5 units/interspace ladder from GV13);
 * SI16–SI19 on `head`, where profile-view compression makes the throat/
 * face placements ordered but schematic.
 */
export const smallIntestineCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'SI1',
    regionTemplate: 'hand',
    marker: { x: 26, y: 93 },
    label: { x: 8, y: 106, text: 'SI1' },
    neighbors: [{ pointCode: 'SI2', x: 36, y: 78 }],
    note: 'Little finger · ulnar side · 0.1 cun from the corner of the nail',
  },
  {
    pointCode: 'SI2',
    regionTemplate: 'hand',
    marker: { x: 36, y: 78 },
    label: { x: 7, y: 88, text: 'SI2' },
    neighbors: [
      { pointCode: 'SI1', x: 26, y: 93 },
      { pointCode: 'SI3', x: 30, y: 58 },
    ],
    note: 'Ulnar side of the hand · distal to the fifth metacarpophalangeal joint · at the red-and-white skin junction of the transverse crease',
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
    pointCode: 'SI4',
    regionTemplate: 'hand',
    marker: { x: 28, y: 48 },
    label: { x: 5, y: 54, text: 'SI4' },
    neighbors: [
      { pointCode: 'SI3', x: 30, y: 58 },
      { pointCode: 'SI5', x: 23, y: 44 },
    ],
    note: 'Ulnar side of the palm · between the base of the fifth metacarpal and the hamate · at the red-and-white skin junction',
  },
  {
    pointCode: 'SI5',
    regionTemplate: 'hand',
    marker: { x: 23, y: 44 },
    label: { x: 5, y: 40, text: 'SI5' },
    neighbors: [
      { pointCode: 'SI4', x: 28, y: 48 },
      { pointCode: 'SI6', x: 22, y: 33 },
    ],
    note: 'Ulnar side of the wrist · depression between the styloid process of the ulna and the triquetral bone',
  },
  {
    pointCode: 'SI6',
    regionTemplate: 'hand',
    marker: { x: 22, y: 33 },
    label: { x: 4, y: 22, text: 'SI6' },
    neighbors: [{ pointCode: 'SI5', x: 23, y: 44 }],
    note: 'Dorsum of the forearm · in the bony gap radial to the head of the ulna (palm turned to the chest opens the gap)',
  },
  {
    pointCode: 'SI7',
    regionTemplate: 'arm',
    marker: { x: 59, y: 86 },
    label: { x: 38, y: 94, text: 'SI7' },
    neighbors: [{ pointCode: 'SI8', x: 25, y: 69 }],
    note: 'Dorsum of the forearm · ulnar side · on the SI5–SI8 line · 5 cun proximal to the dorsal wrist crease',
  },
  {
    pointCode: 'SI8',
    regionTemplate: 'arm',
    marker: { x: 25, y: 69 },
    label: { x: 6, y: 76, text: 'SI8' },
    neighbors: [{ pointCode: 'SI7', x: 59, y: 86 }],
    note: 'Between the olecranon of the ulna and the medial epicondyle of the humerus · depression felt with the elbow flexed',
  },
  {
    pointCode: 'SI9',
    regionTemplate: 'torso-prone',
    marker: { x: 73, y: 52 },
    label: { x: 92, y: 56, text: 'SI9' },
    neighbors: [{ pointCode: 'SI10', x: 70, y: 45 }],
    note: 'Below the posterior aspect of the shoulder joint · 1 cun above the end of the posterior axillary fold (arm adducted)',
  },
  {
    pointCode: 'SI10',
    regionTemplate: 'torso-prone',
    marker: { x: 70, y: 45 },
    label: { x: 88, y: 40, text: 'SI10' },
    neighbors: [
      { pointCode: 'SI9', x: 73, y: 52 },
      { pointCode: 'SI11', x: 63, y: 49 },
    ],
    note: 'On the scapula · directly above the end of the posterior axillary fold · below the lower border of the spine of the scapula',
  },
  {
    pointCode: 'SI11',
    regionTemplate: 'torso-prone',
    marker: { x: 63, y: 49 },
    label: { x: 80, y: 50, text: 'SI11' },
    neighbors: [
      { pointCode: 'SI10', x: 70, y: 45 },
      { pointCode: 'SI12', x: 60, y: 40 },
    ],
    note: 'On the scapula · centre of the infraspinous fossa · level with the fourth thoracic vertebra',
  },
  {
    pointCode: 'SI12',
    regionTemplate: 'torso-prone',
    marker: { x: 60, y: 40 },
    label: { x: 78, y: 32, text: 'SI12' },
    neighbors: [
      { pointCode: 'SI11', x: 63, y: 49 },
      { pointCode: 'SI13', x: 56, y: 43 },
    ],
    note: 'On the scapula · centre of the supraspinous fossa · directly above SI11 (depression when the arm is raised)',
  },
  {
    pointCode: 'SI13',
    regionTemplate: 'torso-prone',
    marker: { x: 56, y: 43 },
    label: { x: 36, y: 46, text: 'SI13' },
    neighbors: [{ pointCode: 'SI12', x: 60, y: 40 }],
    note: 'On the scapula · medial end of the supraspinous fossa · midway between SI10 and the T2 spinous process',
  },
  {
    pointCode: 'SI14',
    regionTemplate: 'torso-prone',
    marker: { x: 66, y: 39 },
    label: { x: 84, y: 28, text: 'SI14' },
    neighbors: [{ pointCode: 'SI15', x: 61, y: 31 }],
    note: 'On the upper back · 3 cun lateral to the lower border of the T1 spinous process',
  },
  {
    pointCode: 'SI15',
    regionTemplate: 'torso-prone',
    marker: { x: 61, y: 31 },
    label: { x: 74, y: 22, text: 'SI15' },
    neighbors: [{ pointCode: 'SI14', x: 66, y: 39 }],
    note: 'On the upper back · 2 cun lateral to the lower border of the C7 spinous process',
  },
  {
    pointCode: 'SI16',
    regionTemplate: 'head',
    marker: { x: 52, y: 92 },
    label: { x: 34, y: 98, text: 'SI16' },
    neighbors: [{ pointCode: 'SI17', x: 57, y: 86 }],
    note: 'Lateral neck · posterior border of the sternocleidomastoid · posterior to LI18 · level with the laryngeal prominence',
  },
  {
    pointCode: 'SI17',
    regionTemplate: 'head',
    marker: { x: 57, y: 86 },
    label: { x: 76, y: 78, text: 'SI17' },
    neighbors: [
      { pointCode: 'SI16', x: 52, y: 92 },
      { pointCode: 'SI19', x: 59, y: 81 },
    ],
    note: 'Lateral neck · posterior to the angle of the mandible · depression on the anterior border of the sternocleidomastoid',
  },
  {
    pointCode: 'SI18',
    regionTemplate: 'head',
    marker: { x: 35, y: 78 },
    label: { x: 16, y: 72, text: 'SI18' },
    neighbors: [{ pointCode: 'SI19', x: 59, y: 81 }],
    note: 'Face · directly below the outer canthus of the eye · depression on the lower border of the zygomatic bone',
  },
  {
    pointCode: 'SI19',
    regionTemplate: 'head',
    marker: { x: 59, y: 81 },
    label: { x: 76, y: 68, text: 'SI19' },
    neighbors: [{ pointCode: 'SI18', x: 35, y: 78 }],
    note: 'Face · anterior to the tragus · posterior to the mandibular condyle · depression opens with the mouth open',
  },
];
