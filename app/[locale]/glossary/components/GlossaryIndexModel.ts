import type { Dispatch, SetStateAction, JSX } from 'react';

import type { GlossaryIndexTerm, GlossaryIndexLabels } from './GlossaryIndex';

/** selected dictionary entry, alphabet filter, labels, and selection actions. */
export type GlossaryIndexModel = {
  labels: GlossaryIndexLabels;
  letter: string | null;
  setLetter: Dispatch<SetStateAction<string | null>>;
  countIn: (ch: string) => number;
  pickLetter: (ch: string) => void;
  position: string;
  current: GlossaryIndexTerm;
  listCap: string;
  shown: Array<{ term: GlossaryIndexTerm; index: number }>;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  headwordLang: string | undefined;
  footer: JSX.Element;
  seeAlso: JSX.Element;
} | null;
