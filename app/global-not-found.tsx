import '@fontsource-variable/eb-garamond/wght-italic.css';
import '@fontsource-variable/eb-garamond/wght.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource-variable/noto-serif-sc/wght.css';
import '@fontsource-variable/noto-serif-tc/wght.css';
import './globals.css';

import { NotFoundContainer } from './[locale]/components/NotFoundContainer';
import { RouteLocaleChrome } from './[locale]/components/RouteLocaleChrome';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'This leaf is missing · Acupoints',
  robots: { index: false },
};

/**
 * Full-document fallback for URLs that match no route, which is the page a
 * static host serves for every unknown path. No route params exist here, so
 * the chrome and the missing leaf (board Wb404) read the locale from the URL.
 */
const GlobalNotFound = (): React.JSX.Element => {
  return (
    <html lang="en">
      <body className="paper-grain" id="top">
        <RouteLocaleChrome>
          <NotFoundContainer />
        </RouteLocaleChrome>
      </body>
    </html>
  );
};

export default GlobalNotFound;
