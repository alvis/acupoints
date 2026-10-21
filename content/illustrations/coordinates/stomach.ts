import type { CoordinateEntry } from './schema';

/**
 * Stomach channel — 45 points, the widest template span. Facial arc
 * ST1–ST8 plus the anterior-neck drop ST9–ST11 sit on `head` (the profile
 * view compresses the facial third — ordered but schematic, flagged).
 * ST12–ST30 hold torso-supine: the 4-cun chest line (x=62) and the 2-cun
 * abdominal ladder (x=56) share the Kidney vertical scales (clavicle
 * y≈31, nipple line y=48 = fourth intercostal space, umbilicus y=78,
 * ≈4/cun above and ≈4.4/cun below it, pubic level y=100). ST31–ST41 run
 * the anterolateral leg interpolated between curated ST35/ST36/ST37;
 * ST42–ST45 finish on `foot` pinned to curated ST43/ST44/ST45 — ST42
 * joins the foot per its "highest point of the dorsum" location.
 */
export const stomachCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'ST1',
    regionTemplate: 'head',
    marker: { x: 31, y: 73 },
    label: { x: 14, y: 70, text: 'ST1' },
    neighbors: [{ pointCode: 'ST2', x: 31, y: 77 }],
    note: 'Face · directly below the pupil · between the eyeball and the infraorbital border',
  },
  {
    pointCode: 'ST2',
    regionTemplate: 'head',
    marker: { x: 31, y: 77 },
    label: { x: 46, y: 74, text: 'ST2' },
    neighbors: [
      { pointCode: 'ST1', x: 31, y: 73 },
      { pointCode: 'ST3', x: 24, y: 80 },
    ],
    note: 'Face · directly below the pupil · depression of the infraorbital foramen',
  },
  {
    pointCode: 'ST3',
    regionTemplate: 'head',
    marker: { x: 24, y: 80 },
    label: { x: 8, y: 84, text: 'ST3' },
    neighbors: [
      { pointCode: 'ST2', x: 31, y: 77 },
      { pointCode: 'ST4', x: 27, y: 88 },
    ],
    note: 'Face · directly below the pupil · level with the lower border of the nasal ala · lateral to the nasolabial groove',
  },
  {
    pointCode: 'ST4',
    regionTemplate: 'head',
    marker: { x: 27, y: 88 },
    label: { x: 40, y: 92, text: 'ST4' },
    neighbors: [
      { pointCode: 'ST3', x: 24, y: 80 },
      { pointCode: 'ST5', x: 38, y: 84 },
    ],
    note: 'Face · lateral to the corner of the mouth · directly below the pupil',
  },
  {
    pointCode: 'ST5',
    regionTemplate: 'head',
    marker: { x: 38, y: 84 },
    label: { x: 52, y: 90, text: 'ST5' },
    neighbors: [
      { pointCode: 'ST4', x: 27, y: 88 },
      { pointCode: 'ST6', x: 46, y: 82 },
    ],
    note: 'Anterior to the angle of the mandible · anterior border of the masseter attachment · over the facial artery pulse',
  },
  {
    pointCode: 'ST6',
    regionTemplate: 'head',
    marker: { x: 46, y: 82 },
    label: { x: 60, y: 84, text: 'ST6' },
    neighbors: [
      { pointCode: 'ST5', x: 38, y: 84 },
      { pointCode: 'ST7', x: 58, y: 74 },
    ],
    note: 'Cheek · about one finger-breadth above and anterior to the angle of the mandible · over the masseter bulge',
  },
  {
    pointCode: 'ST7',
    regionTemplate: 'head',
    marker: { x: 58, y: 74 },
    label: { x: 72, y: 70, text: 'ST7' },
    neighbors: [
      { pointCode: 'ST6', x: 46, y: 82 },
      { pointCode: 'ST8', x: 32, y: 38 },
    ],
    note: 'In front of the ear · depression between the zygomatic arch and the mandibular notch · closes with the mouth open',
  },
  {
    pointCode: 'ST8',
    regionTemplate: 'head',
    marker: { x: 32, y: 38 },
    label: { x: 14, y: 30, text: 'ST8' },
    neighbors: [
      { pointCode: 'ST7', x: 58, y: 74 },
      { pointCode: 'ST9', x: 23, y: 90 },
    ],
    note: 'Side of the head · 0.5 cun above the hairline at the temple corner · 4.5 cun lateral to the head midline',
  },
  {
    pointCode: 'ST9',
    regionTemplate: 'head',
    marker: { x: 23, y: 90 },
    label: { x: 6, y: 94, text: 'ST9' },
    neighbors: [
      { pointCode: 'ST8', x: 32, y: 38 },
      { pointCode: 'ST10', x: 24, y: 95 },
    ],
    note: 'Neck · beside the laryngeal prominence · anterior border of the sternocleidomastoid · over the carotid pulse',
  },
  {
    pointCode: 'ST10',
    regionTemplate: 'head',
    marker: { x: 24, y: 95 },
    label: { x: 8, y: 102, text: 'ST10' },
    neighbors: [
      { pointCode: 'ST9', x: 23, y: 90 },
      { pointCode: 'ST11', x: 25, y: 100 },
    ],
    note: 'Neck · anterior border of the sternocleidomastoid · midway between Renying (ST9) and Qishe (ST11)',
  },
  {
    pointCode: 'ST11',
    regionTemplate: 'head',
    marker: { x: 25, y: 100 },
    label: { x: 8, y: 110, text: 'ST11' },
    neighbors: [{ pointCode: 'ST10', x: 24, y: 95 }],
    note: 'Neck · upper border of the medial end of the clavicle · between the sternal and clavicular heads of the SCM',
  },
  {
    pointCode: 'ST12',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 29 },
    label: { x: 80, y: 26, text: 'ST12' },
    neighbors: [{ pointCode: 'ST13', x: 62, y: 32 }],
    note: 'Centre of the supraclavicular fossa · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST13',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 32 },
    label: { x: 80, y: 32, text: 'ST13' },
    neighbors: [
      { pointCode: 'ST12', x: 62, y: 29 },
      { pointCode: 'ST14', x: 62, y: 35 },
    ],
    note: 'Chest · at the lower border of the midpoint of the clavicle · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST14',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 35 },
    label: { x: 80, y: 38, text: 'ST14' },
    neighbors: [
      { pointCode: 'ST13', x: 62, y: 32 },
      { pointCode: 'ST15', x: 62, y: 39 },
    ],
    note: 'Chest · first intercostal space · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST15',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 39 },
    label: { x: 80, y: 42, text: 'ST15' },
    neighbors: [
      { pointCode: 'ST14', x: 62, y: 35 },
      { pointCode: 'ST16', x: 62, y: 43 },
    ],
    note: 'Chest · second intercostal space · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST16',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 43 },
    label: { x: 80, y: 46, text: 'ST16' },
    neighbors: [
      { pointCode: 'ST15', x: 62, y: 39 },
      { pointCode: 'ST17', x: 62, y: 48 },
    ],
    note: 'Chest · third intercostal space · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST17',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 48 },
    label: { x: 80, y: 52, text: 'ST17' },
    neighbors: [
      { pointCode: 'ST16', x: 62, y: 43 },
      { pointCode: 'ST18', x: 62, y: 53 },
    ],
    note: 'Chest · fourth intercostal space · centre of the nipple · 4 cun lateral to the anterior midline (landmark point)',
  },
  {
    pointCode: 'ST18',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 53 },
    label: { x: 80, y: 56, text: 'ST18' },
    neighbors: [
      { pointCode: 'ST17', x: 62, y: 48 },
      { pointCode: 'ST19', x: 56, y: 54 },
    ],
    note: 'Chest · directly below the nipple at the root of the breast · fifth intercostal space · 4 cun lateral to the midline',
  },
  {
    pointCode: 'ST19',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 54 },
    label: { x: 40, y: 52, text: 'ST19' },
    neighbors: [
      { pointCode: 'ST18', x: 62, y: 53 },
      { pointCode: 'ST20', x: 56, y: 58 },
    ],
    note: 'Upper abdomen · 6 cun above the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST20',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 58 },
    label: { x: 72, y: 60, text: 'ST20' },
    neighbors: [
      { pointCode: 'ST19', x: 56, y: 54 },
      { pointCode: 'ST21', x: 56, y: 62 },
    ],
    note: 'Upper abdomen · 5 cun above the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST21',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 62 },
    label: { x: 40, y: 62, text: 'ST21' },
    neighbors: [
      { pointCode: 'ST20', x: 56, y: 58 },
      { pointCode: 'ST22', x: 56, y: 66 },
    ],
    note: 'Upper abdomen · 4 cun above the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST22',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 66 },
    label: { x: 72, y: 68, text: 'ST22' },
    neighbors: [
      { pointCode: 'ST21', x: 56, y: 62 },
      { pointCode: 'ST23', x: 56, y: 70 },
    ],
    note: 'Upper abdomen · 3 cun above the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST23',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 70 },
    label: { x: 40, y: 70, text: 'ST23' },
    neighbors: [
      { pointCode: 'ST22', x: 56, y: 66 },
      { pointCode: 'ST24', x: 56, y: 74 },
    ],
    note: 'Upper abdomen · 2 cun above the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST24',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 74 },
    label: { x: 72, y: 74, text: 'ST24' },
    neighbors: [
      { pointCode: 'ST23', x: 56, y: 70 },
      { pointCode: 'ST25', x: 56, y: 78 },
    ],
    note: 'Upper abdomen · 1 cun above the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST25',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 78 },
    label: { x: 72, y: 82, text: 'ST25' },
    neighbors: [
      { pointCode: 'ST24', x: 56, y: 74 },
      { pointCode: 'ST26', x: 56, y: 82 },
    ],
    note: 'Middle abdomen · 2 cun lateral to the centre of the umbilicus',
  },
  {
    pointCode: 'ST26',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 82 },
    label: { x: 40, y: 84, text: 'ST26' },
    neighbors: [
      { pointCode: 'ST25', x: 56, y: 78 },
      { pointCode: 'ST27', x: 56, y: 87 },
    ],
    note: 'Lower abdomen · 1 cun below the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST27',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 87 },
    label: { x: 72, y: 90, text: 'ST27' },
    neighbors: [
      { pointCode: 'ST26', x: 56, y: 82 },
      { pointCode: 'ST28', x: 56, y: 91 },
    ],
    note: 'Lower abdomen · 2 cun below the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST28',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 91 },
    label: { x: 40, y: 92, text: 'ST28' },
    neighbors: [
      { pointCode: 'ST27', x: 56, y: 87 },
      { pointCode: 'ST29', x: 56, y: 96 },
    ],
    note: 'Lower abdomen · 3 cun below the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST29',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 96 },
    label: { x: 72, y: 96, text: 'ST29' },
    neighbors: [
      { pointCode: 'ST28', x: 56, y: 91 },
      { pointCode: 'ST30', x: 56, y: 100 },
    ],
    note: 'Lower abdomen · 4 cun below the centre of the umbilicus · 2 cun lateral to the anterior midline',
  },
  {
    pointCode: 'ST30',
    regionTemplate: 'torso-supine',
    marker: { x: 56, y: 100 },
    label: { x: 40, y: 102, text: 'ST30' },
    neighbors: [{ pointCode: 'ST29', x: 56, y: 96 }],
    note: 'Just above the groin · 5 cun below the umbilicus · 2 cun lateral to the midline · level with the upper pubic symphysis',
  },
  {
    pointCode: 'ST31',
    regionTemplate: 'leg',
    marker: { x: 55, y: 18 },
    label: { x: 70, y: 14, text: 'ST31' },
    neighbors: [{ pointCode: 'ST32', x: 53, y: 42 }],
    note: 'Front of the thigh · on the ASIS-to-lateral-patella line · level with the perineum · lateral to sartorius',
  },
  {
    pointCode: 'ST32',
    regionTemplate: 'leg',
    marker: { x: 53, y: 42 },
    label: { x: 70, y: 40, text: 'ST32' },
    neighbors: [
      { pointCode: 'ST31', x: 55, y: 18 },
      { pointCode: 'ST33', x: 52, y: 52 },
    ],
    note: 'Front of the thigh · on the ASIS-to-lateral-patella line · 6 cun above the base of the patella',
  },
  {
    pointCode: 'ST33',
    regionTemplate: 'leg',
    marker: { x: 52, y: 52 },
    label: { x: 70, y: 50, text: 'ST33' },
    neighbors: [
      { pointCode: 'ST32', x: 53, y: 42 },
      { pointCode: 'ST34', x: 51, y: 55 },
    ],
    note: 'Front of the thigh · on the ASIS-to-lateral-patella line · 3 cun above the base of the patella',
  },
  {
    pointCode: 'ST34',
    regionTemplate: 'leg',
    marker: { x: 51, y: 55 },
    label: { x: 34, y: 54, text: 'ST34' },
    neighbors: [
      { pointCode: 'ST33', x: 52, y: 52 },
      { pointCode: 'ST35', x: 50, y: 74 },
    ],
    note: 'Knee flexed · front of the thigh · on the ASIS-to-lateral-patella line · 2 cun above the base of the patella',
  },
  {
    pointCode: 'ST35',
    regionTemplate: 'leg',
    marker: { x: 50, y: 74 },
    label: { x: 70, y: 66, text: 'ST35' },
    neighbors: [
      { pointCode: 'ST34', x: 51, y: 55 },
      { pointCode: 'ST36', x: 50, y: 84 },
    ],
    note: 'Knee flexed · lateral depression between the patella and the patellar ligament (outer knee eye)',
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
    pointCode: 'ST37',
    regionTemplate: 'leg',
    marker: { x: 50, y: 96 },
    label: { x: 68, y: 98, text: 'ST37' },
    neighbors: [
      { pointCode: 'ST36', x: 50, y: 84 },
      { pointCode: 'ST38', x: 51, y: 100 },
    ],
    note: 'Anterolateral lower leg · 6 cun below Dubi (ST35) · one finger-breadth lateral to the anterior crest of the tibia',
  },
  {
    pointCode: 'ST38',
    regionTemplate: 'leg',
    marker: { x: 51, y: 100 },
    label: { x: 32, y: 102, text: 'ST38' },
    neighbors: [
      { pointCode: 'ST37', x: 50, y: 96 },
      { pointCode: 'ST39', x: 51, y: 102 },
    ],
    note: 'Anterolateral lower leg · 8 cun below Dubi (ST35) · midway between the popliteal crease and the lateral malleolus',
  },
  {
    pointCode: 'ST39',
    regionTemplate: 'leg',
    marker: { x: 51, y: 102 },
    label: { x: 68, y: 106, text: 'ST39' },
    neighbors: [
      { pointCode: 'ST38', x: 51, y: 100 },
      { pointCode: 'ST40', x: 56, y: 100 },
    ],
    note: 'Anterolateral lower leg · 9 cun below Dubi (ST35) · 1 cun below Tiaokou (ST38) between tibia and fibula',
  },
  {
    pointCode: 'ST40',
    regionTemplate: 'leg',
    marker: { x: 56, y: 100 },
    label: { x: 72, y: 94, text: 'ST40' },
    neighbors: [
      { pointCode: 'ST39', x: 51, y: 102 },
      { pointCode: 'ST41', x: 54, y: 113 },
    ],
    note: 'Anterolateral lower leg · 8 cun above the tip of the lateral malleolus · lateral to Tiaokou (ST38)',
  },
  {
    pointCode: 'ST41',
    regionTemplate: 'leg',
    marker: { x: 54, y: 113 },
    label: { x: 70, y: 118, text: 'ST41' },
    neighbors: [{ pointCode: 'ST40', x: 56, y: 100 }],
    note: 'Midpoint of the transverse ankle crease · depression between the extensor hallucis longus and digitorum longus tendons',
  },
  {
    pointCode: 'ST42',
    regionTemplate: 'foot',
    marker: { x: 64, y: 69 },
    label: { x: 50, y: 60, text: 'ST42' },
    neighbors: [{ pointCode: 'ST43', x: 78, y: 72 }],
    note: 'Highest point of the dorsum of the foot · between the extensor hallucis longus and digitorum longus tendons · dorsal artery pulse',
  },
  {
    pointCode: 'ST43',
    regionTemplate: 'foot',
    marker: { x: 78, y: 72 },
    label: { x: 88, y: 84, text: 'ST43' },
    neighbors: [
      { pointCode: 'ST42', x: 64, y: 69 },
      { pointCode: 'ST44', x: 86, y: 72 },
    ],
    note: 'Dorsum of foot · depression distal to the junction of the second and third metatarsal bones',
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
    pointCode: 'ST45',
    regionTemplate: 'foot',
    marker: { x: 92, y: 74 },
    label: { x: 94, y: 84, text: 'ST45' },
    neighbors: [{ pointCode: 'ST44', x: 86, y: 72 }],
    note: 'Second toe · lateral side of the distal segment · 0.1 cun from the corner of the toenail',
  },
];
