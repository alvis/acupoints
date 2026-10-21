/**
 * Builds the seal book's volumes and leaves from the catalogue and hands
 * them to the client island, which reads this browser's own seals.
 */

import { pointByCode } from '@/content/points';
import { fill } from '@/features/points/format';
import { pointsText } from '@/features/points/labels';
import { hanNumber, sealGlyphs, VOLUMES, volumeLeaves } from '@/features/points/volumes';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localeToHtmlLang, localizedRoutes } from '@/utilities/routes';

import { SealBook } from './SealBook';
import { sealsMoreText } from './sealsCopy';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { SealLeaf, SealVolume } from './sealTypes';

/** Props for {@link SealsContainer}. */
export type SealsContainerProps = {
  locale: Locale;
};

/**
 * Server container for `/seals/`.
 * @param props reading locale for catalog names and book labels
 * @param props.locale edition used for labels and links
 * @returns the seal-book hero and client island with catalog-derived volumes and leaves
 */
export const SealsContainer: FC<SealsContainerProps> = ({ locale }) => {
  const r = localizedRoutes(locale);
  const text = pointsText(locale);
  const t = text.seals;
  const en = locale === 'en';
  const hanLang = en ? 'zh-Hant' : localeToHtmlLang(locale);

  const leaves: Record<string, SealLeaf> = {};
  const volumes: SealVolume[] = VOLUMES.map((v) => {
    const codes = volumeLeaves(v.slug).map((entry) => {
      // The registry spine owns identity: editorial records win collisions.
      const p = pointByCode(entry.code) ?? entry;
      const han = hanFor(p.hanzi, locale);
      leaves[p.code] = {
        code: p.code,
        name: p.name,
        han,
        glyphs: sealGlyphs(han),
        href: r.point(p.code),
        volume: v.slug,
      };

      return p.code;
    });

    return {
      slug: v.slug,
      number: fill(text.leaf.volumeHan, { n: hanNumber(v.order) }),
      han: hanFor(v.han, locale),
      name: en ? v.channel : hanFor(v.han, locale),
      glyph: hanFor(v.glyph, locale),
      href: r.meridian(v.slug),
      codes,
    };
  });
  const total = volumes.reduce((sum, v) => sum + v.codes.length, 0);

  return (
    <div
      className="
        mx-auto max-w-[1440px] px-4 pb-[72px]
        sm:px-8
        lg:px-20
      ">
      <SealBook
        bookHan={hanFor('印譜', locale)}
        hanLang={hanLang}
        indexHref={r.points}
        leaves={leaves}
        locale={locale}
        more={sealsMoreText(locale)}
        printerGlyphs={[hanFor('經', locale), hanFor('穴', locale)]}
        text={t}
        total={total}
        volumes={volumes}>
        <div
          className="
            flex flex-col gap-5
            sm:flex-row sm:items-end sm:gap-[34px]
          ">
          <span
            aria-hidden="true"
            className="
              tc text-[4.5rem] leading-[0.9] font-black
              sm:text-[7.5rem]
            "
            lang={hanLang}>
            {hanFor('印譜', locale)}
          </span>
          <div
            className="
              flex flex-col gap-2.5
              sm:pb-2
            ">
            <span className="cap">{t.kicker}</span>
            <h1
              className="
                m-0 text-[2.25rem] leading-none font-medium
                sm:text-[3.25rem]
              ">
              {t.title}
            </h1>
            <p className="m-0 text-[1.19rem] text-ink-soft">{t.intro}</p>
          </div>
        </div>
      </SealBook>
    </div>
  );
};
