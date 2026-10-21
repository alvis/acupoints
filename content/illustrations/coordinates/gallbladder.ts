import type { CoordinateEntry } from './schema';

/**
 * Gallbladder channel — 44 points, the longest head run. GB1–GB20 hold
 * `head`: the face/ear arc GB1–GB3 and the ST8-to-GB7 temple arc (curated
 * GB1 (36,54) and pinned ST8 anchor), the retroauricular GB9→GB12 arc
 * thirds into pinned GB12 (68,86), the frontal GB13–GB18 scalp ladder
 * above the pupil line, GB19 over the occiput, and curated GB20 (58,94)
 * closing the nape. GB21 sits torso-prone at the GV14-to-acromion
 * midpoint; GB22–GB28 hold torso-supine on the lateral chest/waist wall
 * (midaxillary x≈74–78, intercostal ladder matched to SP21/ST17);
 * GB29–GB39 run the lateral hip/thigh/calf on `leg` (fibula ladder
 * ≈2.7 units/cun above the lateral malleolus y≈117); GB40–GB44 finish on
 * `foot`, where lateral-surface placements are schematic on the
 * medial-profile drawing (flagged).
 */
export const gallbladderCoordinates: CoordinateEntry[] = [
  {
    pointCode: 'GB1',
    regionTemplate: 'head',
    marker: { x: 36, y: 54 },
    label: { x: 20, y: 48, text: 'GB1' },
    neighbors: [{ pointCode: 'GB2', x: 57, y: 86 }],
    note: 'Face · lateral to the outer canthus of the eye · on the lateral border of the orbit',
  },
  {
    pointCode: 'GB2',
    regionTemplate: 'head',
    marker: { x: 57, y: 86 },
    label: { x: 42, y: 98, text: 'GB2' },
    neighbors: [
      { pointCode: 'GB1', x: 36, y: 54 },
      { pointCode: 'GB3', x: 56, y: 70 },
    ],
    note: 'Face · anterior to the intertragic notch · behind the mandibular condyle · depression appears with the mouth open',
  },
  {
    pointCode: 'GB3',
    regionTemplate: 'head',
    marker: { x: 56, y: 70 },
    label: { x: 40, y: 66, text: 'GB3' },
    neighbors: [
      { pointCode: 'GB2', x: 57, y: 86 },
      { pointCode: 'GB4', x: 40, y: 47 },
    ],
    note: 'In front of the ear · directly above Xiaguan (ST7) · depression on the upper border of the zygomatic arch',
  },
  {
    pointCode: 'GB4',
    regionTemplate: 'head',
    marker: { x: 40, y: 47 },
    label: { x: 24, y: 42, text: 'GB4' },
    neighbors: [
      { pointCode: 'GB3', x: 56, y: 70 },
      { pointCode: 'GB5', x: 47, y: 56 },
    ],
    note: 'Above the temple hair · upper fourth of the arcuate line from Touwei (ST8) to Qubin (GB7)',
  },
  {
    pointCode: 'GB5',
    regionTemplate: 'head',
    marker: { x: 47, y: 56 },
    label: { x: 60, y: 50, text: 'GB5' },
    neighbors: [
      { pointCode: 'GB4', x: 40, y: 47 },
      { pointCode: 'GB6', x: 55, y: 65 },
    ],
    note: 'Above the temple hair · midpoint of the arcuate line from Touwei (ST8) to Qubin (GB7)',
  },
  {
    pointCode: 'GB6',
    regionTemplate: 'head',
    marker: { x: 55, y: 65 },
    label: { x: 68, y: 62, text: 'GB6' },
    neighbors: [
      { pointCode: 'GB5', x: 47, y: 56 },
      { pointCode: 'GB7', x: 62, y: 74 },
    ],
    note: 'Above the temple hair · lower fourth of the arcuate line from Touwei (ST8) to Qubin (GB7)',
  },
  {
    pointCode: 'GB7',
    regionTemplate: 'head',
    marker: { x: 62, y: 74 },
    label: { x: 74, y: 80, text: 'GB7' },
    neighbors: [
      { pointCode: 'GB6', x: 55, y: 65 },
      { pointCode: 'GB8', x: 67, y: 58 },
    ],
    note: 'Vertical line through the temple hairline in front of the ear × horizontal line level with the ear tip',
  },
  {
    pointCode: 'GB8',
    regionTemplate: 'head',
    marker: { x: 67, y: 58 },
    label: { x: 80, y: 54, text: 'GB8' },
    neighbors: [
      { pointCode: 'GB7', x: 62, y: 74 },
      { pointCode: 'GB9', x: 71, y: 52 },
    ],
    note: '1.5 cun directly above the tip of the ear within the hairline · directly above Jiaosun (TH20)',
  },
  {
    pointCode: 'GB9',
    regionTemplate: 'head',
    marker: { x: 71, y: 52 },
    label: { x: 82, y: 44, text: 'GB9' },
    neighbors: [
      { pointCode: 'GB8', x: 67, y: 58 },
      { pointCode: 'GB10', x: 70, y: 63 },
    ],
    note: '0.5 cun behind Shuaigu (GB8) · 2 cun above the posterior border of the ear root within the hairline',
  },
  {
    pointCode: 'GB10',
    regionTemplate: 'head',
    marker: { x: 70, y: 63 },
    label: { x: 82, y: 66, text: 'GB10' },
    neighbors: [
      { pointCode: 'GB9', x: 71, y: 52 },
      { pointCode: 'GB11', x: 69, y: 75 },
    ],
    note: 'Behind and above the mastoid process · upper-third junction of the arcuate line from Tianchong (GB9) to Wangu (GB12)',
  },
  {
    pointCode: 'GB11',
    regionTemplate: 'head',
    marker: { x: 69, y: 75 },
    label: { x: 80, y: 90, text: 'GB11' },
    neighbors: [
      { pointCode: 'GB10', x: 70, y: 63 },
      { pointCode: 'GB12', x: 68, y: 86 },
    ],
    note: 'Behind and above the mastoid process · lower-third junction of the GB9-to-GB12 arcuate line · 1 cun below Fubai (GB10)',
  },
  {
    pointCode: 'GB12',
    regionTemplate: 'head',
    marker: { x: 68, y: 86 },
    label: { x: 80, y: 100, text: 'GB12' },
    neighbors: [
      { pointCode: 'GB11', x: 69, y: 75 },
      { pointCode: 'GB20', x: 58, y: 94 },
    ],
    note: 'In the depression below and behind the mastoid process behind the ear',
  },
  {
    pointCode: 'GB13',
    regionTemplate: 'head',
    marker: { x: 34, y: 30 },
    label: { x: 18, y: 24, text: 'GB13' },
    neighbors: [{ pointCode: 'GB14', x: 33, y: 44 }],
    note: '0.5 cun above the anterior hairline · 3 cun lateral to Shenting (GV24) · above the outer corner of the eye',
  },
  {
    pointCode: 'GB14',
    regionTemplate: 'head',
    marker: { x: 33, y: 44 },
    label: { x: 16, y: 52, text: 'GB14' },
    neighbors: [
      { pointCode: 'GB13', x: 34, y: 30 },
      { pointCode: 'GB15', x: 33, y: 36 },
    ],
    note: 'Forehead · directly above the pupil · 1 cun above the eyebrow',
  },
  {
    pointCode: 'GB15',
    regionTemplate: 'head',
    marker: { x: 33, y: 36 },
    label: { x: 18, y: 34, text: 'GB15' },
    neighbors: [
      { pointCode: 'GB14', x: 33, y: 44 },
      { pointCode: 'GB16', x: 36, y: 28 },
    ],
    note: 'Directly above the pupil · 0.5 cun inside the anterior hairline · midway between Shenting (GV24) and Touwei (ST8)',
  },
  {
    pointCode: 'GB16',
    regionTemplate: 'head',
    marker: { x: 36, y: 28 },
    label: { x: 50, y: 24, text: 'GB16' },
    neighbors: [
      { pointCode: 'GB15', x: 33, y: 36 },
      { pointCode: 'GB17', x: 36, y: 20 },
    ],
    note: '1.5 cun above the anterior hairline · 2.25 cun lateral to the head midline',
  },
  {
    pointCode: 'GB17',
    regionTemplate: 'head',
    marker: { x: 36, y: 20 },
    label: { x: 22, y: 12, text: 'GB17' },
    neighbors: [
      { pointCode: 'GB16', x: 36, y: 28 },
      { pointCode: 'GB18', x: 36, y: 10 },
    ],
    note: '2.5 cun above the anterior hairline · 2.25 cun lateral to the head midline · 1 cun behind Muchuang (GB16)',
  },
  {
    pointCode: 'GB18',
    regionTemplate: 'head',
    marker: { x: 36, y: 10 },
    label: { x: 50, y: 6, text: 'GB18' },
    neighbors: [
      { pointCode: 'GB17', x: 36, y: 20 },
      { pointCode: 'GB19', x: 62, y: 26 },
    ],
    note: '4 cun above the anterior hairline · 2.25 cun lateral to the head midline',
  },
  {
    pointCode: 'GB19',
    regionTemplate: 'head',
    marker: { x: 62, y: 26 },
    label: { x: 76, y: 22, text: 'GB19' },
    neighbors: [
      { pointCode: 'GB18', x: 36, y: 10 },
      { pointCode: 'GB20', x: 58, y: 94 },
    ],
    note: 'Lateral to the upper border of the external occipital protuberance · 2.25 cun lateral to the midline · level with Naohu (GV17)',
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
    pointCode: 'GB21',
    regionTemplate: 'torso-prone',
    marker: { x: 59, y: 29 },
    label: { x: 72, y: 34, text: 'GB21' },
    // Boundary rule: GB21 sits on the shoulder (GV14-to-acromion midpoint),
    // outside the drawn trunk chains — no same-template neighbours exist,
    // and the dangling-neighbour guard permits an empty list for exactly
    // this case.
    neighbors: [],
    note: 'Shoulder · directly above the nipple line · midpoint of the line connecting Dazhui (GV14) and the acromion',
  },
  {
    pointCode: 'GB22',
    regionTemplate: 'torso-supine',
    marker: { x: 74, y: 48 },
    label: { x: 88, y: 44, text: 'GB22' },
    neighbors: [{ pointCode: 'GB23', x: 68, y: 48 }],
    note: 'Lateral chest · midaxillary line · 3 cun below the axilla · fourth intercostal space (arm raised)',
  },
  {
    pointCode: 'GB23',
    regionTemplate: 'torso-supine',
    marker: { x: 68, y: 48 },
    label: { x: 54, y: 44, text: 'GB23' },
    neighbors: [
      { pointCode: 'GB22', x: 74, y: 48 },
      { pointCode: 'GB24', x: 62, y: 63 },
    ],
    note: 'Lateral chest · 1 cun in front of Yuanye (GB22) · level with the nipple · fourth intercostal space',
  },
  {
    pointCode: 'GB24',
    regionTemplate: 'torso-supine',
    marker: { x: 62, y: 63 },
    label: { x: 46, y: 66, text: 'GB24' },
    neighbors: [
      { pointCode: 'GB23', x: 68, y: 48 },
      { pointCode: 'GB25', x: 76, y: 70 },
    ],
    note: 'Upper abdomen · directly below the nipple · seventh intercostal space · 4 cun lateral to the anterior midline',
  },
  {
    pointCode: 'GB25',
    regionTemplate: 'torso-supine',
    marker: { x: 76, y: 70 },
    label: { x: 88, y: 72, text: 'GB25' },
    neighbors: [
      { pointCode: 'GB24', x: 62, y: 63 },
      { pointCode: 'GB26', x: 78, y: 78 },
    ],
    note: 'Lateral waist · 1.8 cun behind Zhangmen (LR13) · below the free end of the twelfth rib',
  },
  {
    pointCode: 'GB26',
    regionTemplate: 'torso-supine',
    marker: { x: 78, y: 78 },
    label: { x: 88, y: 84, text: 'GB26' },
    neighbors: [
      { pointCode: 'GB25', x: 76, y: 70 },
      { pointCode: 'GB27', x: 76, y: 91 },
    ],
    note: 'Lateral abdomen · level with the umbilicus on the midaxillary line · below the free end of the eleventh rib',
  },
  {
    pointCode: 'GB27',
    regionTemplate: 'torso-supine',
    marker: { x: 76, y: 91 },
    label: { x: 60, y: 94, text: 'GB27' },
    neighbors: [
      { pointCode: 'GB26', x: 78, y: 78 },
      { pointCode: 'GB28', x: 74, y: 95 },
    ],
    note: 'Lateral abdomen · anterior to the anterior superior iliac spine · level with a point 3 cun below the umbilicus',
  },
  {
    pointCode: 'GB28',
    regionTemplate: 'torso-supine',
    marker: { x: 74, y: 95 },
    label: { x: 86, y: 102, text: 'GB28' },
    neighbors: [{ pointCode: 'GB27', x: 76, y: 91 }],
    note: 'Lateral abdomen · anteroinferior to the anterior superior iliac spine · 0.5 cun anteroinferior to Wushu (GB27)',
  },
  {
    pointCode: 'GB29',
    regionTemplate: 'leg',
    marker: { x: 58, y: 14 },
    label: { x: 70, y: 10, text: 'GB29' },
    neighbors: [{ pointCode: 'GB30', x: 52, y: 10 }],
    note: 'Hip · midpoint of the line from the anterior superior iliac spine to the prominence of the greater trochanter',
  },
  {
    pointCode: 'GB30',
    regionTemplate: 'leg',
    marker: { x: 52, y: 10 },
    label: { x: 36, y: 8, text: 'GB30' },
    neighbors: [
      { pointCode: 'GB29', x: 58, y: 14 },
      { pointCode: 'GB31', x: 56, y: 50 },
    ],
    note: 'Lateral buttock · junction of outer and middle thirds of the greater-trochanter-to-sacral-hiatus line (side lying, hip flexed)',
  },
  {
    pointCode: 'GB31',
    regionTemplate: 'leg',
    marker: { x: 56, y: 50 },
    label: { x: 40, y: 48, text: 'GB31' },
    neighbors: [
      { pointCode: 'GB30', x: 52, y: 10 },
      { pointCode: 'GB32', x: 55, y: 57 },
    ],
    note: 'Midline of the lateral thigh · 7 cun above the popliteal crease · where the fingertip touches standing upright',
  },
  {
    pointCode: 'GB32',
    regionTemplate: 'leg',
    marker: { x: 55, y: 57 },
    label: { x: 70, y: 54, text: 'GB32' },
    neighbors: [
      { pointCode: 'GB31', x: 56, y: 50 },
      { pointCode: 'GB33', x: 60, y: 72 },
    ],
    note: 'Lateral thigh · 2 cun below Fengshi (GB31) · 5 cun above the popliteal crease · between vastus lateralis and biceps femoris',
  },
  {
    pointCode: 'GB33',
    regionTemplate: 'leg',
    marker: { x: 60, y: 72 },
    label: { x: 74, y: 68, text: 'GB33' },
    neighbors: [
      { pointCode: 'GB32', x: 55, y: 57 },
      { pointCode: 'GB34', x: 58, y: 82 },
    ],
    note: 'Lateral knee · 3 cun above Yanglingquan (GB34) · depression above the lateral epicondyle of the femur',
  },
  {
    pointCode: 'GB34',
    regionTemplate: 'leg',
    marker: { x: 58, y: 82 },
    label: { x: 72, y: 86, text: 'GB34' },
    neighbors: [
      { pointCode: 'GB33', x: 60, y: 72 },
      { pointCode: 'GB35', x: 51, y: 97 },
    ],
    note: 'Lateral lower leg · depression anterior and inferior to the head of the fibula',
  },
  {
    pointCode: 'GB35',
    regionTemplate: 'leg',
    marker: { x: 51, y: 97 },
    label: { x: 36, y: 96, text: 'GB35' },
    neighbors: [
      { pointCode: 'GB34', x: 58, y: 82 },
      { pointCode: 'GB36', x: 56, y: 98 },
    ],
    note: 'Lateral lower leg · 7 cun above the tip of the lateral malleolus · posterior border of the fibula',
  },
  {
    pointCode: 'GB36',
    regionTemplate: 'leg',
    marker: { x: 56, y: 98 },
    label: { x: 68, y: 94, text: 'GB36' },
    neighbors: [
      { pointCode: 'GB35', x: 51, y: 97 },
      { pointCode: 'GB37', x: 56, y: 103 },
    ],
    note: 'Lateral lower leg · 7 cun above the tip of the lateral malleolus · anterior border of the fibula · level with Yangjiao (GB35)',
  },
  {
    pointCode: 'GB37',
    regionTemplate: 'leg',
    marker: { x: 56, y: 103 },
    label: { x: 42, y: 104, text: 'GB37' },
    neighbors: [
      { pointCode: 'GB36', x: 56, y: 98 },
      { pointCode: 'GB38', x: 57, y: 106 },
    ],
    note: 'Lateral lower leg · 5 cun above the tip of the lateral malleolus · anterior border of the fibula',
  },
  {
    pointCode: 'GB38',
    regionTemplate: 'leg',
    marker: { x: 57, y: 106 },
    label: { x: 70, y: 102, text: 'GB38' },
    neighbors: [
      { pointCode: 'GB37', x: 56, y: 103 },
      { pointCode: 'GB39', x: 58, y: 109 },
    ],
    note: 'Lateral lower leg · 4 cun above the tip of the lateral malleolus · slightly in front of the fibula border',
  },
  {
    pointCode: 'GB39',
    regionTemplate: 'leg',
    marker: { x: 58, y: 109 },
    label: { x: 44, y: 112, text: 'GB39' },
    neighbors: [{ pointCode: 'GB38', x: 57, y: 106 }],
    note: 'Lateral lower leg · 3 cun above the tip of the lateral malleolus · anterior border of the fibula',
  },
  {
    pointCode: 'GB40',
    regionTemplate: 'foot',
    marker: { x: 28, y: 64 },
    label: { x: 12, y: 60, text: 'GB40' },
    neighbors: [{ pointCode: 'GB41', x: 74, y: 74 }],
    note: 'Foot · anterior and inferior to the lateral malleolus · lateral to the extensor digitorum longus tendon',
  },
  {
    pointCode: 'GB41',
    regionTemplate: 'foot',
    marker: { x: 74, y: 74 },
    label: { x: 60, y: 64, text: 'GB41' },
    neighbors: [
      { pointCode: 'GB40', x: 28, y: 64 },
      { pointCode: 'GB42', x: 70, y: 76 },
    ],
    note: 'Lateral dorsum of the foot · posterior to the fourth metatarsophalangeal joint · lateral to the extensor digiti minimi tendon',
  },
  {
    pointCode: 'GB42',
    regionTemplate: 'foot',
    marker: { x: 70, y: 76 },
    label: { x: 56, y: 80, text: 'GB42' },
    neighbors: [
      { pointCode: 'GB41', x: 74, y: 74 },
      { pointCode: 'GB43', x: 84, y: 78 },
    ],
    note: 'Lateral dorsum of the foot · between the fourth and fifth metatarsals · medial border of the extensor digiti minimi tendon',
  },
  {
    pointCode: 'GB43',
    regionTemplate: 'foot',
    marker: { x: 84, y: 78 },
    label: { x: 72, y: 90, text: 'GB43' },
    neighbors: [
      { pointCode: 'GB42', x: 70, y: 76 },
      { pointCode: 'GB44', x: 90, y: 82 },
    ],
    note: 'Between the fourth and fifth toes · red-and-white skin junction posterior to the toe web margin',
  },
  {
    pointCode: 'GB44',
    regionTemplate: 'foot',
    marker: { x: 90, y: 82 },
    label: { x: 94, y: 92, text: 'GB44' },
    neighbors: [{ pointCode: 'GB43', x: 84, y: 78 }],
    note: 'Fourth toe · lateral side of the distal segment · 0.1 cun from the corner of the toenail',
  },
];
