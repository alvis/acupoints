import type { CoordinateEntry } from './schema';

/**
 * Du (Governing Vessel) channel — 28 points. GV1–GV14 run the posterior
 * midline on torso-prone: curated GV14 (50,30) anchors the C7/T1 hollow
 * and pinned GV13 (50,38) starts a ≈4.5-unit/interspace ladder down the
 * spine to the sacral hiatus (GV2) and coccyx tip (GV1). GV15–GV28 hold
 * `head`: the nape pair GV15/GV16 around pinned GV16 (50,96) beside
 * curated GB20, then the scalp midline arcs up the occiput through GV17/
 * GV18 to the pinned vertex cluster GV19 (54,18) / curated GV20 (46,18) /
 * GV21 (38,20), descends the forehead to the anterior hairline, and
 * finishes down the nose, philtrum, and lip (profile compression makes
 * the facial tail schematic — flagged for spot-check).
 */
export const duCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'GV1',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 113 },
    label: { x: 66, y: 114, text: 'GV1' },
    neighbors: [{ pointCode: 'GV2', x: 50, y: 107 }],
    note: 'Below the tip of the coccyx · midpoint between the coccygeal tip and the anus',
  },
  {
    pointCode: 'GV2',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 107 },
    label: { x: 34, y: 106, text: 'GV2' },
    neighbors: [
      { pointCode: 'GV1', x: 50, y: 113 },
      { pointCode: 'GV3', x: 50, y: 101 },
    ],
    note: 'Sacrum · posterior midline · exactly over the sacral hiatus between the two sacral cornua',
  },
  {
    pointCode: 'GV3',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 101 },
    label: { x: 66, y: 100, text: 'GV3' },
    neighbors: [
      { pointCode: 'GV2', x: 50, y: 107 },
      { pointCode: 'GV4', x: 50, y: 92 },
    ],
    note: 'Lower back · posterior midline · below the spinous process of L4 · level with the highest points of the iliac crests',
  },
  {
    pointCode: 'GV4',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 92 },
    label: { x: 34, y: 92, text: 'GV4' },
    neighbors: [
      { pointCode: 'GV3', x: 50, y: 101 },
      { pointCode: 'GV5', x: 50, y: 87 },
    ],
    note: 'Lower back · posterior midline · below the spinous process of L2 · level with the umbilicus',
  },
  {
    pointCode: 'GV5',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 87 },
    label: { x: 66, y: 86, text: 'GV5' },
    neighbors: [
      { pointCode: 'GV4', x: 50, y: 92 },
      { pointCode: 'GV6', x: 50, y: 83 },
    ],
    note: 'Lower back · posterior midline · below the spinous process of the first lumbar vertebra',
  },
  {
    pointCode: 'GV6',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 83 },
    label: { x: 34, y: 84, text: 'GV6' },
    neighbors: [
      { pointCode: 'GV5', x: 50, y: 87 },
      { pointCode: 'GV7', x: 50, y: 78 },
    ],
    note: 'Back · posterior midline · below the spinous process of the eleventh thoracic vertebra',
  },
  {
    pointCode: 'GV7',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 78 },
    label: { x: 66, y: 76, text: 'GV7' },
    neighbors: [
      { pointCode: 'GV6', x: 50, y: 83 },
      { pointCode: 'GV8', x: 50, y: 74 },
    ],
    note: 'Back · posterior midline · below the spinous process of the tenth thoracic vertebra',
  },
  {
    pointCode: 'GV8',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 74 },
    label: { x: 34, y: 74, text: 'GV8' },
    neighbors: [
      { pointCode: 'GV7', x: 50, y: 78 },
      { pointCode: 'GV9', x: 50, y: 65 },
    ],
    note: 'Back · posterior midline · below the spinous process of the ninth thoracic vertebra',
  },
  {
    pointCode: 'GV9',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 65 },
    label: { x: 66, y: 64, text: 'GV9' },
    neighbors: [
      { pointCode: 'GV8', x: 50, y: 74 },
      { pointCode: 'GV10', x: 50, y: 60 },
    ],
    note: 'Back · posterior midline · below the spinous process of T7 · level with the inferior angles of the scapulae',
  },
  {
    pointCode: 'GV10',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 60 },
    label: { x: 34, y: 62, text: 'GV10' },
    neighbors: [
      { pointCode: 'GV9', x: 50, y: 65 },
      { pointCode: 'GV11', x: 50, y: 56 },
    ],
    note: 'Back · posterior midline · below the spinous process of the sixth thoracic vertebra',
  },
  {
    pointCode: 'GV11',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 56 },
    label: { x: 66, y: 54, text: 'GV11' },
    neighbors: [
      { pointCode: 'GV10', x: 50, y: 60 },
      { pointCode: 'GV12', x: 50, y: 47 },
    ],
    note: 'Back · posterior midline · below the spinous process of the fifth thoracic vertebra',
  },
  {
    pointCode: 'GV12',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 47 },
    label: { x: 34, y: 46, text: 'GV12' },
    neighbors: [
      { pointCode: 'GV11', x: 50, y: 56 },
      { pointCode: 'GV13', x: 50, y: 38 },
    ],
    note: 'Back · posterior midline · below the spinous process of the third thoracic vertebra',
  },
  {
    pointCode: 'GV13',
    regionTemplate: 'torso-prone',
    marker: { x: 50, y: 38 },
    label: { x: 66, y: 42, text: 'GV13' },
    neighbors: [
      { pointCode: 'GV12', x: 50, y: 47 },
      { pointCode: 'GV14', x: 50, y: 30 },
    ],
    note: 'Back · posterior midline · below the spinous process of the first thoracic vertebra',
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
    pointCode: 'GV15',
    regionTemplate: 'head',
    marker: { x: 52, y: 93 },
    label: { x: 38, y: 98, text: 'GV15' },
    neighbors: [{ pointCode: 'GV16', x: 50, y: 96 }],
    note: 'Nape · 0.5 cun directly above the midpoint of the posterior hairline · below the first cervical vertebra',
  },
  {
    pointCode: 'GV16',
    regionTemplate: 'head',
    marker: { x: 50, y: 96 },
    label: { x: 34, y: 104, text: 'GV16' },
    neighbors: [
      { pointCode: 'GV15', x: 52, y: 93 },
      { pointCode: 'GB20', x: 58, y: 94 },
    ],
    note: 'Nape · 1 cun directly above the midpoint of the posterior hairline · below the external occipital protuberance',
  },
  {
    pointCode: 'GV17',
    regionTemplate: 'head',
    marker: { x: 53, y: 85 },
    label: { x: 66, y: 78, text: 'GV17' },
    neighbors: [{ pointCode: 'GV16', x: 50, y: 96 }],
    note: 'Head · 2.5 cun directly above the posterior hairline midpoint · upper border of the external occipital protuberance',
  },
  {
    pointCode: 'GV18',
    regionTemplate: 'head',
    marker: { x: 52, y: 52 },
    label: { x: 38, y: 50, text: 'GV18' },
    neighbors: [
      { pointCode: 'GV17', x: 53, y: 85 },
      { pointCode: 'GV19', x: 54, y: 18 },
    ],
    note: 'Head · 4 cun directly above the posterior hairline midpoint · midway between Naohu (GV17) and Baihui (GV20)',
  },
  {
    pointCode: 'GV19',
    regionTemplate: 'head',
    marker: { x: 54, y: 18 },
    label: { x: 68, y: 12, text: 'GV19' },
    neighbors: [
      { pointCode: 'GV18', x: 52, y: 52 },
      { pointCode: 'GV20', x: 46, y: 18 },
    ],
    note: 'Head · 5.5 cun directly above the posterior hairline midpoint · 1.5 cun behind Baihui (GV20)',
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
    pointCode: 'GV21',
    regionTemplate: 'head',
    marker: { x: 38, y: 20 },
    label: { x: 22, y: 14, text: 'GV21' },
    neighbors: [
      { pointCode: 'GV20', x: 46, y: 18 },
      { pointCode: 'GV22', x: 31, y: 25 },
    ],
    note: 'Head · 3.5 cun directly above the anterior hairline midpoint · 1.5 cun in front of Baihui (GV20)',
  },
  {
    pointCode: 'GV22',
    regionTemplate: 'head',
    marker: { x: 31, y: 25 },
    label: { x: 16, y: 26, text: 'GV22' },
    neighbors: [
      { pointCode: 'GV21', x: 38, y: 20 },
      { pointCode: 'GV23', x: 25, y: 31 },
    ],
    note: 'Head · 2 cun directly above the midpoint of the anterior hairline (3 cun in front of Baihui)',
  },
  {
    pointCode: 'GV23',
    regionTemplate: 'head',
    marker: { x: 25, y: 31 },
    label: { x: 36, y: 34, text: 'GV23' },
    neighbors: [
      { pointCode: 'GV22', x: 31, y: 25 },
      { pointCode: 'GV24', x: 21, y: 36 },
    ],
    note: 'Head · 1 cun directly above the midpoint of the anterior hairline',
  },
  {
    pointCode: 'GV24',
    regionTemplate: 'head',
    marker: { x: 21, y: 36 },
    label: { x: 6, y: 30, text: 'GV24' },
    neighbors: [
      { pointCode: 'GV23', x: 25, y: 31 },
      { pointCode: 'GV25', x: 12, y: 64 },
    ],
    note: 'Head · 0.5 cun directly above the midpoint of the anterior hairline',
  },
  {
    pointCode: 'GV25',
    regionTemplate: 'head',
    marker: { x: 12, y: 64 },
    label: { x: 26, y: 60, text: 'GV25' },
    neighbors: [
      { pointCode: 'GV24', x: 21, y: 36 },
      { pointCode: 'GV26', x: 15, y: 74 },
    ],
    note: 'Face · at the very centre of the tip of the nose',
  },
  {
    pointCode: 'GV26',
    regionTemplate: 'head',
    marker: { x: 15, y: 74 },
    label: { x: 28, y: 76, text: 'GV26' },
    neighbors: [
      { pointCode: 'GV25', x: 12, y: 64 },
      { pointCode: 'GV27', x: 17, y: 81 },
    ],
    note: 'Face · junction of the upper third and middle third of the philtrum groove',
  },
  {
    pointCode: 'GV27',
    regionTemplate: 'head',
    marker: { x: 17, y: 81 },
    label: { x: 32, y: 88, text: 'GV27' },
    neighbors: [
      { pointCode: 'GV26', x: 15, y: 74 },
      { pointCode: 'GV28', x: 22, y: 88 },
    ],
    note: 'Face · at the tip of the upper lip where the philtrum joins the red lip',
  },
  {
    pointCode: 'GV28',
    regionTemplate: 'head',
    marker: { x: 22, y: 88 },
    label: { x: 34, y: 98, text: 'GV28' },
    neighbors: [{ pointCode: 'GV27', x: 17, y: 81 }],
    note: 'Inside the upper lip · junction of the upper labial frenulum and the upper gum (schematic on the profile view)',
  },
];
