import type { BreathPacerText, Phase } from './BreathPacer';

/** breath progress, phase labels, and round controls */
export interface BreathPacerModel {
  progress: string;
  done: number;
  breaths: number;
  phase: Phase;
  running: boolean;
  text: BreathPacerText;
  showHan: boolean;
  hanLang: string;
  cue: string;
  stop: () => void;
  start: () => void;
}
