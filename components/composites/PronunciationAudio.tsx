import type { FC } from 'react';
/** Props for {@link PronunciationAudio}. */
export type PronunciationAudioProps = {
  pinyin: string;
  src?: string;
};

/**
 * Native <audio>, no JS, under a mono caps "音 · Pronunciation" caption.
 * Renders only when src is provided — graceful if missing.
 * @param props the pronunciation player.
 * @param props.pinyin romanized pronunciation.
 * @param props.src audio resource URL.
 * @returns the pronunciation caption and audio player, or nothing without a source.
 */
export const PronunciationAudio: FC<PronunciationAudioProps> = ({ pinyin, src }) => {
  if (!src) {
    return null;
  }

  return (
    <figure className="m-0 flex flex-wrap items-center gap-3">
      <audio controls className="h-8" preload="none" src={src}>
        <track kind="captions" />
      </audio>
      <figcaption className="cap">
        <span aria-hidden="true" className="tc mr-1.5 font-bold">
          音
        </span>
        Pronunciation ·{' '}
        <em
          className="
            font-display text-[0.95rem] tracking-normal text-ink normal-case
          ">
          {pinyin}
        </em>
      </figcaption>
    </figure>
  );
};
