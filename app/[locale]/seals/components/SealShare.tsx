'use client';

import { useState } from 'react';

import { useSeals } from '@/components/headless/useSeals';
import { drawSealBook, SEAL_BOOK_WIDTH, sealBookHeight } from '@/utilities/seals/drawSealBook';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';
import type { SealBookInk, SealBookPage } from '@/utilities/seals/drawSealBook';

import type { SealShareText } from './sealsCopy';

const DOWNLOAD_RELEASE_DELAY_MS = 1000;

/** Props for {@link SealShare}. */
export type SealShareProps = {
  locale: Locale;
  text: SealShareText;
  /** BCP-47 tag the printed date is written in. */
  dateLocale: string;
  /** The page as it stands now, all but its printed date. */
  page: Omit<SealBookPage, 'printed'>;
};

type ShareState = 'idle' | 'working' | 'saved' | 'failed';

/** Device pixels per CSS pixel in the saved image, for a crisp print. */
const SCALE = 2;

/**
 * "Share a page of your book": draws the seal book as a printed sheet on a
 * canvas in the site's paper, ink, cinnabar and faces, and saves it as a
 * PNG. Everything happens in this browser; nothing is uploaded.
 * @param props printed page, export labels, and date-formatting locale
 * @param props.locale edition used for labels and links
 * @param props.text localized export-button, progress, and download labels
 * @param props.dateLocale BCP 47 tag used to format the printed date
 * @param props.page seal book page to print
 */
export const SealShare: FC<SealShareProps> = ({ locale, text, dateLocale, page }) => {
  const { today, ready } = useSeals();
  const [state, setState] = useState<ShareState>('idle');
  const [file, setFile] = useState('');

  const save = async (): Promise<void> => {
    setState('working');
    const name = `${text.fileStem}-${today}.png`;
    try {
      const printed = text.printed.replace(
        '{date}',
        new Intl.DateTimeFormat(dateLocale, { dateStyle: 'long' }).format(new Date()),
      );
      const blob = await printSealBook({ ...page, printed }, readInk(locale));
      downloadBlob(blob, name);
      setFile(name);
      setState('saved');
    } catch {
      setState('failed');
    }
  };

  const status =
    state === 'working'
      ? text.working
      : state === 'saved'
        ? text.saved.replace('{file}', file)
        : state === 'failed'
          ? text.failed
          : '';

  return (
    <section aria-labelledby="seals-share" className="
      r1 flex flex-col gap-2 px-5 py-[18px]
    ">
      <h2 className="m-0 text-lg font-semibold" id="seals-share">
        {text.title}
      </h2>
      <p className="m-0 text-[0.95rem] leading-[1.45] text-ink-soft">{text.body}</p>
      <button
        className="
          btn btn-secondary mt-1 cursor-pointer self-start border-0
          disabled:cursor-not-allowed disabled:opacity-60
        "
        disabled={!ready || state === 'working'}
        type="button"
        onClick={() => void save()}>
        {text.action}
      </button>
      <p className="m-0 min-h-5 text-[0.95rem]" role="status">
        {status}
      </p>
    </section>
  );
};

/**
 * The site's tokens as the canvas needs them, read from the page's own styles.
 * @param locale edition used for labels and links
 * @returns the paper, ink, cinnabar, and font settings used to draw the book
 */
function readInk(locale: Locale): SealBookInk {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string): string =>
    style.getPropertyValue(name).trim() || fallback;
  // Han on English and Traditional pages is Traditional; zh-cn prints Simplified.
  const han = token(locale === 'zh-cn' ? '--font-han-sc' : '--font-han-tc', 'serif');

  return {
    paper: token('--color-paper', '#ede3cc'),
    ink: token('--color-ink', '#1d1a16'),
    inkSoft: token('--color-ink-soft', '#3a2f22'),
    inkMicro: token('--color-ink-micro', '#5a4a36'),
    cinnabar: token('--color-cinnabar', '#c23b22'),
    hanFont: `${han}, serif`,
    textFont: token('--font-display', 'Georgia, serif'),
    monoFont: token('--font-mono', 'monospace'),
  };
}

/**
 * Load the faces the page uses, draw it at print scale and encode a PNG.
 * @param page seal book page to print
 * @param ink colors and fonts read from the page
 * @returns the printed seal-book page encoded as a PNG blob
 */
async function printSealBook(page: SealBookPage, ink: SealBookInk): Promise<Blob> {
  const sample = [
    page.han,
    page.title,
    page.summary,
    page.brand,
    page.printed,
    page.completeGlyph,
    page.volumeSeals.han,
    page.volumeSeals.label,
    ...page.printerGlyphs,
    ...page.volumes.map((v) => `${v.number}${v.han}${v.glyph}`),
    '0123456789/',
  ].join('');
  const faces = [
    `900 104px ${ink.hanFont}`,
    `700 21px ${ink.hanFont}`,
    `15px ${ink.hanFont}`,
    `500 44px ${ink.textFont}`,
    `20px ${ink.textFont}`,
    `12px ${ink.monoFont}`,
  ];
  // A face that will not load still leaves the stack's fallbacks to print with.
  await Promise.allSettled(faces.map(async (face) => document.fonts.load(face, sample)));

  const height = sealBookHeight(page);
  const canvas = document.createElement('canvas');
  canvas.width = SEAL_BOOK_WIDTH * SCALE;
  canvas.height = height * SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('canvas 2d context unavailable');
  }
  ctx.scale(SCALE, SCALE);
  drawSealBook(ctx, page, ink);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('canvas encoding failed'))),
      'image/png',
    );
  });
}

/**
 * Hand the image to the browser as a download; the object URL never leaves the page.
 * @param blob encoded image bytes
 * @param name download filename
 */
function downloadBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
  // Give the browser a moment to start the download before freeing the bytes.
  window.setTimeout(() => URL.revokeObjectURL(url), DOWNLOAD_RELEASE_DELAY_MS);
}
