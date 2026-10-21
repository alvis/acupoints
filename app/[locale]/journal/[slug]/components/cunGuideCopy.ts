import type { CunGuide } from './cunGuide';

export const EN: CunGuide = {
  heroHan: '同身寸',
  quote: 'You already own one.',
  figureTag: '同身寸圖',
  options: [
    {
      key: 'm1',
      han: '一寸',
      unit: '1 cun',
      sub: 'thumb width',
      title: '一寸 · One cun',
      how: 'The width of your own thumb at its knuckle. The two side creases of your bent middle finger give about the same.',
      use: 'A portable single-unit gauge.',
      label: 'Carved hand showing one cun: a cinnabar bracket across the thumb at its knuckle',
    },
    {
      key: 'm15',
      han: '一寸半',
      unit: '1.5 cun',
      sub: 'two fingers',
      title: '一寸半 · One and a half cun',
      how: 'Index and middle fingers held together, edge to edge.',
      use: 'Three fingers make two cun: the Neiguan span.',
      label:
        'Carved hand showing one and a half cun: a cinnabar bracket across the index and middle fingers',
    },
    {
      key: 'm3',
      han: '三寸',
      unit: '3 cun',
      sub: 'four fingers',
      title: '三寸 · Three cun',
      how: 'Four fingers held snugly together, sighted across the middle knuckles. Old texts call this span a fu.',
      use: 'The most useful wide gauge at home: Zusanli, below.',
      label: 'Carved hand showing three cun: a cinnabar bracket across four fingers held together',
    },
  ],
  sides: {
    'how-long-is-a-cun': { kind: 'glossary', han: '寸', text: 'Cun, in the glossary →' },
    'why-your-body-is-the-ruler': { kind: 'term', han: '同身寸', text: 'the same-body inch' },
    'the-finger-measures': {
      kind: 'table',
      table: {
        caption: '指寸 · Finger measures',
        spanHeader: 'Span',
        cunHeader: 'Cun',
        rows: [
          { span: 'Thumb, at the knuckle', cun: '1' },
          { span: 'Two fingers: index and middle', cun: '1½' },
          { span: 'Three fingers', cun: '2' },
          { span: 'Four fingers, snug: a fu', cun: '3' },
        ],
      },
    },
    'landmark-tables': {
      kind: 'table',
      table: {
        caption: '骨度分寸 · Bone-length counts',
        spanHeader: 'Span',
        cunHeader: 'Cun',
        rows: [
          { span: 'Elbow crease → wrist crease', cun: '12' },
          { span: 'Armpit fold → elbow crease', cun: '9' },
          { span: 'Breastbone notch → navel', cun: '8' },
          { span: 'Navel → top of pubic bone', cun: '5' },
          { span: 'Nipple to nipple', cun: '8' },
          { span: 'Back of knee → outer ankle tip', cun: '16' },
        ],
      },
    },
    'when-not-to-measure': {
      kind: 'note',
      text: 'Hegu is traditionally avoided during pregnancy.',
      note: ['LI4: not in', 'pregnancy'],
    },
    'honest-measuring': {
      kind: 'note',
      text: 'Finger measures carry an honest slop of half a finger-width or so. Finish by feel: a dull, spreading response.',
    },
  },
  example: {
    cap: '例 · Worked example',
    han: '足三里',
    title: 'Zusanli, ST36',
    lede: 'Three cun below the knee: four finger-widths, measured with your own hand.',
    steps: [
      {
        text: 'Sit easy. Find the small hollow just below the kneecap, toward its outer side: the old “eye of the knee”.',
        han: '膝眼',
      },
      {
        text: 'Set the four fingers of the other hand snugly beneath it, aligned and pointing straight down the shin.',
        han: '一夫',
      },
      {
        text: 'Three cun below the knee-eye, feel in the muscle just outside the shinbone.',
        han: '三寸',
      },
      {
        text: 'Flex the foot: the muscle there firms up under your touch. That is Zusanli.',
        han: '足三里',
      },
    ],
    minutes: 'One to two minutes, breathing slowly.',
    legLabel:
      'Left leg from the front, outer side to the right. Four fingers lie stacked below the outer hollow under the kneecap; a red dot marks Zusanli, ST36, just outside the shinbone below the fourth finger',
    legCaption: 'Left leg, front view. Outer side to the right.',
  },
  tryIt: {
    han: '試',
    title: 'Try it: Neiguan, PC6',
    steps: [
      'Rest one forearm palm-up on a table and find the wrist crease nearest the palm.',
      'Lay the three centre fingers of the other hand against it, edges touching. That span is two cun.',
      'Beneath the far edge of the ring finger, press gently between the two central tendons.',
    ],
    note: 'A dull, spreading heaviness means you are near. Ease away if it turns sharp.',
  },
};

export const ZH: CunGuide = {
  heroHan: '同身寸',
  quote: '其實尺子就長在你身上。',
  figureTag: '同身寸圖',
  options: [
    {
      key: 'm1',
      han: '一寸',
      unit: '1 寸',
      sub: '拇指寬',
      title: '一寸',
      how: '本人拇指指節的寬度。屈起中指，指側兩條橫紋之間，同樣約合一寸。',
      use: '一支隨身攜帶的單寸小尺。',
      label: '刻版手圖：朱砂括線橫過拇指指節，示一寸',
    },
    {
      key: 'm15',
      han: '一寸半',
      unit: '1.5 寸',
      sub: '兩指',
      title: '一寸半',
      how: '食指與中指併攏，邊貼著邊。',
      use: '三指併攏約合二寸：內關的跨度。',
      label: '刻版手圖：朱砂括線橫過併攏的食指與中指，示一寸半',
    },
    {
      key: 'm3',
      han: '三寸',
      unit: '3 寸',
      sub: '四指',
      title: '三寸 · 一夫',
      how: '四指併攏，從中節橫量。古籍喚作“一夫”。',
      use: '居家取穴最稱手的一把大尺：見下方足三里。',
      label: '刻版手圖：朱砂括線橫過併攏的四指，示三寸',
    },
  ],
  sides: {
    'how-long-is-a-cun': { kind: 'glossary', han: '寸', text: '術語表：寸 →' },
    'why-your-body-is-the-ruler': { kind: 'term', han: '同身寸', text: '以同一個人的身體為度' },
    'the-finger-measures': {
      kind: 'table',
      table: {
        caption: '指寸',
        spanHeader: '跨度',
        cunHeader: '寸',
        rows: [
          { span: '拇指指節', cun: '1' },
          { span: '兩指：食指與中指', cun: '1½' },
          { span: '三指', cun: '2' },
          { span: '四指併攏：一夫', cun: '3' },
        ],
      },
    },
    'landmark-tables': {
      kind: 'table',
      table: {
        caption: '骨度分寸',
        spanHeader: '跨度',
        cunHeader: '寸',
        rows: [
          { span: '肘橫紋 → 腕橫紋', cun: '12' },
          { span: '腋前皺襞 → 肘橫紋', cun: '9' },
          { span: '胸骨下端凹陷 → 肚臍', cun: '8' },
          { span: '肚臍 → 恥骨聯合上緣', cun: '5' },
          { span: '兩乳之間', cun: '8' },
          { span: '膝後橫紋 → 外踝尖', cun: '16' },
        ],
      },
    },
    'when-not-to-measure': {
      kind: 'note',
      text: '合谷孕期傳統上避開使用。',
      note: ['LI4：', '孕期不宜'],
    },
    'honest-measuring': {
      kind: 'note',
      text: '手指量法自帶半指上下的誤差。用手感收尾：尋那種鈍鈍的、緩緩擴散的回應。',
    },
  },
  example: {
    cap: '例 · 實測',
    han: '足三里',
    title: '足三里（ST36）',
    lede: '膝下三寸：四橫指，用你自己的手來量。',
    steps: [
      { text: '坐姿放鬆。找到膝蓋骨下方偏外的小凹窩——古人叫它膝眼。', han: '膝眼' },
      { text: '另一隻手四指併攏，齊整地抵在膝眼正下方，筆直順小腿而下。', han: '一夫' },
      { text: '三寸之處，在脛骨外側的肌肉裡探尋。', han: '三寸' },
      { text: '腳踝一勾，那裡的肌肉應聲繃緊——這就是足三里。', han: '足三里' },
    ],
    minutes: '停留一兩分鐘，呼吸放慢即可。',
    legLabel:
      '左腿正面，外側在右。四指疊放在膝蓋骨下方外側的凹窩之下；紅點標出足三里（ST36），在第四指下方、脛骨外側',
    legCaption: '左腿正面，外側在右。',
  },
  tryIt: {
    han: '試',
    title: '試一試：內關（PC6）',
    steps: [
      '一側前臂掌心向上擱在桌沿，找到靠近手掌的那條腕橫紋。',
      '另一隻手的食、中、無名三指併攏貼上去，邊緣相接——這段跨度是二寸。',
      '在無名指遠緣之下、兩條筋腱之間，輕輕按下。',
    ],
    note: '出現鈍鈍的、向外漫開的沉墜，便離得不遠了；若變得尖銳，立刻撤力。',
  },
};
