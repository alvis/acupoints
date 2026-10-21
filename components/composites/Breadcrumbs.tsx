import Link from 'next/link';

import { FishTail } from '@/components/primitives/FishTail';
import { cn } from '@/utilities/cn';
import { isLocale } from '@/utilities/routes';

import type { ComponentPropsWithoutRef, FC } from 'react';

/** One step of the trail. */
export type Crumb = {
  href: string;
  label: string;
  /**
   * Han word set before the label (首, 經絡, 頭痛 …). Section roots get theirs
   * from the href when omitted; leaf crumbs show the label alone.
   */
  zh?: string;
};

/** Props for {@link Breadcrumbs}. */
export type BreadcrumbsProps = Omit<ComponentPropsWithoutRef<'nav'>, 'children'> &
  Required<Pick<ComponentPropsWithoutRef<'nav'>, 'aria-label'>> & {
    items: readonly Crumb[];
  };

/** Han word per section root, traditional then simplified. */
const SECTION_HAN: Partial<Record<string, readonly [string, string]>> = {
  '': ['首', '首'],
  'points': ['目錄', '目录'],
  'meridians': ['經絡', '经络'],
  'regions': ['部位', '部位'],
  'conditions': ['症', '症'],
  'protocols': ['方', '方'],
  'basics': ['基礎', '基础'],
  'glossary': ['詞彙', '词汇'],
  'journal': ['日誌', '日志'],
  'faq': ['問答', '问答'],
  'about': ['序', '序'],
  'changelog': ['刊記', '刊记'],
  'disclaimer': ['規約', '规约'],
  'privacy': ['規約', '规约'],
  'affiliate-disclosure': ['規約', '规约'],
  'seals': ['印譜', '印谱'],
  'search': ['檢索', '检索'],
};

const HAN = /\p{Script=Han}/u;

/**
 * Woodblock breadcrumb row: each crumb is a bold Han word plus its label,
 * separated by fish-tail (魚尾) marks. The Han word is decorative, so a
 * crumb's accessible name stays its label.
 * @param props the breadcrumb navigation.
 * @param props.items ordered entries to display.
 * @param props.className additional wrapper classes.
 */
export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className, ...rest }) => {
  return (
    <nav {...rest} className={cn('text-base text-ink', className)}>
      <ol
        className="
          m-0 flex list-none flex-wrap items-center gap-x-3.5 gap-y-1.5 p-0
        ">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          const zh = crumbHan(item);
          const content = (
            <>
              {zh ? (
                <span
                  aria-hidden="true"
                  className="tc mr-1.5 font-bold"
                  lang={hanLangOf(item.href)}>
                  {zh}
                </span>
              ) : null}
              {item.label}
            </>
          );

          return (
            <li className="flex items-center gap-x-3.5" key={item.href}>
              {last ? (
                <span aria-current="page">{content}</span>
              ) : (
                <Link className="wb-link" href={item.href}>
                  {content}
                </Link>
              )}
              {last ? null : <FishTail width={18} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Han word for a crumb: explicit, else the section root's, never a repeat of the label.
 * @param item the breadcrumb destination, visible label, and optional Han word.
 * @returns the explicit or inferred Han label, unless it duplicates the crumb text.
 */
function crumbHan(item: Crumb): string | undefined {
  const zh = item.zh ?? sectionHan(item.href, item.label);

  return zh && zh !== item.label ? zh : undefined;
}

/**
 * choose a decorative section label for a shallow route.
 * @param href linked destination.
 * @param label accessible or displayed reading.
 * @returns the route section's Han label, when the visible label needs one.
 */
function sectionHan(href: string, label: string): string | undefined {
  // a Chinese label already carries its Han; don't print a second one
  if (HAN.test(label)) {
    return undefined;
  }
  const [first = '', ...rest] = href.split('/').filter(Boolean);
  const segments = isLocale(first) ? rest : [first, ...rest].filter(Boolean);
  if (segments.length > 1) {
    return undefined;
  }
  const pair = SECTION_HAN[segments[0] ?? ''];
  if (!pair) {
    return undefined;
  }

  return first === 'zh-cn' ? pair[1] : pair[0];
}

/**
 * select the Han script tag from the route locale.
 * @param href linked destination.
 * @returns the simplified or traditional Chinese language tag for the route.
 */
function hanLangOf(href: string): string {
  return href.startsWith('/zh-cn') ? 'zh-Hans' : 'zh-Hant';
}
