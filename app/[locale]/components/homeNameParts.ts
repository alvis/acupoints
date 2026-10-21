/**
 * reads the terminal ASCII digits without retrying every possible starting digit.
 * @param text label or point code to inspect
 * @returns the terminal number, or an empty string when none is present
 */
export function trailingDigits(text: string): string {
  let start = text.length;
  while (start > 0 && text[start - 1] >= '0' && text[start - 1] <= '9') {
    start -= 1;
  }

  return text.slice(start);
}

/**
 * removes a trailing parenthetical annotation and its preceding whitespace.
 * @param text registry channel name
 * @returns the channel name without its terminal annotation
 */
export function withoutParenthetical(text: string): string {
  if (!text.endsWith(')')) {
    return text;
  }
  // A dot in the original expression cannot cross a line terminator.
  const lastLineBreak = Math.max(
    text.lastIndexOf('\n'),
    text.lastIndexOf('\r'),
    text.lastIndexOf('\u2028'),
    text.lastIndexOf('\u2029'),
  );
  const opening = text.indexOf('(', lastLineBreak + 1);
  if (opening === -1) {
    return text;
  }

  return text.slice(0, opening).trimEnd();
}
