import type { PropsWithChildren } from 'react';

/**
 * Route group for the trust pages (about, privacy, disclaimer, affiliate
 * disclosure). Each page now draws its own Woodblock frame: About its
 * colophon spread, the three policies the shared 規約 sheet, so the group
 * layout adds nothing around them. Their quiet cadence comes from
 * `LEGAL_PATHS` in the site chrome.
 * @param props trust-page content to pass through without a wrapper
 * @param props.children content rendered inside this frame
 * @returns the trust page’s children without an additional wrapper
 */
const LegalLayout = async ({ children }: Readonly<PropsWithChildren>): Promise<React.ReactNode> => {
  return children;
};

export default LegalLayout;
