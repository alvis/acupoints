/** Server-only file access for the build-time prose registry. */
import jetpack from 'fs-jetpack';

import { fail } from './localeFiles';

/**
 * reads authored text while keeping missing files a hard build failure.
 * @param file authored document path.
 * @returns the unchanged UTF-8 document.
 */
export function readProseFile(file: string): string {
  const text = jetpack.read(file, 'utf8');
  if (text === undefined) {
    fail(file, 'prose file missing.');
  }

  return text;
}
