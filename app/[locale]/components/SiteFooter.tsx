import { LiveSealCount } from '@/components/composites/LiveSealCount';
import { Stamp } from '@/components/primitives/Stamp';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes } from '@/utilities/routes';

import { FooterColophon } from './FooterColophon';
import { FooterCredits } from './FooterCredits';
import { FooterEdition } from './FooterEdition';
import { LinkColumn, MountStrip, Roller } from './FooterFrame';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link SiteFooter}. */
export type SiteFooterProps = {
  locale: Locale;
};

export interface FooterLink {
  href: string;
  label: string;
}

/**
 * Scroll end (卷終): the footer as the closing length of a hanging scroll —
 * mounting strips top and bottom, a wooden roller on the trailing edge, four
 * columns each closed by a stamp that speaks for it, and the language choice
 * repeated where a reader who reached the end will look for it.
 * @param props edition used to build the closing navigation and colophon
 * @param props.locale edition used for labels and links
 */
export const SiteFooter: FC<SiteFooterProps> = ({ locale }) => {
  const chrome = getDictionary(locale).chrome;
  const f = chrome.footer;
  const r = localizedRoutes(locale);
  const zh = locale !== 'en';

  const read: FooterLink[] = [
    { href: r.points, label: f.links.index },
    { href: r.meridians, label: f.links.channels },
    { href: r.conditions, label: f.links.conditions },
    { href: r.seals, label: f.links.seals },
    { href: r.glossary, label: f.links.glossary },
  ];
  const about: FooterLink[] = [
    { href: r.basics, label: f.links.howToRead },
    { href: r.about, label: f.links.sources },
    { href: r.faq, label: f.links.faq },
    { href: r.journal, label: f.links.journal },
    { href: r.changelog, label: f.links.changelog },
  ];

  return (
    <footer
      className="
        relative mx-auto mt-20 w-full max-w-[1440px] py-9
        lg:mt-28
      ">
      <div
        className="
          flex flex-col
          lg:flex-row lg:pr-[60px]
        ">
        <div className="my-3.5 flex min-w-0 flex-1 flex-col bg-paper">
          <MountStrip edge="top" />

          <div
            className="
              flex flex-col px-4
              sm:px-8
              lg:flex-row lg:pr-0 lg:pl-[72px]
            ">
            <FooterEdition locale={locale} />

            <LinkColumn
              caption={<LiveSealCount template={f.stamps.read} />}
              han={f.han.read}
              id="ft-read"
              links={read}
              stamp={
                <Stamp
                  solid
                  bottom={f.seals.read.bottom}
                  label={f.seals.read.label}
                  rotate={3}
                  top={f.seals.read.top}
                />
              }
              title={f.read}
              zh={zh}
            />
            <LinkColumn
              caption={f.stamps.checked}
              han={f.han.about}
              id="ft-about"
              links={about}
              stamp={
                <Stamp
                  bottom={f.seals.checked.bottom}
                  label={f.seals.checked.label}
                  rotate={-2}
                  top={f.seals.checked.top}
                />
              }
              title={f.about}
              zh={zh}
            />

            <FooterColophon locale={locale} />
          </div>

          <FooterCredits locale={locale} />

          <MountStrip edge="bottom" />
        </div>

        <Roller />
      </div>
    </footer>
  );
};
