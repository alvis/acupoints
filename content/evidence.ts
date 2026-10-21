import { z } from 'zod';

import { findBannedMatches } from './editorial/policy';

/**
 * What each condition's advice rests on, in two groups the condition page
 * shows side by side: the Chinese-medicine authority that names the points
 * (a guideline, an expert consensus, a national nursing protocol or the
 * national textbook) and the clinical research that weighed them (Cochrane
 * and other systematic reviews, guidelines, trials). Each line reports what
 * a source found or recommends, and what it applied (hand pressure, needles,
 * massage or ear seeds), without grading how certain the finding is.
 *
 * Every entry was checked against the opened source. Findings paraphrase
 * the source in plain words; they are screened through the editorial policy
 * at module load, so a percentage, an efficacy absolute or a study-claim
 * phrase fails the build instead of shipping.
 */

/**
 * Screens one authored line through the editorial policy.
 * @param max the maximum permitted line length in characters.
 * @returns the bounded string schema that rejects banned editorial language.
 */
const line = (max: number): z.ZodString =>
  z
    .string()
    .min(2)
    .max(max)
    .refine((value) => findBannedMatches(value).length === 0, {
      message: 'Line uses language the editorial policy bans.',
    });

/**
 * One line in both authored scripts; `zh` is Traditional Chinese.
 * @param max the maximum permitted line length in characters.
 * @returns the English and traditional Chinese line schemas.
 */
const bilingual = (max: number): z.ZodObject<{ en: z.ZodString; zh: z.ZodString }> =>
  z.object({ en: line(max), zh: line(max) });

const POINT_CODE = /^(?:[A-Z]{2}\d{1,2}|EX-[A-Z]{1,2}\d{1,2})$/u;

/** One cited source, reachable by DOI or by a stable URL. */
const sourceSchema = z
  .object({
    /** What kind of source this is. */
    kind: z.enum([
      'guideline',
      'consensus',
      'nursing-protocol',
      'textbook',
      'cochrane',
      'systematic-review',
      'rct',
    ]),
    /** Issuing body or first author, e.g. "中華中醫藥學會" or "Lee A et al.". */
    by: bilingual(120),
    /** Title, or journal and volume for a trial. */
    title: bilingual(200),
    year: z.number().int().min(1950).max(2100),
    /** DOI without the resolver prefix, e.g. `10.1002/14651858.CD003281.pub5`. */
    doi: z
      .string()
      .regex(/^10\.\d{4,9}\/\S+$/u)
      .optional(),
    /** A stable https URL, for sources with no DOI. */
    url: z.url({ protocol: /^https$/u }).optional(),
    /** Standard number or other identifier, e.g. `T/CAAM 006-2015`. */
    ref: z.string().min(2).max(60).optional(),
    /** The points the source names for this condition, in its order. */
    points: z.array(z.string().regex(POINT_CODE)).max(12).optional(),
    /** What the source found or recommends, paraphrased. */
    finding: bilingual(320),
  })
  .refine((source) => source.doi ?? source.url, {
    message: 'A source needs a doi or a url so readers can open it.',
  });

const evidenceSchema = z.object({
  /** The condition this evidence belongs to. */
  slug: z.string().min(2),
  /** One-line summary of what the sources found, above the two groups. */
  summary: bilingual(260),
  /** The Chinese-medicine authorities that name the points. */
  chinese: z.array(sourceSchema).min(1).max(4),
  /** The clinical research that weighed them. */
  research: z.array(sourceSchema).min(1).max(5),
});

/** One cited source. */
export type EvidenceSource = z.infer<typeof sourceSchema>;
/** What one condition's advice rests on. */
export type ConditionEvidence = z.infer<typeof evidenceSchema>;

const EVIDENCE: ReadonlyArray<z.input<typeof evidenceSchema>> = [
  {
    slug: 'tension-headache',
    summary: {
      en: 'Chinese nursing protocols and textbooks name these points for headache. A review of twelve needling trials found more people had their headache days at least halved than with routine care, and a smaller difference against sham needling.',
      zh: '中醫護理方案與教材都為頭痛列出這些穴位。一篇納入十二項施針試驗的綜述發現，與常規照護相比，頭痛日數至少減半的人較多；與假針灸相比，差異較小。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'Chinese-medicine nursing protocols for 13 conditions including stroke (2026 edition)',
          zh: '中風等13個病種中醫護理方案（2026年版）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['EX-HN5', 'GB20', 'GV20'],
        finding: {
          en: 'For headache in its hypertension section, the protocol lists nurse-given point massage at Taiyang, Yintang, Fengchi and Baihui. Its neck section names Fengchi, Baihui and Taiyang for dizziness. Hegu is not named for headache.',
          zh: '方案在高血壓一節的頭痛項下，列出由護士施行的經穴推拿，可選太陽、印堂、風池、百會；頸椎病一節亦以風池、百會、太陽處理眩暈。合谷未列於頭痛項下。',
        },
      },
      {
        kind: 'textbook',
        by: {
          en: 'Liu Guanjun (ed.), Guangming Chinese Medicine Correspondence University',
          zh: '光明中醫函授大學（劉冠軍主編）',
        },
        title: {
          en: 'Acupuncture and Moxibustion, correspondence textbook, volume 2: Headache',
          zh: '《針灸學》下冊・頭痛',
        },
        year: 1988,
        url: 'https://www.gmzyjx.com/books/zjx/zjx-zjx2.1.4-0.0.1.0.0/',
        points: ['GB20', 'LI4', 'GV20', 'EX-HN5'],
        finding: {
          en: 'For wind-damp headache it needles Fengchi and Hegu among its main points, adding Baihui for pain at the crown and Taiyang for pain at the side. It frames chronic headache through wind-damp, rising liver yang, phlegm, blood deficiency and stasis.',
          zh: '風濕頭痛以風池、合谷等為主穴施針，頭頂痛加百會，側頭痛加太陽。教材把慢性頭痛分為風濕、肝陽、痰濁、血虛、瘀血諸型。',
        },
      },
    ],
    research: [
      {
        kind: 'cochrane',
        by: { en: 'Linde K et al.', zh: 'Linde K 等' },
        title: {
          en: 'Acupuncture for the prevention of tension-type headache',
          zh: '針灸預防緊張型頭痛',
        },
        year: 2016,
        doi: '10.1002/14651858.CD007587.pub2',
        finding: {
          en: 'Twelve trials, all of needling. More people had their headache days at least halved with needling than with routine care, and the difference against sham needling was smaller.',
          zh: '納入十二項試驗，全部以針治療。與常規照護相比，接受針灸者中頭痛日數至少減半的人較多；與假針灸相比，差異較小。',
        },
      },
    ],
  },
  {
    slug: 'anxiety',
    summary: {
      en: 'Chinese guidelines name Neiguan and Shenmen among the points for needling in anxiety. Reviews of finger-pressure trials found anxiety eased in the short term before surgery or procedures, mostly at Yintang and Shenmen.',
      zh: '中醫指南把內關與神門列為針灸治療焦慮的穴位。指壓試驗的綜述發現，手術或檢查前的焦慮可在短時間內舒緩，所用穴位以印堂與神門居多。',
    },
    chinese: [
      {
        kind: 'guideline',
        by: {
          en: 'Chinese Association of Integrative Medicine, China Association of Chinese Medicine and Chinese Medical Association',
          zh: '中國中西醫結合學會、中華中醫藥學會、中華醫學會',
        },
        title: {
          en: 'Guideline for the diagnosis and treatment of generalized anxiety disorder with integrated traditional Chinese and Western medicine',
          zh: '廣泛性焦慮障礙中西醫結合診療指南',
        },
        year: 2023,
        url: 'https://shangia.oss-cn-beijing.aliyuncs.com/p/cacm/uploads/2023/06/%E5%B9%BF%E6%B3%9B%E6%80%A7%E7%84%A6%E8%99%91%E9%9A%9C%E7%A2%8D%E4%B8%AD%E8%A5%BF%E5%8C%BB%E7%BB%93%E5%90%88%E8%AF%8A%E7%96%97%E6%8C%87%E5%8D%97.pdf',
        points: ['HT7', 'PC6'],
        finding: {
          en: 'Its eleventh recommendation lists Baihui, Shenmen, Neiguan, Sanyinjiao, Yintang and others as the usual points for needling in generalised anxiety. In the data-mining study it cites, Shenmen, Baihui and Neiguan were the most strongly linked trio.',
          zh: '指南第十一條建議列出百會、神門、內關、三陰交、印堂等為針灸治療廣泛性焦慮的常規穴位；其所引數據挖掘研究中，神門、百會、內關的關聯最強。',
        },
      },
      {
        kind: 'guideline',
        by: {
          en: 'China Association of Chinese Medicine (drafted by Dongzhimen Hospital, Beijing University of Chinese Medicine, et al.)',
          zh: '中華中醫藥學會（北京中醫藥大學東直門醫院等起草）',
        },
        title: {
          en: 'Clinical guideline for acupuncture and moxibustion in anxiety disorders',
          zh: '針灸治療焦慮障礙臨床診療指南',
        },
        year: 2017,
        ref: 'T/CACM 023-2017',
        url: 'https://qxb-img-osscache.qixin.com/standards/2359fbdc166d1f493431990002450b61.pdf',
        points: ['PC6', 'HT7'],
        finding: {
          en: 'Its first needling scheme for generalised anxiety uses Sishencong, Neiguan, Sanyinjiao and Yintang, adding Shenmen when the heart-spirit lacks nourishment. It also recommends ear seeds that patients press themselves.',
          zh: '廣泛性焦慮的第一套針灸方案，主穴取四神聰、內關、三陰交、印堂，心神失養加神門。指南亦建議患者自行按壓耳穴貼籽。',
        },
      },
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'Chinese-medicine nursing protocols for 13 conditions including stroke (2026 edition)',
          zh: '中風等13個病種中醫護理方案（2026年版）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['PC6', 'HT7'],
        finding: {
          en: 'It has no section on anxiety. For palpitations, including those that come with fear, it lists nurse-given point massage at Neiguan with Tongli in the hypertension section, and at Shenmen and Neiguan in the stable-angina section.',
          zh: '方案沒有焦慮專節。對心悸（包括伴有恐懼感者），高血壓一節列出由護士施行的經穴推拿，取內關、通里；胸痹心痛一節則取神門、內關等穴。',
        },
      },
    ],
    research: [
      {
        kind: 'systematic-review',
        by: { en: 'Au DW et al.', zh: 'Au DW 等' },
        title: {
          en: 'Effects of acupressure on anxiety: a systematic review and meta-analysis',
          zh: '指壓對焦慮的效果：系統綜述與統合分析',
        },
        year: 2015,
        doi: '10.1136/acupmed-2014-010720',
        points: ['HT7'],
        finding: {
          en: 'Seven sham-controlled trials of acupressure for anxiety before surgery or treatment, most often at Yintang and Shenmen. Pooled, anxiety eased more than with sham pressing, a medium-sized short-term effect; heart rate and other body signs gave conflicting results.',
          zh: '七項以假按壓對照的試驗，對象是手術或治療前的焦慮，最常用印堂與神門。合併後，焦慮舒緩程度勝於假按壓，屬中等的短期效果；心率等生理指標結果不一。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Chen SR et al.', zh: 'Chen SR 等' },
        title: {
          en: 'Effects of acupressure on anxiety: a systematic review and meta-analysis',
          zh: '指壓對焦慮的效果：系統綜述與統合分析',
        },
        year: 2022,
        doi: '10.1089/jicm.2020.0256',
        finding: {
          en: 'Twenty-seven trials: acupressure eased anxiety, most clearly for inpatients and people awaiting surgery when fingers did the pressing. Results varied widely between trials.',
          zh: '二十七項試驗：指壓能舒緩焦慮，以住院者與術前者、並以手指按壓時最為明顯。各試驗結果差異很大。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Kwon CY, Lee B', zh: 'Kwon CY、Lee B' },
        title: {
          en: 'Acupuncture or acupressure on Yintang (EX-HN3) for anxiety: a preliminary review',
          zh: '針灸或按壓印堂治療焦慮：初步綜述',
        },
        year: 2018,
        doi: '10.1089/acu.2017.1268',
        finding: {
          en: 'Five trials pressed or needled Yintang alone, mostly before surgery, and self-reported anxiety fell consistently.',
          zh: '五項試驗只按壓或針灸印堂一穴，多在手術前進行，術前者的自評焦慮一致下降。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Bae H et al.', zh: 'Bae H 等' },
        title: {
          en: 'Efficacy of acupuncture in reducing preoperative anxiety: a meta-analysis',
          zh: '針灸減輕術前焦慮的療效：統合分析',
        },
        year: 2014,
        doi: '10.1155/2014/850367',
        finding: {
          en: 'Fourteen trials before surgery: eight used needles and six pressed beads or balls on ear or body points. Anxiety eased more than with sham, and Yintang was a common point.',
          zh: '十四項術前試驗：八項用針，六項以小珠按壓耳穴或體穴。焦慮舒緩程度勝於假治療，印堂是常用穴位。',
        },
      },
    ],
  },
  {
    slug: 'insomnia',
    summary: {
      en: 'A Chinese sleep guideline names Shenmen in every pattern and places Yongquan under bedtime herbal plasters. A review of finger-pressure trials found sleep quality improved more than with sham pressing, mostly at Shenmen.',
      zh: '一份中醫失眠指南在每個證型都用神門，並把湧泉列入睡前藥物穴位貼敷。指壓試驗的系統綜述發現，睡眠品質的改善勝於假按壓，所用穴位以神門為主。',
    },
    chinese: [
      {
        kind: 'guideline',
        by: {
          en: 'National 11th Five-Year key project research group (Guang’anmen Hospital, China Academy of Chinese Medical Sciences)',
          zh: '國家「十一五」科技支撐計劃課題組（中國中醫科學院廣安門醫院）',
        },
        title: {
          en: 'Individualised clinical practice guideline of Chinese medicine for insomnia (World Journal of Sleep Medicine, vol. 3, no. 2)',
          zh: '基於個體化的失眠症中醫臨床實踐指南（《世界睡眠醫學雜誌》第3卷第2期）',
        },
        year: 2016,
        url: 'https://medi-guide.meditool.cn/ymtpdf/3DCB661F-8583-5E04-C8E6-4E3D7D61B20F.pdf',
        points: ['HT7', 'KI1'],
        finding: {
          en: 'Recommends needling with Shenmen and Sanyinjiao in every pattern, plus pattern points. It also recommends herbal plasters on Taiyang, Shenmen and Yongquan at bedtime, and a guided relaxation ends at Yongquan on the sole.',
          zh: '建議施針，每個證型都取神門、三陰交，再按證型配穴；亦建議睡前以藥物貼敷太陽、神門、湧泉。導引放鬆法的一條路線止於足心湧泉。',
        },
      },
      {
        kind: 'textbook',
        by: {
          en: 'Liu Guanjun (ed.), Guangming Chinese Medicine Correspondence University',
          zh: '光明中醫函授大學（劉冠軍主編）',
        },
        title: {
          en: 'Acupuncture and Moxibustion, correspondence textbook, volume 2: Sleeplessness',
          zh: '《針灸學》下冊・不寐',
        },
        year: 1988,
        url: 'https://www.gmzyjx.com/books/zjx/zjx-zjx2.1.3-0.0.5.0.0/',
        points: ['HT7'],
        finding: {
          en: 'Lists Shenmen in three of its four sleeplessness patterns: with Xinshu, Pishu and Sanyinjiao for heart and spleen deficiency, with Taixi and Taichong for yin deficiency with fire, and with Xingjian for liver fire. Treatment is by needle.',
          zh: '四個不寐證型中有三個取神門：心脾兩虛配心俞、脾俞、三陰交；陰虛火旺配太溪、太衝；肝火上擾配行間。治法為施針。',
        },
      },
    ],
    research: [
      {
        kind: 'systematic-review',
        by: { en: 'Waits A et al.', zh: 'Waits A 等' },
        title: {
          en: 'Acupressure effect on sleep quality: a systematic review and meta-analysis',
          zh: '指壓對睡眠品質的影響：系統綜述與統合分析',
        },
        year: 2018,
        doi: '10.1016/j.smrv.2016.12.004',
        points: ['HT7'],
        finding: {
          en: 'Thirty-two trials of finger pressure. Against sham pressing, sleep-quality scores improved, with little variation between trials; time to fall asleep and sleep length changed most. Shenmen was the point most used.',
          zh: '三十二項指壓試驗。與假按壓相比，睡眠品質評分有所改善，各試驗之間差異不大；入睡時間與睡眠時長變化最明顯。神門是最常用的穴位。',
        },
      },
    ],
  },
  {
    slug: 'travel-nausea',
    summary: {
      en: 'Chinese sources name Neiguan, Zusanli and Sanyinjiao for nausea and vomiting, not travel sickness itself. Lab trials of wristbands and Neiguan pressure differ: some found less nausea, others no protection.',
      zh: '中醫文獻為噁心嘔吐列出內關、足三里、三陰交，但並非針對暈車暈船。腕帶與按壓內關的實驗室試驗結果不一：有的發現噁心減輕，有的未見保護作用。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'Chinese-medicine nursing protocols for 13 conditions including stroke (2026 edition)',
          zh: '中風等13個病種中醫護理方案（2026年版）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['PC6', 'ST36'],
        finding: {
          en: 'Lists nurse-given point massage at Neiguan, Hegu and Zusanli, pressed and kneaded, to settle vomiting in the hypertension section, and Neiguan with Hegu for nausea in the lung-cancer section. It does not address motion sickness.',
          zh: '高血壓一節列出由護士按揉內關、合谷、足三里以止嘔；肺癌一節對噁心嘔吐取合谷、內關施行經穴推拿。方案沒有談及暈動病。',
        },
      },
      {
        kind: 'textbook',
        by: {
          en: 'Liu Guanjun (ed.), Guangming Chinese Medicine Correspondence University',
          zh: '光明中醫函授大學（劉冠軍主編）',
        },
        title: {
          en: 'Acupuncture and Moxibustion, correspondence textbook, volume 2: Vomiting',
          zh: '《針灸學》下冊・嘔吐',
        },
        year: 1988,
        url: 'https://www.gmzyjx.com/books/zjx/zjx-zjx2.1.2-0.0.1.0.0/',
        points: ['SP6', 'ST36', 'PC6'],
        finding: {
          en: 'Frames vomiting as stomach qi failing to descend. It needles Sanyinjiao, Taichong and Zhongwan for cold-type vomiting, Zusanli for food stagnation, and adds Neiguan for retching.',
          zh: '教材以胃失和降解釋嘔吐。偏寒者取三陰交、太衝、中脘等施針，飲食所傷取足三里等，乾嘔泛酸加內關。',
        },
      },
    ],
    research: [
      {
        kind: 'rct',
        by: { en: 'Hu S et al.', zh: 'Hu S 等' },
        title: {
          en: 'P6 acupressure reduces symptoms of vection-induced motion sickness (Aviation, Space, and Environmental Medicine, vol. 66)',
          zh: '按壓內關減輕視覺誘發的暈動症狀（《航空、太空與環境醫學》第66卷）',
        },
        year: 1995,
        url: 'https://europepmc.org/article/MED/7575310',
        points: ['PC6'],
        finding: {
          en: 'Sixty-four people sat in a rotating striped drum. Those given Neiguan pressure reported less nausea than those given dummy-point, sham or no pressure, and showed less abnormal stomach rhythm.',
          zh: '六十四人坐在旋轉的條紋圓筒內。按壓內關的一組，噁心程度低於按壓非穴位、假按壓或不按壓的各組，胃電節律異常也較少。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Stern RM et al.', zh: 'Stern RM 等' },
        title: {
          en: 'Acupressure relieves the symptoms of motion sickness and reduces abnormal gastric activity (Alternative Therapies in Health and Medicine, vol. 7)',
          zh: '指壓舒緩暈動症狀並減少胃部異常活動（《另類療法與健康醫學》第7卷）',
        },
        year: 2001,
        url: 'https://europepmc.org/article/MED/11452572',
        points: ['PC6'],
        finding: {
          en: 'Twenty-five susceptible young adults had fewer symptoms on days wearing a pressure band than on days without one. A band worn higher on the arm helped too.',
          zh: '二十五名容易暈動的年輕人，戴壓力腕帶的日子症狀少於不戴的日子。戴在手臂較高處同樣有幫助。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Bruce DG et al.', zh: 'Bruce DG 等' },
        title: {
          en: 'Acupressure and motion sickness (Aviation, Space, and Environmental Medicine, vol. 61)',
          zh: '指壓與暈動病（《航空、太空與環境醫學》第61卷）',
        },
        year: 1990,
        url: 'https://europepmc.org/article/MED/2339974',
        finding: {
          en: 'Eighteen people faced a laboratory motion challenge. A wrist pressure band gave no more tolerance than placebo, while the drug hyoscine did.',
          zh: '十八人接受實驗室的動態刺激。壓力腕帶與安慰劑一樣，沒有提高耐受度；藥物東莨菪鹼則有效。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Miller KE, Muth ER', zh: 'Miller KE、Muth ER' },
        title: {
          en: 'Efficacy of acupressure and acustimulation bands for the prevention of motion sickness (Aviation, Space, and Environmental Medicine, vol. 75)',
          zh: '指壓腕帶與電刺激腕帶預防暈動病的效果（《航空、太空與環境醫學》第75卷）',
        },
        year: 2004,
        url: 'https://europepmc.org/article/MED/15018290',
        finding: {
          en: 'Seventy-seven people in a rotating drum: neither a pressure band nor an electrical band prevented motion sickness, whether or not people were trained to use it.',
          zh: '七十七人在旋轉圓筒中測試：無論是否受過使用訓練，壓力腕帶與電刺激腕帶都未能預防暈動病。',
        },
      },
      {
        kind: 'cochrane',
        by: { en: 'Matthews A et al.', zh: 'Matthews A 等' },
        title: {
          en: 'Interventions for nausea and vomiting in early pregnancy',
          zh: '孕早期噁心嘔吐的處理方法',
        },
        year: 2015,
        doi: '10.1002/14651858.CD007575.pub4',
        finding: {
          en: 'Forty-one trials of morning sickness, including pressure at Neiguan, ear pressure and Neiguan stimulation. The review did not find clear support for any intervention; the authors stress this is not the same as showing they fail.',
          zh: '四十一項孕早期噁心試驗，涉及按壓內關、耳穴按壓與內關電刺激等方法。綜述未發現任何一種方法獲明確支持；作者強調，這並不等於證明它們無效。',
        },
      },
    ],
  },
  {
    slug: 'period-pain',
    summary: {
      en: 'A Chinese textbook pairs Sanyinjiao and Taichong for period pain from liver qi stagnation, for needling. A review found Sanyinjiao pressure eased pain for a few hours; a Cochrane review of needling and pressure found inconsistent results against sham.',
      zh: '中醫教材以三陰交配太衝治療肝鬱氣滯的經痛，方法是施針。一篇綜述發現按壓三陰交可在數小時內減輕疼痛；Cochrane 綜述匯總針灸與指壓試驗，與假治療相比結果不一致。',
    },
    chinese: [
      {
        kind: 'textbook',
        by: {
          en: 'Liu Guanjun (ed.), Guangming Chinese Medicine Correspondence University',
          zh: '光明中醫函授大學（劉冠軍主編）',
        },
        title: {
          en: 'Acupuncture and Moxibustion, correspondence textbook, volume 2: Period pain',
          zh: '《針灸學》下冊・痛經',
        },
        year: 1988,
        url: 'https://www.gmzyjx.com/books/zjx/zjx-zjx2.3-0.0.2.0.0/',
        points: ['LV3', 'SP6'],
        finding: {
          en: 'For period pain from liver qi stagnation it needles Qihai, Taichong and Sanyinjiao, with Taichong to soothe the liver and Sanyinjiao to move blood. Cold-damp and liver–kidney deficiency patterns get other points.',
          zh: '肝鬱氣滯型痛經取氣海、太衝、三陰交施針：太衝疏肝解鬱，三陰交配氣海行氣活血。寒濕凝滯與肝腎虧損兩型另取他穴。',
        },
      },
    ],
    research: [
      {
        kind: 'systematic-review',
        by: { en: 'Abaraogu UO et al.', zh: 'Abaraogu UO 等' },
        title: {
          en: 'Effectiveness of SP6 (Sanyinjiao) acupressure for relief of primary dysmenorrhea symptoms: a systematic review with meta- and sensitivity analyses',
          zh: '按壓三陰交舒緩原發性痛經的效果：系統綜述、統合分析與敏感性分析',
        },
        year: 2016,
        doi: '10.1016/j.ctcp.2016.09.003',
        points: ['SP6'],
        finding: {
          en: 'Six trials. Sanyinjiao pressure by trained staff eased pain right after and for up to three hours; pressing it yourself took several monthly cycles before pain fell.',
          zh: '六項試驗。由受訓人員按壓三陰交，疼痛在按壓後即時減輕，效果可維持至三小時；自行按壓則需經過數個月經週期才見疼痛減輕。',
        },
      },
      {
        kind: 'cochrane',
        by: { en: 'Smith CA et al.', zh: 'Smith CA 等' },
        title: {
          en: 'Acupuncture for dysmenorrhoea',
          zh: '針灸治療痛經',
        },
        year: 2016,
        doi: '10.1002/14651858.CD007854.pub3',
        finding: {
          en: 'Forty-two trials of needling and acupressure. Against sham, results were inconsistent from trial to trial, and one needling trial found no difference.',
          zh: '四十二項針灸與指壓試驗。與假治療相比，各試驗結果不一致，其中一項針灸試驗未見差異。',
        },
      },
    ],
  },
  {
    slug: 'back-pain',
    summary: {
      en: 'A national nursing protocol and a textbook name Shenshu and Weizhong for low back pain, the protocol adding Huantiao. Trials of acupressure given by practitioners found less pain and disability.',
      zh: '國家層面的護理方案與教材都為腰痛列出腎俞、委中，護理方案另加環跳。由治療師施行的指壓試驗發現，疼痛與活動受限均有減輕。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'Chinese-medicine nursing protocols for 13 conditions including stroke (2026 edition)',
          zh: '中風等13個病種中醫護理方案（2026年版）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['BL40', 'BL23', 'GB30'],
        finding: {
          en: 'For lumbar disc pain it names Weizhong, Shenshu and Huantiao for moxa, cupping, hot herbal compresses, steaming and plasters, and asks nurses to massage and pat numb limbs. It does not list finger pressure at these points.',
          zh: '腰椎間盤突出症一節，為懸灸、拔罐、中藥熱熨敷、熏蒸與穴位敷貼列出委中、腎俞、環跳等穴，並請護士按摩拍打麻木的肢體；方案沒有列出以手指按壓這些穴位。',
        },
      },
      {
        kind: 'textbook',
        by: {
          en: 'Liu Guanjun (ed.), Guangming Chinese Medicine Correspondence University',
          zh: '光明中醫函授大學（劉冠軍主編）',
        },
        title: {
          en: 'Acupuncture and Moxibustion, correspondence textbook, volume 2: Low back pain',
          zh: '《針灸學》下冊・腰痛',
        },
        year: 1988,
        url: 'https://www.gmzyjx.com/books/zjx/zjx-zjx2.1.4-0.0.7.0.0/',
        points: ['BL23', 'BL40'],
        finding: {
          en: 'Main points are Shenshu and Weizhong plus local tender points, with added points for cold-damp, strain and kidney deficiency, by needle, moxa or both. It calls Weizhong the key point for pain of the back.',
          zh: '主穴為腎俞、委中及局部俞穴或阿是穴，寒濕、勞損、腎虛各加配穴，治法為施針、施灸或兩者並用。教材稱委中為治療腰背疼痛的要穴。',
        },
      },
    ],
    research: [
      {
        kind: 'rct',
        by: { en: 'Hsieh LL et al.', zh: 'Hsieh LL 等' },
        title: {
          en: 'Treatment of low back pain by acupressure and physical therapy: randomised controlled trial (BMJ, vol. 332)',
          zh: '指壓與物理治療治療腰痛：隨機對照試驗（《英國醫學期刊》第332卷）',
        },
        year: 2006,
        doi: '10.1136/bmj.38744.672616.AE',
        finding: {
          en: 'One hundred and twenty-nine people with chronic low back pain at one clinic in Taiwan. A month of acupressure lowered disability and pain more than physical therapy, and the gap held at six months. There was no sham group.',
          zh: '台灣一家診所的一百二十九名慢性腰痛患者。接受一個月指壓者，活動受限與疼痛的改善都勝於物理治療，差距維持至六個月後。試驗沒有假治療組。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Li T et al.', zh: 'Li T 等' },
        title: {
          en: 'Clinical efficacy and safety of acupressure on low back pain: a systematic review and meta-analysis',
          zh: '指壓治療腰痛的療效與安全性：系統綜述與統合分析',
        },
        year: 2021,
        doi: '10.1155/2021/8862399',
        points: ['BL40', 'GB30', 'BL23'],
        finding: {
          en: 'Twenty-three trials: acupressure eased pain more than massage, physical therapy or usual care, with wide variation between trials. Weizhong and Huantiao were the most used points; Shenshu was also common.',
          zh: '二十三項試驗：指壓減痛效果勝於推拿、物理治療或常規照護，但各試驗差異很大。委中與環跳最常用，腎俞亦屬常用穴。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Godley E, Smith MA', zh: 'Godley E、Smith MA' },
        title: {
          en: 'Efficacy of acupressure for chronic low back pain: a systematic review',
          zh: '指壓治療慢性腰痛的療效：系統綜述',
        },
        year: 2020,
        doi: '10.1016/j.ctcp.2020.101146',
        finding: {
          en: 'Six trials of acupressure for chronic low back pain all reported less pain and better sleep, and none found serious harms. The review included only English-language trials.',
          zh: '六項指壓治療慢性腰痛的試驗都報告疼痛減輕、睡眠改善，均未發現嚴重不良反應。綜述只收錄英文試驗。',
        },
      },
    ],
  },
  {
    slug: 'desk-neck-shoulder',
    summary: {
      en: 'A Chinese nursing protocol advises moving the neck often during desk work. Two hand-pressure trials eased neck pain against no treatment, with no sham group; needling eased pain slightly more than sham, and forearm support cut new neck and shoulder disorders.',
      zh: '中醫護理方案建議伏案工作時經常活動頸部。兩項手法按壓試驗與不處理相比減輕頸痛，但沒有假按壓組；針灸減痛略多於假針灸；前臂承托減少了新出現的頸肩疾患。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'Nursing protocols for 13 conditions including stroke (2026 edition): neck bi (cervical radiculopathy)',
          zh: '中風等13個病種中醫護理方案（2026年版）：項痹病（神經根型頸椎病）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['GB20', 'GV20', 'EX-HN5', 'LI11'],
        finding: {
          en: 'Lists nurse-led point massage at fengchi, baihui and taiyang for dizziness with neck pain, and moxa at points including quchi for arm numbness, on a doctor’s order. Advises moving the neck every 1–2 hours of desk work and regular shoulder and neck exercise.',
          zh: '列出遵醫囑由護士施行的經穴推拿，取風池、百會、太陽處理頸痛伴眩暈；手臂麻木時懸灸曲池等穴。建議伏案工作每隔一到兩小時活動頸部，並長期堅持肩頸鍛鍊。',
        },
      },
    ],
    research: [
      {
        kind: 'rct',
        by: { en: 'Matsubara T et al.', zh: 'Matsubara T 等' },
        title: {
          en: 'Evidence-Based Complementary and Alternative Medicine, 2011',
          zh: '《循證補充與替代醫學》，2011',
        },
        year: 2011,
        doi: '10.1155/2011/543291',
        points: ['GB21', 'SI14', 'SI15', 'LI4', 'LI10', 'LI11'],
        finding: {
          en: 'In 33 women with chronic neck pain, hand pressure at shoulder points or at arm points eased pain, neck disability and anxiety compared with no treatment; only the shoulder points changed heart-rate measures. There was no sham pressing.',
          zh: '33名長期頸痛的女性中，按壓肩部穴位或手臂穴位，與不處理相比，疼痛、頸部功能障礙與焦慮均減輕；只有肩部穴位改變了心率指標。試驗沒有假按壓對照。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Kim M & Kim J', zh: 'Kim M、Kim J' },
        title: {
          en: 'Journal of Alternative and Complementary Medicine, 2021',
          zh: '《替代與補充醫學雜誌》，2021',
        },
        year: 2021,
        doi: '10.1089/acm.2020.0413',
        finding: {
          en: 'Middle-aged women with chronic neck pain who had acupressure twice a week for four weeks reported less pain and disability and moved the neck further than untreated women. The control had no sham pressing.',
          zh: '長期頸痛的中年女性每週接受兩次穴位按壓、為期四週，與未處理的女性相比，疼痛與功能障礙減輕，頸部活動幅度增加。對照組沒有假按壓。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Zhao L et al.', zh: 'Zhao L 等' },
        title: { en: 'Annals of Internal Medicine, 2024', zh: '《內科學年鑑》，2024' },
        year: 2024,
        doi: '10.7326/M23-2425',
        finding: {
          en: 'In 716 people with chronic neck pain, individualized needling eased pain more than sham needling or a waiting list, and the effect lasted to 24 weeks, but the gain over sham stayed below what patients would notice as clearly better.',
          zh: '716名長期頸痛者中，個體化針灸比假針灸或候診組更能減輕疼痛，效果維持至第24週；但相對假針灸的改善幅度，未達患者能明顯感到好轉的程度。',
        },
      },
      {
        kind: 'cochrane',
        by: { en: 'Gross AR et al.', zh: 'Gross AR 等' },
        title: { en: 'Massage for neck pain', zh: '按摩治療頸痛' },
        year: 2024,
        doi: '10.1002/14651858.CD004871.pub5',
        finding: {
          en: 'Across 33 trials, massage probably made little or no difference to pain, function or quality of life compared with placebo for subacute and chronic neck pain.',
          zh: '綜合33項試驗，對亞急性及慢性頸痛，按摩與安慰劑相比，在疼痛、功能與生活質素上大概沒有甚麼差別。',
        },
      },
      {
        kind: 'cochrane',
        by: { en: 'Hoe VCW et al.', zh: 'Hoe VCW 等' },
        title: {
          en: 'Ergonomic interventions for preventing work-related musculoskeletal disorders of the upper limb and neck among office workers',
          zh: '預防辦公室人員上肢及頸部工作相關肌肉骨骼疾患的人體工學介入',
        },
        year: 2018,
        doi: '10.1002/14651858.CD008570.pub3',
        finding: {
          en: 'A forearm support with an alternative mouse reduced new neck and shoulder disorders; extra breaks eased neck discomfort; one study of workstation adjustment found no effect.',
          zh: '前臂承托配合另一種滑鼠，可減少新出現的頸肩疾患；額外小休可減輕頸部不適；一項調整工作站的研究未見效果。',
        },
      },
    ],
  },
  {
    slug: 'nausea-after-treatment',
    summary: {
      en: 'Chinese guidance names neiguan (PC6), zusanli and hegu for nausea and vomiting. Reviews found pressing neiguan beside standard anti-sickness medicine may ease nausea after surgery or chemotherapy a little; effects on vomiting were less consistent.',
      zh: '中文指引為噁心嘔吐列出內關（PC6）、足三里與合谷。綜述發現，在標準止吐藥之外按壓內關，或可稍稍緩解術後或化療引起的噁心；對嘔吐的作用則不夠一致。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'Nursing protocols in Chinese medicine for 13 conditions including stroke (2026 edition): lung cancer section',
          zh: '中風等13個病種中醫護理方案（2026年版）：肺積（肺癌）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['LI4', 'PC6'],
        finding: {
          en: 'For nausea and vomiting in lung-cancer care, lists hand pressure at hegu and neiguan, with anti-sickness drugs given promptly as the doctor orders. It also names zusanli and neiguan for point injection, which is not a self-care method.',
          zh: '肺積（肺癌）噁心嘔吐的施護中，列出經穴推拿可選合谷、內關，並要求遵醫囑及時給予止吐藥；另列穴位注射可選足三里、內關，但這並非自我照護方法。',
        },
      },
      {
        kind: 'consensus',
        by: {
          en: 'Chinese Society of Anesthesiology (Wang Q, Xiong L et al.)',
          zh: '中華醫學會麻醉學分會（王強、熊利澤等）',
        },
        title: {
          en: 'Expert consensus on acupoint stimulation for preventing and treating postoperative gastrointestinal dysfunction (2021)',
          zh: '穴位刺激防治術後胃腸功能障礙專家共識（2021）',
        },
        year: 2021,
        url: 'https://www.cn-healthcare.com/articlewm/20210816/content-1253395.html',
        points: ['PC6', 'ST36', 'LI4'],
        finding: {
          en: 'Calls neiguan the accepted standard point for preventing post-operative nausea and vomiting and names zusanli and hegu among its common companions. It sees finger pressure itself as mainly for comfort, preferring needling or skin-surface electrical stimulation.',
          zh: '稱內關為公認預防術後噁心嘔吐的標準穴位，並列足三里、合谷為常用配穴。認為穴位按壓本身主要用於改善舒適度，更傾向手針或經皮穴位電刺激。',
        },
      },
      {
        kind: 'guideline',
        by: { en: 'Chinese Pharmaceutical Association', zh: '中國藥學會' },
        title: {
          en: 'Guideline for drug prevention and treatment of chemotherapy-induced nausea and vomiting, 2nd edition (draft for comment)',
          zh: '化療所致噁心嘔吐的藥物防治指南（第2版）（徵求意見稿）',
        },
        year: 2026,
        url: 'https://www.cpa.org.cn/cpadmn/attached/file/20260626/1782459551543346.pdf',
        points: ['ST36', 'PC6', 'CV12'],
        finding: {
          en: 'Recommends needling at points such as zusanli, neiguan and zhongwan as an add-on for preventing chemotherapy sickness, and says pressing points at home may ease mild sickness as a support measure but should not replace drug treatment.',
          zh: '建議以針灸足三里、內關、中脘等穴作為輔助，用於預防化療噁心嘔吐；並指出居家按壓穴位等或可緩解輕度噁心嘔吐，可作輔助措施，但不應取代藥物治療。',
        },
      },
    ],
    research: [
      {
        kind: 'cochrane',
        by: { en: 'Lee A et al.', zh: 'Lee A 等' },
        title: {
          en: 'Stimulation of the wrist acupuncture point PC6 for preventing postoperative nausea and vomiting: a network meta-analysis',
          zh: '刺激腕部內關穴預防術後噁心嘔吐：網狀薈萃分析',
        },
        year: 2025,
        doi: '10.1002/14651858.CD003281.pub5',
        points: ['PC6'],
        finding: {
          en: 'Across 77 trials, non-invasive neiguan stimulation such as wristbands and finger pressure may reduce nausea and vomiting after surgery compared with sham; combined with anti-sickness drugs it probably lowers the need for rescue medicine. Side effects were minor.',
          zh: '匯總77項試驗：手環、指壓等無創刺激內關，與假刺激相比或可減少術後噁心與嘔吐；與止吐藥合用很可能減少補救用藥。副作用輕微。',
        },
      },
      {
        kind: 'cochrane',
        by: { en: 'Lee A, Chan SK, Fan LT', zh: 'Lee A、Chan SK、Fan LT' },
        title: {
          en: 'Stimulation of the wrist acupuncture point PC6 for preventing postoperative nausea and vomiting',
          zh: '刺激腕部內關穴預防術後噁心嘔吐',
        },
        year: 2015,
        doi: '10.1002/14651858.CD003281.pub4',
        points: ['PC6'],
        finding: {
          en: 'The earlier version of the review above. Neiguan stimulation, much of it by needle or electrical device, roughly matched six anti-sickness drugs for post-operative nausea and vomiting, and did better than sham.',
          zh: '上一篇綜述的前一版。刺激內關（不少用針或電刺激）預防術後噁心嘔吐，與六種止吐藥效果相若，並優於假刺激。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Xiao C et al.', zh: 'Xiao C 等' },
        title: {
          en: 'Effects of PC6 acupressure on acute and delayed nausea and vomiting induced by chemotherapy in patients with malignant neoplasm: a meta-analysis',
          zh: '按壓內關對化療所致急性及延遲性噁心嘔吐的作用：薈萃分析',
        },
        year: 2023,
        doi: '10.1007/s00520-023-07976-0',
        points: ['PC6'],
        finding: {
          en: 'In ten trials of people having chemotherapy, pressing neiguan made nausea less frequent and both nausea and vomiting less severe than control care, though the effect on how often delayed vomiting occurred was unclear and symptoms did not last a shorter time.',
          zh: '十項化療病人的試驗中，按壓內關令噁心次數減少，噁心與嘔吐程度均較對照減輕；但對延遲性嘔吐次數的作用不明確，症狀持續時間也未縮短。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Miao J et al.', zh: 'Miao J 等' },
        title: {
          en: 'Effects of acupressure on chemotherapy-induced nausea and vomiting: a systematic review with meta-analyses and trial sequential analysis of randomized controlled trials',
          zh: '指壓對化療所致噁心嘔吐的作用：隨機對照試驗的系統綜述、薈萃分析與試驗序貫分析',
        },
        year: 2017,
        doi: '10.1016/j.ijnurstu.2017.02.014',
        finding: {
          en: 'In twelve trials, acupressure eased the severity of acute and delayed nausea a little but showed no benefit for how often vomiting occurred.',
          zh: '十二項試驗中，指壓令急性與延遲性噁心的程度略有減輕，但對嘔吐的發生與次數未見益處。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Quan XM et al.', zh: 'Quan XM 等' },
        title: {
          en: 'Clinical evidence of acupressure for improving chemotherapy-induced nausea and vomiting in breast cancer patients: a systematic review and meta-analysis',
          zh: '指壓改善乳癌病人化療所致噁心嘔吐的臨床證據：系統綜述與薈萃分析',
        },
        year: 2026,
        doi: '10.1016/j.ctim.2026.103459',
        finding: {
          en: 'In 39 trials of breast-cancer patients, acupressure added to standard anti-sickness drugs improved control of acute and delayed sickness; used alone in place of drugs it was not better for most outcomes.',
          zh: '三十九項乳癌病人試驗中，指壓加在標準止吐藥之上，改善了急性與延遲性噁心嘔吐的控制；單獨使用以取代藥物時，多數結果並不更優。',
        },
      },
    ],
  },
  {
    slug: 'bloating',
    summary: {
      en: 'A national nursing protocol and a 2025 expert consensus name these points and clockwise belly massage. Most of the research is needling: one sham-controlled trial in 278 adults helped fullness and bloating; hand-pressing trials found mixed results.',
      zh: '國家級護理方案與二〇二五年專家共識都列出這些穴位與順時針摩腹。研究以施針為主：一項納入278名成人的假針對照試驗改善了飽脹與脹氣；以手按壓的試驗結果不一。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'TCM nursing protocols for 13 conditions including stroke (2026 edition): stomach pain (chronic gastritis)',
          zh: '《中風等13個病種中醫護理方案（2026年版）》胃脘痛（慢性胃炎）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['CV12', 'ST25', 'CV6', 'ST36', 'PC6'],
        finding: {
          en: 'For a distended stomach it advises clockwise abdominal massage, smaller meals and walking after eating. Its stomach-pain plan names zhongwan, tianshu and qihai for point massage; for a bloated belly with poor appetite it names zusanli, zhongwan and neiguan. Nurse-delivered, on doctor’s orders.',
          zh: '胃脘脹滿建議順時針按摩腹部、控制食量、飯後適當活動。胃脘疼痛的經穴推拿選中脘、天樞、氣海；腹脹納呆的經穴推拿選足三里、中脘、內關。均由護士遵醫囑施行。',
        },
      },
      {
        kind: 'consensus',
        by: {
          en: 'Chinese Association of Integrative Medicine, Digestive Diseases Committee',
          zh: '中國中西醫結合學會消化系統疾病專業委員會',
        },
        title: {
          en: 'Expert consensus on integrated Chinese and Western medicine for functional dyspepsia (2025)',
          zh: '《功能性消化不良中西醫結合診療專家共識（2025年）》',
        },
        year: 2025,
        doi: '10.3969/j.issn.1671-038X.2025.11.03',
        points: ['ST36', 'CV12', 'PC6', 'ST25'],
        finding: {
          en: 'Lists zusanli, zhongwan, neiguan and tianshu among the common points for needling, and recommends clockwise abdominal massage with pressing at tianshu and zusanli.',
          zh: '針灸常用穴包括足三里、中脘、內關、天樞；腹部推拿以順時針推腹並點按天樞、足三里等穴。',
        },
      },
    ],
    research: [
      {
        kind: 'rct',
        by: { en: 'Yang JW et al.', zh: 'Yang JW 等' },
        title: {
          en: 'Annals of Internal Medicine, 2020',
          zh: '《內科學年鑑》（Annals of Internal Medicine），2020',
        },
        year: 2020,
        doi: '10.7326/M19-2880',
        points: ['CV12', 'ST25', 'CV6', 'ST36', 'PC6'],
        finding: {
          en: 'Needling, not hand pressure. In 278 adults with postprandial distress syndrome, a functional dyspepsia marked by fullness and upper-belly bloating, twelve sessions helped more people than sham needling, and the gain held through twelve weeks of follow-up.',
          zh: '施針而非指壓。278名餐後不適綜合徵成人，主要症狀為飽脹與上腹脹氣；接受十二次治療後，改善的人數多於假針組，並在十二週隨訪中維持。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Asal MGR et al.', zh: 'Asal MGR 等' },
        title: { en: 'BMC Nursing, 2025', zh: '《BMC Nursing》，2025' },
        year: 2025,
        doi: '10.1186/s12912-024-02594-5',
        points: ['CV12', 'ST25', 'ST36'],
        finding: {
          en: 'Self-pressing at home. In 63 adults with diarrhoea-predominant irritable bowel syndrome, four weeks of pressing zhongwan, tianshu, zusanli and sanyinjiao lowered overall symptom scores, a scale that includes bloating, more than pressing sham spots, at a single centre.',
          zh: '在家自我按壓。63名腹瀉型腸易激綜合症成人，按壓中脘、天樞、足三里、三陰交四週，整體症狀評分（含腹脹一項）的改善多於按假穴位。試驗在單一中心進行。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Liu Y et al.', zh: 'Liu Y 等' },
        title: {
          en: 'Asia-Pacific Journal of Oncology Nursing, 2023',
          zh: '《亞太腫瘤護理雜誌》（Asia-Pacific Journal of Oncology Nursing），2023',
        },
        year: 2023,
        doi: '10.1016/j.apjon.2023.100229',
        points: ['ST36'],
        finding: {
          en: 'Nurses pressed zusanli for five days after colorectal cancer surgery in 112 adults. Wind passed about half a day sooner than with light skin rubbing, but belly distension, first stool and bowel sounds did not differ.',
          zh: '112名大腸癌手術後成人，由護士按壓足三里五天。與只輕擦皮膚相比，首次排氣提早約半天，但腹脹程度、首次排便與腸鳴音沒有分別。',
        },
      },
      {
        kind: 'cochrane',
        by: { en: 'Manheimer E et al.', zh: 'Manheimer E 等' },
        title: {
          en: 'Acupuncture for treatment of irritable bowel syndrome',
          zh: '針灸治療腸易激綜合症',
        },
        year: 2012,
        doi: '10.1002/14651858.CD005111.pub3',
        finding: {
          en: 'Needling, not hand pressure. Across five sham-controlled trials, real needling did no better than sham for symptom severity or quality of life. In unblinded trials, needling did better than drugs.',
          zh: '施針而非指壓。在五項設假針對照的試驗中，真針在症狀嚴重度與生活質素上都沒有勝過假針；在未設盲的試驗中，施針勝過藥物。',
        },
      },
    ],
  },
  {
    slug: 'constipation',
    summary: {
      en: 'Trials of pressing tianshu by hand eased constipation more than sham pressing, and reviews linked belly massage and ear-seed pressing with more bowel movements. In 1075 people, electroacupuncture at ST25 and ST37 beat sham.',
      zh: '以手按天樞的試驗，便秘改善勝於假按壓；腹部按摩與耳穴貼壓的綜述，則與排便次數增加相關。一項1075人的試驗中，電針天樞與上巨虛的效果勝於假電針。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'TCM nursing protocols for 13 conditions including stroke (2026 edition)',
          zh: '中風等13個病種中醫護理方案（2026年版）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['ST25', 'ST37', 'ST36', 'TH6', 'BL31', 'BL32'],
        finding: {
          en: 'For constipation in angina care it suggests pressing tianshu and shangjuxu when the constipation is cold and deficient, and zusanli and zhigou with two sacral points when it runs hot; its stroke, angina and lung-cancer sections add clockwise belly massage and ear-seed pressing.',
          zh: '在胸痹心痛的便秘護理中，建議虛寒性便秘按揉天樞、上巨虛，實熱性便秘按揉足三里、支溝及骶部兩穴；中風、胸痹心痛與肺癌各章另加順時針腹部按摩與耳穴貼壓。',
        },
      },
      {
        kind: 'textbook',
        by: { en: 'National acupuncture textbook (Zhenjiuxue)', zh: '《針灸學》教材' },
        title: {
          en: 'Constipation chapter, online reproduction on the A+ Medical Encyclopedia',
          zh: '便秘章（A+醫學百科網上轉載）',
        },
        year: 2011,
        url: 'https://www.a-hospital.com/w/%E9%92%88%E7%81%B8%E5%AD%A6/%E4%BE%BF%E7%A7%98',
        points: ['BL25', 'ST25', 'TH6', 'ST37'],
        finding: {
          en: 'Divides constipation into excess and deficiency kinds and treats it mainly through the large intestine’s back, front and lower sea points: dachangshu, tianshu, zhigou and shangjuxu as the main set, with extra points chosen by pattern.',
          zh: '把便秘分為實秘與虛秘，以大腸的背俞、募穴與下合穴為主：主穴取大腸俞、天樞、支溝、上巨虛，再按證型加配穴。',
        },
      },
    ],
    research: [
      {
        kind: 'rct',
        by: { en: 'Nieh HC et al.', zh: 'Nieh HC 等' },
        title: {
          en: 'Effect of acupressure on alleviating constipation among inpatients with stroke during the acute phase: a randomized controlled trial',
          zh: '穴位按壓緩解急性期中風住院病人便秘：隨機對照試驗',
        },
        year: 2023,
        doi: '10.1016/j.ctcp.2023.101801',
        points: ['ST25', 'CV12', 'CV6'],
        finding: {
          en: 'In 128 inpatients in the acute phase of stroke, a week of twice-daily hand pressing at tianshu, zhongwan and qihai eased constipation scores more than sham pressing, with more normal stools and less need for laxatives.',
          zh: '128名中風急性期住院病人，每天兩次、連續一週以手按天樞、中脘、氣海，便秘評分的改善優於假按壓組，大便較常恢復正常，也較少需要通便藥。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Wong WK et al.', zh: 'Wong WK 等' },
        title: {
          en: 'Self-administered acupressure for treating adult psychiatric patients with constipation: a randomized controlled trial',
          zh: '自我穴位按壓治療成年精神科病人便秘：隨機對照試驗',
        },
        year: 2015,
        doi: '10.1186/s13020-015-0064-7',
        points: ['CV12', 'ST25', 'LI11'],
        finding: {
          en: 'Seventy-eight psychiatric inpatients in Hong Kong learned to press zhongwan, tianshu and quchi themselves for ten days; symptoms and quality of life improved more than with light pressure on non-points, and still did two weeks later.',
          zh: '香港78名精神科住院病人學習自行按壓中脘、天樞與曲池，為期十天；症狀與生活質素的改善都優於輕按非穴位的一組，兩週後依然可見。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Liu Z et al.', zh: 'Liu Z 等' },
        title: {
          en: 'Acupuncture for chronic severe functional constipation: a randomized trial',
          zh: '針灸治療慢性嚴重功能性便秘：隨機試驗',
        },
        year: 2016,
        doi: '10.7326/M15-3118',
        points: ['ST25', 'SP14', 'ST37'],
        finding: {
          en: 'In 1075 people with chronic severe functional constipation across 15 hospitals, eight weeks of electroacupuncture gave more complete spontaneous bowel movements than sham needling, lasting through follow-up; this was needling, not pressing.',
          zh: '15家醫院共1075名慢性嚴重功能性便秘患者，接受八週電針後，完全自發排便次數多於假電針組，效果延續至隨訪期；這是用針，並非按壓。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Jiang ZF et al.', zh: 'Jiang ZF 等' },
        title: {
          en: 'Auricular acupressure for constipation in adults: a systematic review and meta-analysis',
          zh: '耳穴貼壓治療成人便秘：系統綜述與統合分析',
        },
        year: 2023,
        doi: '10.3389/fphys.2023.1257660',
        finding: {
          en: 'Across 34 randomized trials with 2465 adults, ear-seed pressing was linked with more complete bowel movements and better stool form and quality of life, without more side effects.',
          zh: '34項隨機試驗、共2465名成人的資料顯示，耳穴貼壓與完全排便次數增加、大便性狀及生活質素改善相關，不良反應並未增加。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Huang SY et al.', zh: 'Huang SY 等' },
        title: {
          en: 'Effectiveness of abdominal massage on chronic constipation in adults: a systematic review and meta-analysis',
          zh: '腹部按摩對成人慢性便秘的成效：系統綜述與統合分析',
        },
        year: 2025,
        doi: '10.1016/j.ijnurstu.2024.104936',
        finding: {
          en: 'Across 23 studies with 1431 adults, abdominal massage was linked with more frequent bowel movements, faster gut transit and fewer symptoms, though not less laxative use; results varied widely between studies, and massage combined with acupressure or aromatherapy showed the largest effects, in a few studies.',
          zh: '23項研究、共1431名成人的資料顯示，腹部按摩與排便次數增加、腸道通過時間縮短及症狀減輕相關，但未減少通便藥的使用；各研究結果差異頗大，結合穴位按壓或芳香療法的按摩效果最明顯，見於少數研究。',
        },
      },
    ],
  },
  {
    slug: 'knee-arthritis',
    summary: {
      en: 'A Chinese guideline puts education and weight management first and names these points for acupuncture. Pressing knee points by hand eased pain slightly more than education alone; in another trial, sham pressing helped as much as real pressing.',
      zh: '中醫指南以健康教育和體重管理為首，並把這些穴位列於針灸療法之下。用手按膝周穴位，疼痛比只上健康課略輕；另一項試驗中，假按壓與真按壓的改善相若。',
    },
    chinese: [
      {
        kind: 'guideline',
        by: {
          en: 'China Association for Promotion of Chinese Medicine Research, Orthopaedics and Traumatology Branch',
          zh: '中國中醫藥研究促進會骨傷科分會',
        },
        title: {
          en: 'Guideline for diagnosis and treatment of knee osteoarthritis with Chinese medicine (2020 edition)',
          zh: '膝骨關節炎中醫診療指南（2020年版）',
        },
        year: 2020,
        url: 'https://www.gszyy.com/upload/main/contentmanage/article/file/2023/06/15/%E8%86%9D%E9%AA%A8%E5%85%B3%E8%8A%82%E7%82%8E%E4%B8%AD%E5%8C%BB%E8%AF%8A%E7%96%97%E6%8C%87%E5%8D%97(2020%E5%B9%B4%E7%89%88)_%E9%99%88%E5%8D%AB%E8%A1%A1(1).pdf',
        points: ['SP10', 'ST35', 'GB34', 'SP9', 'ST34', 'ST36'],
        finding: {
          en: 'Puts education and weight management first. Names these points, with the inner knee eye and weizhong, under acupuncture, and also recommends practitioner manual therapy such as pressing and kneading in the quieter stages.',
          zh: '以健康教育和體重管理為首。這組穴位連同內膝眼、委中列於針灸療法之下；並建議在緩解期和康復期由醫師施行點按、揉按等手法治療。',
        },
      },
    ],
    research: [
      {
        kind: 'systematic-review',
        by: { en: 'Kou H et al.', zh: 'Kou H 等' },
        title: {
          en: 'Self-acupressure for osteoarthritis self-management and nursing care outcomes (Geriatric Nursing)',
          zh: '自我穴位按壓用於骨關節炎自我管理與護理結局的系統綜述（Geriatric Nursing）',
        },
        year: 2026,
        doi: '10.1016/j.gerinurse.2026.104288',
        finding: {
          en: 'Across twenty-three trials of self-acupressure for osteoarthritis, it was linked with slightly less pain, better sleep and minor side effects; trials varied widely, and few reported long-term results.',
          zh: '匯總二十三項骨關節炎自我按壓試驗，結果顯示疼痛略減、睡眠改善，副作用輕微；各試驗差異大，報告長期結果的不多。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Yeung WF et al.', zh: 'Yeung WF 等' },
        title: {
          en: 'Self-administered acupressure for probable knee osteoarthritis in middle-aged and older adults (JAMA Network Open)',
          zh: '中老年人可能膝骨關節炎的自我穴位按壓隨機對照試驗（JAMA Network Open）',
        },
        year: 2024,
        doi: '10.1001/jamanetworkopen.2024.5830',
        points: ['ST34', 'ST35', 'ST36', 'SP9', 'SP10', 'GB34'],
        finding: {
          en: 'Over three hundred Hong Kong adults pressed these six points, plus heding and the inner knee eye, by hand twice daily for twelve weeks. Pain fell slightly more than with knee-health education alone; walking tests did not differ. Side effects were mild.',
          zh: '三百多名香港成年人每天兩次用手按這六穴，另加鶴頂和內膝眼，持續十二週。疼痛比只接受膝關節健康教育者略多減輕，步行測試沒有分別；副作用輕微。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Li LW et al.', zh: 'Li LW 等' },
        title: {
          en: 'Self-acupressure for older adults with symptomatic knee osteoarthritis (Arthritis Care & Research)',
          zh: '長者症狀性膝骨關節炎的自我穴位按壓隨機對照試驗（Arthritis Care & Research）',
        },
        year: 2018,
        doi: '10.1002/acr.23262',
        finding: {
          en: 'Older adults in Michigan pressed relaxation points (yintang, anmian, shenmen, sanyinjiao, taichong) with a wooden tool, not knee points. Real and sham pressing helped equally, and both beat usual care.',
          zh: '密歇根的長者用木製工具按一組安神穴位（印堂、安眠、神門、三陰交、太衝），並非膝周穴位。真按與假按改善相若，兩者都勝過一般照護。',
        },
      },
    ],
  },
  {
    slug: 'after-stroke-limbs',
    summary: {
      en: 'A national Chinese nursing protocol names these points for the weak limbs after stroke, for nurse-given electrical stimulation. Trials of hand massage alongside rehabilitation found small, short-term gains in movement and daily activities.',
      zh: '中國國家中醫護理方案為中風後無力的肢體列出這些穴位，用於護士施行的穴位電刺激。徒手按摩配合復康的試驗，發現運動功能與日常活動有小幅、短期的改善。',
    },
    chinese: [
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'TCM nursing protocols for stroke and 12 other conditions (2026 edition): stroke, recovery stage (cerebral infarction)',
          zh: '《中風等13個病種中醫護理方案（2026年版）》：中風（腦梗死恢復期）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['GB21', 'LI11', 'LI4', 'TH5', 'BL40', 'BL60', 'GB39', 'GB34'],
        finding: {
          en: 'For weak, limp or numb limbs in the recovery stage, lists these points for electrical acupoint stimulation by nurses on a doctor’s order, and forbids stimulating spastic muscle directly. Separately advises hand massage of the meridian points to aid limb function, barred where a vein clot is present.',
          zh: '恢復期肢體痿軟無力、麻木者，列出這些穴位，由護士遵醫囑施行穴位電刺激，並嚴禁直接刺激痙攣肌肉；另建議以揉、按、捏等經穴推拿改善肢體功能，有靜脈血栓者禁用。',
        },
      },
      {
        kind: 'guideline',
        by: {
          en: 'TCM rehabilitation guideline working group for ischaemic stroke',
          zh: '中醫康復臨床實踐指南·缺血性腦卒中（腦梗死）制定工作組',
        },
        title: {
          en: 'TCM rehabilitation clinical practice guideline: ischaemic stroke (cerebral infarction). Rehabilitation Medicine 2021;31(6):437–447',
          zh: '《中醫康復臨床實踐指南·缺血性腦卒中（腦梗死）》，康復學報 2021;31(6):437–447',
        },
        year: 2021,
        doi: '10.3724/SP.J.1329.2021.06001',
        finding: {
          en: 'Massage may be used in the recovery and later stages to help limb function and daily living. Names no points for limb massage, and asks therapists to check for a clot when a leg turns painful, swollen, warm or discoloured.',
          zh: '恢復期及後遺症期可酌情運用推拿，以改善肢體功能與日常生活能力；未指定肢體推拿穴位，並要求下肢出現疼痛、腫脹、發熱或變色時評估深靜脈血栓。',
        },
      },
    ],
    research: [
      {
        kind: 'systematic-review',
        by: { en: 'Xie Y et al.', zh: 'Xie Y 等' },
        title: {
          en: 'Efficacy of meridian massage for motor function after a stroke: a systematic review and meta-analysis. J Tradit Chin Med 2022;42(3):321–331',
          zh: '經絡按摩對中風後運動功能的療效：系統綜述與統合分析。J Tradit Chin Med 2022;42(3):321–331',
        },
        year: 2022,
        doi: '10.19852/j.cnki.jtcm.2022.03.001',
        finding: {
          en: 'Nineteen trials of meridian massage by hand, with over fifteen hundred patients. Compared with conventional rehabilitation, massage came with small, short-term gains in movement (especially the leg), daily activities, balance and spasticity, for courses up to eight weeks; results varied widely between trials.',
          zh: '匯總十九項徒手經絡按摩試驗，逾一千五百名患者。與常規復康相比，按摩在運動功能（尤其下肢）、日常活動、平衡與痙攣上有小幅、短期改善，療程八週以內較明顯；各試驗結果差異很大。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Yue S et al.', zh: 'Yue S 等' },
        title: {
          en: 'Effects of a nurse-led acupressure programme for stroke patients in China. J Clin Nurs 2013;22(7-8):1182–1188',
          zh: '由護士主導的中風患者穴位按壓計劃之效果（中國）。J Clin Nurs 2013;22(7-8):1182–1188',
        },
        year: 2013,
        doi: '10.1111/j.1365-2702.2012.04127.x',
        finding: {
          en: 'Seventy-eight stroke patients: nurse-given acupressure plus routine care, against routine care alone. Daily-living and motor scores were higher in the pressure group at three months. There was no sham pressing.',
          zh: '七十八名中風患者：護士施行穴位按壓加常規護理，對比單用常規護理。三個月時，按壓組的日常生活與運動評分較高。試驗沒有假按壓對照。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Kang HS et al.', zh: 'Kang HS 等' },
        title: {
          en: 'Effects of meridian acupressure for stroke patients in Korea. J Clin Nurs 2009;18(15):2145–2152',
          zh: '經絡穴位按壓對中風患者的效果（韓國）。J Clin Nurs 2009;18(15):2145–2152',
        },
        year: 2009,
        doi: '10.1111/j.1365-2702.2008.02522.x',
        finding: {
          en: 'Fifty-six patients in a Korean oriental-medicine hospital: ten minutes of meridian acupressure daily for two weeks, against routine care. Arm function, daily living and mood favoured pressure. Finger swelling was measured, but the abstract does not report it apart.',
          zh: '韓國一所韓醫院的五十六名患者：每天經絡穴位按壓十分鐘、連續兩週，對比常規護理。上肢功能、日常生活與情緒都以按壓組較好。手指腫脹有量度，但摘要沒有單獨報告。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Liu S et al.', zh: 'Liu S 等' },
        title: {
          en: 'Acupuncture for post-stroke shoulder-hand syndrome: a systematic review and meta-analysis. Front Neurol 2019;10:433',
          zh: '針灸治療中風後肩手綜合徵：系統綜述與統合分析。Front Neurol 2019;10:433',
        },
        year: 2019,
        doi: '10.3389/fneur.2019.00433',
        finding: {
          en: 'Thirty-eight trials of acupuncture with needles, added to rehabilitation for shoulder-hand syndrome. Arm movement, pain and daily living improved.',
          zh: '三十八項以針具施行的針灸試驗，配合復康治療肩手綜合徵。上肢活動、疼痛與日常生活均有改善。',
        },
      },
    ],
  },
  {
    slug: 'fatigue',
    summary: {
      en: 'Chinese guidance names zusanli, guanyuan and qihai among the points for fatigue. Trials and reviews found pressing points by hand eased fatigue during or after cancer treatment and in people on haemodialysis.',
      zh: '中醫指引為疲乏列出足三里、關元、氣海等穴。試驗與綜述發現，以手按壓穴位能減輕癌症患者治療期間或之後的疲乏，以及血液透析患者的疲乏。',
    },
    chinese: [
      {
        kind: 'guideline',
        by: {
          en: 'China Association of Chinese Medicine (Cui Y, Yan Y et al.)',
          zh: '中華中醫藥學會（崔譯元、閆逸婧等）',
        },
        title: {
          en: 'Guideline for integrated Chinese and Western medicine diagnosis and treatment of cancer-related fatigue (Chinese General Practice 2025;28(27):3345–58)',
          zh: '癌因性疲乏中西醫結合診療指南（中國全科醫學 2025;28(27):3345–58）',
        },
        year: 2025,
        doi: '10.12114/j.issn.1007-9572.2025.0134',
        ref: 'T/CACM 1522-2023',
        points: ['ST36', 'SP6', 'CV4', 'CV6', 'LI4'],
        finding: {
          en: 'Recommends external therapies, including tuina massage worked along the governing, bladder and yangming channels. Its needling and moxibustion point lists include zusanli, sanyinjiao, guanyuan, qihai and hegu; it names no specific points for massage.',
          zh: '建議以中醫外治法緩解癌因性疲乏，包括沿督脈、膀胱經與陽明經施行的推拿按摩；針法與灸法的取穴包括足三里、三陰交、關元、氣海與合谷，推拿部分則未列具體穴位。',
        },
      },
      {
        kind: 'nursing-protocol',
        by: { en: 'China Association of Chinese Medicine', zh: '中華中醫藥學會' },
        title: {
          en: 'TCM nursing protocols for 13 conditions including stroke (2026 edition): lung cancer, fatigue (p. 79)',
          zh: '中風等13個病種中醫護理方案（2026年版）：肺積（肺癌）乏力（第79頁）',
        },
        year: 2026,
        url: 'https://www.cacm.org.cn/wp-content/uploads/2026/09/%E9%99%84%E4%BB%B61.-%E4%B8%AD%E9%A3%8E%E7%AD%8913%E4%B8%AA%E7%97%85%E7%A7%8D%E4%B8%AD%E5%8C%BB%E6%8A%A4%E7%90%86%E6%96%B9%E6%A1%88%EF%BC%882026%E5%B9%B4%E7%89%88%EF%BC%89%E5%85%A8%E6%96%87.pdf',
        points: ['CV4', 'CV6', 'ST36'],
        finding: {
          en: 'For fatigue in lung cancer: screen for cancer-related fatigue, then suspended moxibustion at points including guanyuan and qihai, a warm herbal compress at points including zusanli, and baduanjin or tai chi. The diabetes protocol (p. 70) lists zusanli, guanyuan and qihai for fatigue too.',
          zh: '肺癌乏力的護理：先作癌因性疲乏篩查，再以懸灸取關元、氣海等穴，以中藥熱熨取足三里等穴，並帶領八段錦、太極拳。消渴病（2 型糖尿病）方案第70頁亦為倦怠乏力列出足三里、關元、氣海。',
        },
      },
    ],
    research: [
      {
        kind: 'guideline',
        by: {
          en: 'ASCO and Society for Integrative Oncology (Bower JE et al.)',
          zh: '美國臨床腫瘤學會與整合腫瘤學會（Bower JE 等）',
        },
        title: {
          en: 'Management of Fatigue in Adult Survivors of Cancer: ASCO–SIO Guideline Update (J Clin Oncol 2024;42(20):2456–87)',
          zh: '成人癌症倖存者疲乏管理：ASCO–SIO 指南更新（J Clin Oncol 2024;42(20):2456–87）',
        },
        year: 2024,
        doi: '10.1200/JCO.24.00541',
        finding: {
          en: 'Once cancer treatment is over, yoga, acupressure and moxibustion may also be recommended, after exercise, cognitive behavioural therapy and mindfulness programmes.',
          zh: '癌症治療結束後，除運動、認知行為治療與正念課程外，亦可考慮瑜伽、穴位按壓與艾灸。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Hsieh SH et al.', zh: 'Hsieh SH 等' },
        title: {
          en: 'The effect of acupressure on relieving cancer-related fatigue: a systematic review and meta-analysis of randomized controlled trials (Cancer Nurs 2021;44(6):E578–88)',
          zh: '穴位按壓緩解癌因性疲乏：隨機對照試驗的系統綜述與統合分析（Cancer Nurs 2021;44(6):E578–88）',
        },
        year: 2021,
        doi: '10.1097/NCC.0000000000000997',
        finding: {
          en: 'Fourteen randomised trials with 776 people with cancer: acupressure eased general, physical and mental fatigue compared with controls, whether given during or after chemotherapy.',
          zh: '十四項隨機對照試驗、共 776 名癌症患者：與對照組相比，穴位按壓能減輕整體、身體與精神上的疲乏，化療期間或之後皆然。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Chou HC et al.', zh: 'Chou HC 等' },
        title: {
          en: 'The effectiveness of acupressure in reducing cancer-related fatigue: a systematic review and meta-analysis (Hu Li Za Zhi 2022;69(4):75–87)',
          zh: '穴位指壓應用於緩解癌因性疲憊之效果：系統性文獻回顧及統合分析（護理雜誌 2022;69(4):75–87）',
        },
        year: 2022,
        doi: '10.6224/JN.202208_69(4).10',
        points: ['LI4', 'ST36', 'SP6'],
        finding: {
          en: 'Twelve studies with 960 people during or after cancer treatment: both body and ear acupressure reduced fatigue. The authors suggest pressing hegu, zusanli and sanyinjiao once a day for one to three minutes each.',
          zh: '十二項研究、共 960 名正接受或已完成癌症治療的患者：體穴與耳穴按壓都能減輕疲乏。作者建議每日按壓合谷、足三里與三陰交一次，每穴一至三分鐘。',
        },
      },
      {
        kind: 'rct',
        by: { en: 'Zick SM et al.', zh: 'Zick SM 等' },
        title: { en: 'JAMA Oncol 2016;2(11):1470–6', zh: 'JAMA Oncol 2016;2(11):1470–6' },
        year: 2016,
        doi: '10.1001/jamaoncol.2016.1867',
        points: ['GV20', 'CV6', 'LI4', 'ST36', 'SP6', 'KI3'],
        finding: {
          en: 'Breast cancer survivors with lingering fatigue pressed points themselves daily for six weeks; both a relaxing and a stimulating point set eased fatigue more than usual care. The stimulating set is listed here. The only side effect was mild bruising.',
          zh: '有持續疲乏的乳癌倖存者每天自行按壓、連續六週；「放鬆」與「提神」兩組穴位減輕疲乏的效果都勝過常規照護。此處列出的是提神組穴位。唯一的副作用是輕微瘀青。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Chang KM et al.', zh: 'Chang KM 等' },
        title: {
          en: 'Effectiveness of acupressure for fatigue alleviation in patients receiving hemodialysis: a systematic review and meta-analysis (J Nurs Res 2024;32(3):e334)',
          zh: '穴位按壓緩解血液透析患者疲乏的成效：系統綜述與統合分析（J Nurs Res 2024;32(3):e334）',
        },
        year: 2024,
        doi: '10.1097/JNR.0000000000000613',
        finding: {
          en: 'Eight randomised trials with 725 people on haemodialysis: acupressure eased general fatigue and its behavioural, emotional, sensory and cognitive sides. Adding the ear point Shenmen strengthened the effect; special equipment added nothing.',
          zh: '八項隨機對照試驗、共 725 名血液透析患者：穴位按壓能減輕整體疲乏，以及行為、情緒、感覺與認知各面向的疲乏。加入耳穴神門效果更強；特別器材則未見額外益處。',
        },
      },
    ],
  },
  {
    slug: 'labour-pain',
    summary: {
      en: 'A Chinese acupuncture textbook names hegu and sanyinjiao for hard, stalled labour, by needle. Trials and reviews of hand pressure in labour found pain may ease a little.',
      zh: '中醫教材以合谷、三陰交治療滯產，以針施治。分娩時以手按壓的試驗與綜述發現，疼痛或可稍減。',
    },
    chinese: [
      {
        kind: 'textbook',
        by: {
          en: 'Liu Guanjun (ed.), Guangming TCM Correspondence University',
          zh: '劉冠軍 主編，光明中醫函授大學',
        },
        title: {
          en: 'Acupuncture-Moxibustion, vol. 3 (Higher TCM Correspondence Textbooks): stalled labour',
          zh: '《針灸學》下冊（高等中醫函授教材）：滯產',
        },
        year: 1985,
        url: 'https://www.gmzyjx.com/books/zjx/zjx-zjx2.3-0.0.8.0.0/',
        points: ['LI4', 'SP6'],
        finding: {
          en: 'Treats stalled labour in two patterns. For qi stagnation with blood stasis, marked by severe belly and back pain and a tense, frightened mother, it names hegu, sanyinjiao and duyin; for weak qi and blood, zusanli, sanyinjiao, fuliu and zhiyin. All by needle, to move a slow birth along.',
          zh: '滯產分兩型：氣滯血瘀型腰腹劇痛、精神緊張，取合谷、三陰交、獨陰；氣血虛弱型取足三里、三陰交、復溜、至陰。均以針施治，目的在推動產程。',
        },
      },
      {
        kind: 'guideline',
        by: {
          en: 'China Maternal and Child Health Association, Midwives Branch',
          zh: '中國婦幼保健協會助產士分會',
        },
        title: {
          en: 'Clinical practice guideline for normal birth in China',
          zh: '《中國正常分娩臨床實踐指南》',
        },
        year: 2018,
        url: 'https://www.cmcha.org/detail/15264445802990710660.html',
        finding: {
          en: 'A midwifery guideline, not a Chinese-medicine text. For pain in the first stage it encourages non-drug methods, among them companionship, breathing, massage, warmth, water, nerve stimulation and acupuncture, with drugs or anaesthesia when needed. It names no points.',
          zh: '屬助產指南，並非中醫文獻。第一產程的疼痛，鼓勵採用陪伴、呼吸、按摩、熱敷、溫水淋浴或池浴、經皮神經電刺激、針灸等非藥物方法，必要時再用藥物或麻醉鎮痛。未指定穴位。',
        },
      },
    ],
    research: [
      {
        kind: 'cochrane',
        by: { en: 'Smith CA et al.', zh: 'Smith CA 等' },
        title: {
          en: 'Acupuncture or acupressure for pain management during labour',
          zh: '針灸或穴位按壓用於分娩疼痛管理',
        },
        year: 2020,
        doi: '10.1002/14651858.CD009232.pub2',
        finding: {
          en: 'Pooled 28 trials, 15 of them acupressure. Against sham pressing, the effect on pain was unclear, though fewer women had a caesarean. Against a combined control group, in two trials, it probably eased pain slightly.',
          zh: '匯總28項試驗，其中15項為穴位按壓。與假按壓相比，對疼痛的作用不明確，但剖腹產較少；與合併對照組相比（兩項試驗），大概可稍減疼痛。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Raana HN, Fan XN', zh: 'Raana HN、Fan XN' },
        title: {
          en: 'Complementary Therapies in Clinical Practice, 2020',
          zh: '《Complementary Therapies in Clinical Practice》，2020',
        },
        year: 2020,
        doi: '10.1016/j.ctcp.2020.101126',
        points: ['LI4', 'SP6'],
        finding: {
          en: 'Ten randomised trials of hand pressure in the first stage of labour; LI4 and SP6 were the points used most. Pain was lower than with placebo or no treatment in the active and transition phases.',
          zh: '納入十項第一產程穴位按壓的隨機試驗，最常用的穴位是合谷與三陰交。活躍期與過渡期的疼痛，低於安慰按壓或不處理。',
        },
      },
      {
        kind: 'systematic-review',
        by: { en: 'Deniz D et al.', zh: 'Deniz D 等' },
        title: { en: 'Explore, 2026', zh: '《Explore》，2026' },
        year: 2026,
        doi: '10.1016/j.explore.2026.103453',
        points: ['LI4'],
        finding: {
          en: 'Nine studies of LI4 pressing, from randomised and quasi-experimental designs. Pain was lower overall, most clearly in mid-labour, when pressure was applied during contractions, and with more sessions. Methods varied widely between studies.',
          zh: '納入九項按壓合谷的研究，設計包括隨機與類實驗研究。整體疼痛較輕，以產程中段、在宮縮時施壓及多次重複時最明顯。各研究方法差異大。',
        },
      },
    ],
  },
];

const evidence: readonly ConditionEvidence[] = EVIDENCE.map((input) => evidenceSchema.parse(input));

/**
 * What a condition's advice rests on, when it has been written up.
 * @param slug route identifier.
 * @returns the evidence for that condition, or undefined.
 */
export function evidenceBySlug(slug: string): ConditionEvidence | undefined {
  return evidence.find((entry) => entry.slug === slug);
}
