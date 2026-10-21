import { z } from 'zod';

/** question and answer length limits. */
const VALIDATION_LIMITS = {
  QUESTION_MIN: 3,
  ANSWER_MIN: 3,
  FOLLOW_THROUGH_MIN: 3,
} as const;

/** The board's question groups (WbFaq rail), in rail order. */
export const FAQ_GROUPS = ['words', 'pressing', 'safety'] as const;

/** One FAQ group key. */
export type FaqGroup = (typeof FAQ_GROUPS)[number];

/** Question text in Traditional Chinese; zh-cn derives its Simplified form. */
const faqZhSchema = z.object({
  question: z.string().min(2),
  /** May contain the same trusted inline links as the English answer. */
  answer: z.string().min(2),
  followThrough: z.string().min(2).optional(),
});

/** Sitewide FAQ item. Shape is intentionally close to ConditionOpener. */
export const faqItemSchema = z.object({
  /** Rail group the question is filed under. */
  group: z.enum(FAQ_GROUPS),
  /** The reader's question, phrased verbatim. */
  question: z.string().min(VALIDATION_LIMITS.QUESTION_MIN),
  /** A one-to-two sentence direct answer. May contain trusted inline HTML. */
  answer: z.string().min(VALIDATION_LIMITS.ANSWER_MIN),
  /** Optional longer follow-through paragraph. May contain trusted HTML. */
  followThrough: z.string().min(VALIDATION_LIMITS.FOLLOW_THROUGH_MIN).optional(),
  /** The same entry, authored in Traditional Chinese. */
  zh: faqZhSchema,
  /** The page that carries the answer further, an unprefixed site path. */
  more: z.object({
    href: z.string().startsWith('/'),
    label: z.object({ en: z.string().min(2), zh: z.string().min(2) }),
  }),
});

export type FaqItem = z.infer<typeof faqItemSchema>;

/**
 * Curated sitewide FAQs surfaced at /faq. Each answer is deliberately
 * cautious: Acupoints does not make clinical claims, and links point
 * only to pages that exist in this codebase.
 */
export const faqs: FaqItem[] = [
  {
    group: 'words',
    question: 'Is acupressure the same as acupuncture?',
    answer:
      'No — they share the same map of points and meridians, but acupressure uses steady finger pressure where acupuncture uses very fine needles inserted by a trained practitioner.',
    followThrough:
      'Both traditions target the same classical acupoints, so the locations and names overlap. Only acupuncture, though, is a regulated clinical practice in most countries; acupressure is a self-care technique anyone can learn.',
    zh: {
      question: '指壓和針灸是同一回事嗎？',
      answer:
        '不是。兩者共用同一套穴位與經絡圖，但指壓用的是手指持續的按壓，針灸則由受過訓練的醫師以極細的針施行。',
      followThrough:
        '兩種傳統針對的是同一批古典穴位，所以位置與名稱彼此重疊。不過在多數國家，只有針灸屬於受規管的臨床執業；指壓則是人人都學得會的自我照護方法。',
    },
    more: {
      href: '/journal/pressure-not-needles',
      label: { en: 'Pressure, not needles', zh: '按壓，不用針' },
    },
  },
  {
    group: 'pressing',
    question: 'Can I press these points on myself?',
    answer:
      'Yes, most of them — classical self-care manuals assume you are working on your own body. Use your thumb or a knuckle, press for about a minute, and stop if anything feels sharp.',
    followThrough:
      'A small number of points (for example along the lower abdomen and sacrum in pregnancy) are classically contraindicated. Every point page on Acupoints carries a safety note when one applies.',
    zh: {
      question: '我可以在自己身上按這些穴位嗎？',
      answer:
        '大多數都可以——古典的自我照護手冊本就假定你按的是自己的身體。用拇指或指節按約一分鐘；一有尖銳的感覺就停下。',
      followThrough:
        '少數穴位在古典上屬於禁忌（例如孕期時下腹部與骶部一帶的穴位）。凡有適用的注意事項，Acupoints 的穴位頁都會附上安全提示。',
    },
    more: {
      href: '/journal/getting-started-with-acupressure',
      label: { en: 'Getting started with acupressure', zh: '指壓入門' },
    },
  },
  {
    group: 'words',
    question: 'What does "qi" mean?',
    answer:
      "Qi (氣) is the TCM name for the body's capacity for coordinated movement and change — breath, circulation, digestion, warmth — not a mystical energy.",
    followThrough:
      'For a fuller definition in plain English, see the <a href="/basics/what-is-qi">What is qi?</a> basic and the <a href="/glossary">glossary</a>.',
    zh: {
      question: '「氣」是甚麼意思？',
      answer:
        '氣是中醫對身體協調運動與變化之能力的稱呼——呼吸、循環、消化、溫煦都在其中——並不是某種神秘的能量。',
      followThrough:
        '想看更完整的平實解釋，請讀基礎篇<a href="/basics/what-is-qi">〈氣是甚麼？〉</a>與<a href="/glossary">詞彙</a>。',
    },
    more: { href: '/basics/what-is-qi', label: { en: 'What is qi?', zh: '氣是甚麼？' } },
  },
  {
    group: 'pressing',
    question: 'How long should I hold a point?',
    answer:
      'Around 30 to 60 seconds of steady pressure is a good default. You can repeat two or three times with a short break between.',
    followThrough:
      'If you are working on a tight muscle, longer holds of up to two minutes are fine. If a point feels sensitive, shorten the hold rather than pressing harder.',
    zh: {
      question: '一個穴位該按多久？',
      answer: '持續按壓約 30 至 60 秒，是不錯的預設。可以重複兩三次，中間稍作休息。',
      followThrough:
        '若按的是緊繃的肌肉，延長到兩分鐘也無妨。若某個穴位感覺敏感，寧可縮短時間，也不要加重力度。',
    },
    more: {
      href: '/journal/getting-started-with-acupressure',
      label: { en: 'Getting started with acupressure', zh: '指壓入門' },
    },
  },
  {
    group: 'pressing',
    question: 'How hard should I press?',
    answer:
      'Firm enough to feel a dull, heavy sensation — the classical <a href="/glossary/de-qi">de qi</a> — but never so hard that it hurts sharply.',
    followThrough:
      'Sharp pain usually means you are on tissue next to the point, not the point itself. Ease off, shift a few millimetres, and look again for the steady, spreading sensation.',
    zh: {
      question: '力度該多大？',
      answer:
        '按到能感覺到一種鈍而沉的感覺——即古典所說的<a href="/glossary/de-qi">得氣</a>——但絕不要按到尖銳地痛。',
      followThrough:
        '尖銳的痛通常表示你按在穴位旁邊的組織上，而不是穴位本身。放鬆力度，挪動幾毫米，再找那種穩定、擴散的感覺。',
    },
    more: { href: '/glossary/de-qi', label: { en: 'De qi, in the glossary', zh: '詞彙：得氣' } },
  },
  {
    group: 'safety',
    question: 'Are there points I should avoid?',
    answer:
      'A few classical points are contraindicated during pregnancy (notably LI4 and SP6), and you should avoid pressing directly on broken skin, burns, or recent surgical sites.',
    followThrough:
      'When a point has a specific caution — pregnancy, pacemaker, anticoagulant medication — the point page on Acupoints carries a safety note at the top.',
    zh: {
      question: '有哪些穴位應該避開？',
      answer:
        '少數古典穴位在孕期屬於禁忌（尤其是 LI4 與 SP6）；此外，也應避免直接按壓破損的皮膚、燒燙傷或近期動過手術的部位。',
      followThrough:
        '凡穴位有特定的注意事項——孕期、心臟起搏器、抗凝血藥物——Acupoints 的穴位頁都會在頂部附上安全提示。',
    },
    more: { href: '/disclaimer', label: { en: 'Medical disclaimer', zh: '醫療免責聲明' } },
  },
  {
    group: 'safety',
    question: 'Can acupressure replace medical treatment?',
    answer:
      'No. Acupressure is a complementary self-care practice, not a substitute for medical care. Anything persistent, severe, or unexplained should be seen by a qualified clinician.',
    followThrough:
      'Acupoints publishes reference material and traditional uses. We do not diagnose or treat conditions, and we do not recommend acupressure in place of prescribed treatment.',
    zh: {
      question: '指壓能取代醫療嗎？',
      answer:
        '不能。指壓是一種輔助性的自我照護，不能替代醫療。任何持續、嚴重或原因不明的狀況，都應交由合格的臨床醫師診察。',
      followThrough:
        'Acupoints 發佈的是參考資料與傳統用法。我們不診斷、不治療任何病症，也不建議以指壓代替醫師開立的治療。',
    },
    more: { href: '/disclaimer', label: { en: 'Medical disclaimer', zh: '醫療免責聲明' } },
  },
  {
    group: 'words',
    question: 'What is "de qi"?',
    answer:
      '<a href="/glossary/de-qi">De qi</a> is the dull, heavy, or radiating sensation that signals a classical acupoint has been correctly located — the cue you are looking for in self-acupressure.',
    zh: {
      question: '「得氣」是甚麼？',
      answer:
        '<a href="/glossary/de-qi">得氣</a>是一種鈍、沉或向外放射的感覺，表示一個古典穴位已經找準——這正是自我指壓時要留意的訊號。',
    },
    more: {
      href: '/journal/what-de-qi-feels-like',
      label: { en: 'What de qi feels like', zh: '得氣是甚麼感覺' },
    },
  },
  {
    group: 'pressing',
    question: 'How do I find a point without a practitioner?',
    answer:
      'Use the point page\'s "how to find" steps and body-proportional <a href="/glossary/cun">cun</a> measurements, then press gently and watch for a steady, spreading sensation rather than a sharp one.',
    followThrough:
      'A good rule of thumb: if you have drifted a few millimetres off, you will feel tissue or bone. When you land on the point, the sensation changes in character, not just intensity.',
    zh: {
      question: '沒有醫師在旁，怎樣自己找穴？',
      answer:
        '依照穴位頁「如何找穴」的步驟，配合按身體比例計算的<a href="/glossary/cun">寸</a>來量，然後輕輕按下，留意穩定、擴散的感覺，而不是尖銳的感覺。',
      followThrough:
        '一個實用的經驗法則：偏離了幾毫米時，你摸到的是一般的組織或骨頭；一旦落在穴位上，感覺會在性質上起變化，而不只是強弱不同。',
    },
    more: {
      href: '/journal/measuring-with-cun',
      label: { en: 'Measuring with your own hands', zh: '用自己的手量寸' },
    },
  },
  {
    group: 'safety',
    question: 'Does acupressure work?',
    answer:
      'Some people find acupressure helpful for relaxation, tension, and nausea. The research evidence is mixed, and acupressure is considered complementary — not a replacement for medical care.',
    followThrough:
      'If you have a condition that concerns you, see a licensed practitioner or your doctor. Acupoints publishes traditional uses and WHO coordinates; we do not make clinical claims.',
    zh: {
      question: '指壓有效嗎？',
      answer:
        '有些人覺得指壓有助於放鬆、舒緩緊繃與噁心。研究證據並不一致，指壓也被視為輔助手段——不能取代醫療。',
      followThrough:
        '如果你有令你擔心的狀況，請找持證的醫師或你的醫生。Acupoints 發佈的是傳統用法與世界衛生組織的穴位定位；我們不作臨床聲稱。',
    },
    more: { href: '/about', label: { en: 'How we check a leaf', zh: '一葉如何核對' } },
  },
];
