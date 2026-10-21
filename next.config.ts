import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: {
    root: import.meta.dirname,
  },
  // The bare domain is served by public/index.html (locale gate) in the
  // export; `next dev` does not map `/` to it, so forward there in dev only.
  // Redirects are not part of a static export, hence the guard.
  ...(process.env.NODE_ENV === 'development'
    ? {
        /**
         * forward the bare root to the exported locale gate during local development.
         * @returns the single temporary redirect from `/` to `/index.html`
         */
        async redirects() {
          return [{ source: '/', destination: '/index.html', permanent: false }];
        },
      }
    : {}),
};

export default nextConfig;
