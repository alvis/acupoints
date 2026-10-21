import type { Condition } from './schemas';

export const conditions: Condition[] = [
  {
    slug: 'tension-headache',
    name: 'Tension headache',
    canonicalOneLiner:
      'Tension headache is a dull, band-like pain across the forehead or base of the skull; classical acupressure points include LI4, GB20, and LV3.',
    pickerPoints: ['LI4', 'GB20', 'GV20', 'EX-HN5'],
  },
  {
    slug: 'anxiety',
    name: 'Anxiety',
    canonicalOneLiner:
      'For mild anxiety, classical acupressure reaches for points like HT7, PC6, and Yintang — typically alongside slow breathing.',
  },
  {
    slug: 'travel-nausea',
    name: 'Travel nausea',
    canonicalOneLiner:
      'PC6 (Neiguan) on the inner forearm is the classical acupoint for travel and morning nausea and the point behind motion-sickness wristbands.',
    pickerPoints: ['PC6', 'ST36', 'SP6'],
  },
  {
    slug: 'insomnia',
    name: 'Insomnia',
    canonicalOneLiner:
      'For sleep, classical acupressure pairs a calming point at the wrist, HT7, with a grounding point on the sole, KI1.',
  },
  {
    slug: 'period-pain',
    name: 'Period pain',
    canonicalOneLiner:
      'For period pain, TCM most often draws on SP6, LV3, and local abdominal points — though some (like SP6) are avoided during pregnancy.',
  },
  {
    slug: 'back-pain',
    name: 'Back pain',
    canonicalOneLiner:
      'Classical acupressure for lower back pain often combines BL23, BL40, and GB30, chosen by where the pain is located.',
  },
  {
    slug: 'desk-neck-shoulder',
    name: 'Neck and shoulder strain from desk work',
    canonicalOneLiner:
      'Neck and shoulder strain from desk work eases first with breaks every hour or two, forearm support and neck exercise; classical acupressure adds GB20, GB21 and LI11 as an optional comfort pause, on limited evidence.',
    pickerPoints: ['GB20', 'GB21', 'LI11'],
  },
  {
    slug: 'nausea-after-treatment',
    name: 'Nausea after surgery or chemotherapy',
    canonicalOneLiner:
      'For nausea after surgery or chemotherapy, classical acupressure reaches first for PC6 (Neiguan) on the inner wrist, with LI4 and ST36 as companions — always as an add-on to prescribed anti-sickness medicine, never a replacement.',
    pickerPoints: ['PC6', 'LI4', 'ST36'],
  },
  {
    slug: 'bloating',
    name: 'Bloating',
    canonicalOneLiner:
      'For a bloated, distended belly, Chinese nursing care pairs clockwise belly massage with CV12, ST25 and CV6 on the abdomen and ST36 and PC6 on the leg and wrist; skip CV6 in pregnancy.',
    pickerPoints: ['CV12', 'ST25', 'CV6', 'ST36', 'PC6'],
  },
  {
    slug: 'constipation',
    name: 'Constipation',
    canonicalOneLiner:
      'For ordinary constipation, habits come first; classical acupressure adds a clockwise belly massage and the points ST25, TH6, ST36, and ST37.',
    pickerPoints: ['ST25', 'TH6', 'ST36', 'ST37'],
  },
  {
    slug: 'knee-arthritis',
    name: 'Knee arthritis pain',
    canonicalOneLiner:
      'For knee osteoarthritis pain, exercise and weight management come first; classical acupressure adds six points ringing the knee: SP10, ST34, ST35, SP9, GB34 and ST36.',
    pickerPoints: ['SP10', 'ST34', 'ST35', 'SP9', 'GB34', 'ST36'],
  },
  {
    slug: 'after-stroke-limbs',
    name: 'After a stroke',
    canonicalOneLiner:
      'After a stroke, a national Chinese nursing protocol names GB21, LI11, TH5 and LI4 on the arm and GB34, BL40 and GB39 on the leg; a carer presses them lightly on the weak side, alongside rehabilitation, never on spastic muscle or a swollen limb.',
    pickerPoints: ['GB21', 'LI11', 'TH5', 'LI4', 'GB34', 'BL40', 'GB39'],
  },
  {
    slug: 'fatigue',
    name: 'Fatigue',
    canonicalOneLiner:
      'For everyday tiredness of the depleted kind, Chinese medicine reaches for ST36 (Zusanli), SP6, CV6 and CV4 below the navel, and LI4; research on hand-pressed points comes mainly from fatigue after cancer treatment and in haemodialysis.',
    pickerPoints: ['ST36', 'SP6', 'CV6', 'CV4', 'LI4'],
  },
  {
    slug: 'labour-pain',
    name: 'Labour pain',
    canonicalOneLiner:
      "Sanyinjiao (SP6) and hegu (LI4), pressed by a birth partner through contractions, only once labour has started at 37 weeks or later and only with the midwife's or obstetric team's agreement; never to start labour or before term.",
    pickerPoints: ['SP6', 'LI4'],
  },
];

export const topConditionSlugs = [
  'tension-headache',
  'anxiety',
  'travel-nausea',
  'insomnia',
  'period-pain',
  'back-pain',
] as const;

/**
 * find a condition entry by its route key.
 * @param slug route identifier.
 * @returns the condition with that slug, or undefined.
 */
export function conditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
