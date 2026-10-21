import type { CoordinateEntry } from './schema';

/**
 * Ren (Conception Vessel) channel — 24 points, all torso-supine on the
 * anterior midline (x=50). Curated CV17 (50,48) anchors the fourth
 * intercostal space and pinned CV16 (50,58) the sternocostal junction;
 * the chest climbs one ≈6-unit intercostal step per space to the
 * suprasternal fossa and throat. The abdomen fits CV9–CV15 between the
 * pinned junction and the umbilicus CV8 (50,78) at ≈2.5 units/cun — a
 * deliberate local fit (the Kidney/Stomach side ladders use ≈4/cun);
 * below the navel the shared ≈4.4/cun scale runs to the pubis (CV2,
 * y=100) and perineum (CV1). CV23/CV24 ride above the clavicles into the
 * throat/chin zone of the drawing — schematic, flagged for spot-check.
 */
export const renCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'CV1',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 105 },
    label: { x: 64, y: 108, text: 'CV1' },
    neighbors: [{ pointCode: 'CV2', x: 50, y: 100 }],
    note: 'Perineum · midway between the anus and the posterior border of the scrotum or posterior labial junction',
  },
  {
    pointCode: 'CV2',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 100 },
    label: { x: 34, y: 102, text: 'CV2' },
    neighbors: [
      { pointCode: 'CV1', x: 50, y: 105 },
      { pointCode: 'CV3', x: 50, y: 96 },
    ],
    note: 'Lower abdomen · anterior midline · midpoint of the upper border of the pubic symphysis',
  },
  {
    pointCode: 'CV3',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 96 },
    label: { x: 64, y: 94, text: 'CV3' },
    neighbors: [
      { pointCode: 'CV2', x: 50, y: 100 },
      { pointCode: 'CV4', x: 50, y: 91 },
    ],
    note: 'Lower abdomen · anterior midline · 4 cun below the centre of the umbilicus',
  },
  {
    pointCode: 'CV4',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 91 },
    label: { x: 34, y: 92, text: 'CV4' },
    neighbors: [
      { pointCode: 'CV3', x: 50, y: 96 },
      { pointCode: 'CV5', x: 50, y: 87 },
    ],
    note: 'Lower abdomen · anterior midline · 3 cun below the centre of the umbilicus',
  },
  {
    pointCode: 'CV5',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 87 },
    label: { x: 64, y: 86, text: 'CV5' },
    neighbors: [
      { pointCode: 'CV4', x: 50, y: 91 },
      { pointCode: 'CV6', x: 50, y: 85 },
    ],
    note: 'Lower abdomen · anterior midline · 2 cun below the centre of the umbilicus',
  },
  {
    pointCode: 'CV6',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 85 },
    label: { x: 34, y: 88, text: 'CV6' },
    neighbors: [
      { pointCode: 'CV5', x: 50, y: 87 },
      { pointCode: 'CV7', x: 50, y: 82 },
    ],
    note: 'Lower abdomen · anterior midline · 1.5 cun below the centre of the umbilicus',
  },
  {
    pointCode: 'CV7',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 82 },
    label: { x: 64, y: 84, text: 'CV7' },
    neighbors: [
      { pointCode: 'CV6', x: 50, y: 85 },
      { pointCode: 'CV8', x: 50, y: 78 },
    ],
    note: 'Lower abdomen · anterior midline · 1 cun below the centre of the umbilicus',
  },
  {
    pointCode: 'CV8',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 78 },
    label: { x: 34, y: 80, text: 'CV8' },
    neighbors: [
      { pointCode: 'CV7', x: 50, y: 82 },
      { pointCode: 'CV9', x: 50, y: 76 },
    ],
    note: 'Centre of the abdomen · middle of the umbilicus',
  },
  {
    pointCode: 'CV9',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 76 },
    label: { x: 64, y: 78, text: 'CV9' },
    neighbors: [
      { pointCode: 'CV8', x: 50, y: 78 },
      { pointCode: 'CV10', x: 50, y: 73 },
    ],
    note: 'Upper abdomen · anterior midline · 1 cun above the centre of the umbilicus',
  },
  {
    pointCode: 'CV10',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 73 },
    label: { x: 34, y: 74, text: 'CV10' },
    neighbors: [
      { pointCode: 'CV9', x: 50, y: 76 },
      { pointCode: 'CV11', x: 50, y: 70 },
    ],
    note: 'Upper abdomen · anterior midline · 2 cun above the centre of the umbilicus',
  },
  {
    pointCode: 'CV11',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 70 },
    label: { x: 64, y: 70, text: 'CV11' },
    neighbors: [
      { pointCode: 'CV10', x: 50, y: 73 },
      { pointCode: 'CV12', x: 50, y: 68 },
    ],
    note: 'Upper abdomen · anterior midline · 3 cun above the centre of the umbilicus',
  },
  {
    pointCode: 'CV12',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 68 },
    label: { x: 34, y: 68, text: 'CV12' },
    neighbors: [
      { pointCode: 'CV11', x: 50, y: 70 },
      { pointCode: 'CV13', x: 50, y: 66 },
    ],
    note: 'Upper abdomen · anterior midline · 4 cun above the umbilicus · midway between umbilicus and sternocostal junction',
  },
  {
    pointCode: 'CV13',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 66 },
    label: { x: 64, y: 66, text: 'CV13' },
    neighbors: [
      { pointCode: 'CV12', x: 50, y: 68 },
      { pointCode: 'CV14', x: 50, y: 63 },
    ],
    note: 'Upper abdomen · anterior midline · 5 cun above the centre of the umbilicus',
  },
  {
    pointCode: 'CV14',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 63 },
    label: { x: 34, y: 64, text: 'CV14' },
    neighbors: [
      { pointCode: 'CV13', x: 50, y: 66 },
      { pointCode: 'CV15', x: 50, y: 61 },
    ],
    note: 'Upper abdomen · anterior midline · 6 cun above the umbilicus · a quarter of the way down from the sternocostal junction',
  },
  {
    pointCode: 'CV15',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 61 },
    label: { x: 64, y: 62, text: 'CV15' },
    neighbors: [
      { pointCode: 'CV14', x: 50, y: 63 },
      { pointCode: 'CV16', x: 50, y: 58 },
    ],
    note: 'Upper abdomen · anterior midline · 1 cun below the sternocostal junction (xiphoid process)',
  },
  {
    pointCode: 'CV16',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 58 },
    label: { x: 32, y: 56, text: 'CV16' },
    neighbors: [
      { pointCode: 'CV15', x: 50, y: 61 },
      { pointCode: 'CV17', x: 50, y: 48 },
    ],
    note: 'Chest · anterior midline · level with the fifth intercostal space · at the sternocostal junction',
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
    pointCode: 'CV18',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 42 },
    label: { x: 66, y: 40, text: 'CV18' },
    neighbors: [
      { pointCode: 'CV17', x: 50, y: 48 },
      { pointCode: 'CV19', x: 50, y: 36 },
    ],
    note: 'Chest · anterior midline · level with the third intercostal space',
  },
  {
    pointCode: 'CV19',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 36 },
    label: { x: 34, y: 36, text: 'CV19' },
    neighbors: [
      { pointCode: 'CV18', x: 50, y: 42 },
      { pointCode: 'CV20', x: 50, y: 31 },
    ],
    note: 'Chest · anterior midline · level with the second intercostal space',
  },
  {
    pointCode: 'CV20',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 31 },
    label: { x: 66, y: 28, text: 'CV20' },
    neighbors: [
      { pointCode: 'CV19', x: 50, y: 36 },
      { pointCode: 'CV21', x: 50, y: 27 },
    ],
    note: 'Chest · anterior midline · level with the first intercostal space · midpoint of the sternal angle',
  },
  {
    pointCode: 'CV21',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 27 },
    label: { x: 34, y: 26, text: 'CV21' },
    neighbors: [
      { pointCode: 'CV20', x: 50, y: 31 },
      { pointCode: 'CV22', x: 50, y: 24 },
    ],
    note: 'Chest · anterior midline · 1 cun below the centre of the suprasternal fossa',
  },
  {
    pointCode: 'CV22',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 24 },
    label: { x: 66, y: 22, text: 'CV22' },
    neighbors: [
      { pointCode: 'CV21', x: 50, y: 27 },
      { pointCode: 'CV23', x: 50, y: 19 },
    ],
    note: 'Neck · anterior midline · centre of the suprasternal fossa · depression below the laryngeal prominence',
  },
  {
    pointCode: 'CV23',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 19 },
    label: { x: 34, y: 16, text: 'CV23' },
    neighbors: [
      { pointCode: 'CV22', x: 50, y: 24 },
      { pointCode: 'CV24', x: 50, y: 13 },
    ],
    note: 'Neck · anterior midline · above the laryngeal prominence · upper border of the hyoid bone',
  },
  {
    pointCode: 'CV24',
    regionTemplate: 'torso-supine',
    marker: { x: 50, y: 13 },
    label: { x: 64, y: 10, text: 'CV24' },
    neighbors: [{ pointCode: 'CV23', x: 50, y: 19 }],
    note: 'Face · central depression of the mentolabial groove (schematic near the top edge of the supine view)',
  },
];
