'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SealsBadge } from '@/components/composites/SealsBadge';
import { DoubleRule } from '@/components/primitives/DoubleRule';
import { cn } from '@/utilities/cn';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { localizedRoutes, stripLocale } from '@/utilities/routes';

import { HeaderBrand } from './HeaderBrand';
import { HeaderNavigation } from './HeaderNavigation';
import { LanguageMenu } from './LanguageMenu';
import { SearchCommand } from './SearchCommand';
import { SiteMenu } from './SiteMenu';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { SectionKey, SectionLink } from './SectionLabel';

/** Props for {@link SiteHeader}. */
export type SiteHeaderProps = {
  locale: Locale;
};

/** Which skeleton paths light up each section. */
const SECTION_PREFIXES: Record<SectionKey, readonly string[]> = {
  points: ['/points'],
  channels: ['/meridians'],
  regions: ['/regions'],
  conditions: ['/conditions', '/protocols'],
  learn: ['/basics', '/glossary', '/journal'],
};

/** A point leaf (`/points/li4/`), whose phone layout carries its own compact header. */
const LEAF_PATH = /^\/points\/[^/]+\/?$/u;

/**
 * The masthead: seal and wordmark, the five sections, search (⌘K), My seals
 * with its live count, and the 文A language menu — in the same place on every
 * page. Below `lg` the sections, search and language fold into one menu that
 * opens with the language choice first. Below `md` a point leaf hides it for
 * the leaf's own compact header (← volume · leaf · search).
 * @param props edition used to build masthead links and labels
 * @param props.locale edition used for labels and links
 * @returns the masthead with section navigation, search, seals, and language controls
 */
export const SiteHeader: FC<SiteHeaderProps> = ({ locale }) => {
  const chrome = getDictionary(locale).chrome;
  const r = localizedRoutes(locale);
  const pathname = usePathname() as string | null;
  const bare = stripLocale(pathname ?? '/');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sections: readonly SectionLink[] = [
    { key: 'points', href: r.points },
    { key: 'channels', href: r.meridians },
    { key: 'regions', href: r.regions },
    { key: 'conditions', href: r.conditions },
    { key: 'learn', href: r.basics },
  ];
  const active = sections.find(({ key }) =>
    SECTION_PREFIXES[key].some((p) => bare === p || bare.startsWith(`${p}/`)),
  )?.key;
  const sealsCurrent = bare === '/seals' || bare.startsWith('/seals/');
  const onLeaf = LEAF_PATH.test(bare);

  // Global hotkeys: Cmd/Ctrl+K and "/" open search.
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const target = e.target instanceof HTMLElement ? e.target : null;
      const inField =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') ||
        (e.key === '/' && !inField)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close the folded menu on navigation (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          `
            relative z-40 mx-auto w-full max-w-[1440px] px-4
            sm:px-8
            lg:px-20
          `,
          onLeaf && 'max-md:hidden',
        )}>
        <div
          className="
            flex items-center gap-4 pt-5 pb-4
            lg:pt-[26px] lg:pb-[18px]
          ">
          <HeaderBrand locale={locale} />

          <HeaderNavigation {...{ locale, sections, active, setSearchOpen }} />
          <SealsBadge current={sealsCurrent} href={r.seals} locale={locale} />

          <LanguageMenu
            className="
              hidden
              lg:block
            "
            current={locale}
          />

          <button
            aria-controls="wb-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? chrome.menuClose : chrome.menuOpen}
            className={cn(
              `
                flex size-10 cursor-pointer items-center justify-center border-0
                shadow-rest
                lg:hidden
              `,
              menuOpen ? 'bg-ink text-paper' : 'bg-transparent text-ink',
            )}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}>
            <MenuGlyph open={menuOpen} />
          </button>
        </div>
        <DoubleRule />

        {menuOpen ? (
          <SiteMenu
            active={active}
            id="wb-menu"
            locale={locale}
            sealsCurrent={sealsCurrent}
            sections={sections}
            onSearch={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          />
        ) : null}
      </header>

      <SearchCommand locale={locale} open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

type MenuGlyphProps = {
  open: boolean;
};

const MenuGlyph: FC<MenuGlyphProps> = ({ open }) => {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20">
      {open ? (
        <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.8" />
      ) : (
        <path d="M3 5 H17 M3 10 H17 M3 15 H17" stroke="currentColor" strokeWidth="1.8" />
      )}
    </svg>
  );
};
