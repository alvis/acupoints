import matter from 'gray-matter';

import type { EditorialArm } from '@/content/editorial/schema';

const PROSE_ERROR_PREVIEW_LENGTH = 40;

/** Frontmatter schema id stamped into every prose markdown file. */
const PROSE_SCHEMA_ID = 'acupoints-prose-v1';

// --- body grammar -----------------------------------------------------------

interface ParsedSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

/** Summary plus sections recovered from a locale file's body. */
interface ParsedBody {
  summary: string;
  sections: ParsedSection[];
}

const HEADING_LINE = /^## (.+) \{#([a-z0-9-]+)\}$/u;

/**
 * raise a content error with its source label.
 * @param label source document named in error messages.
 * @param message failure details.
 */
export function fail(label: string, message: string): never {
  throw new Error(`[prose-loader] ${label}: ${message}`);
}

/**
 * divide Markdown prose into the lead and headed sections.
 * @param body Markdown prose after frontmatter.
 * @param label source document named in error messages.
 * @returns the lead summary and the headed sections.
 */
function parseBody(body: string, label: string): ParsedBody {
  // gray-matter keeps the blank line that separates the closing delimiter
  // from the body; drop it so the summary block starts byte-exact.
  const normalized = body.replace(/^\n+/u, '').replace(/(?<!\n)\n+$/u, '');
  const blocks = normalized.split(/\n{2,}/u);
  if (!blocks[0] || blocks[0].startsWith('## ') || blocks.length < 2) {
    fail(label, 'body must open with a summary paragraph followed by anchored sections.');
  }
  const summary = blocks[0];
  const sections: ParsedSection[] = [];
  let current: ParsedSection | undefined;
  for (const block of blocks.slice(1)) {
    if (block.includes('\n')) {
      fail(label, 'paragraph blocks must be single lines (emission grammar).');
    }
    const heading = HEADING_LINE.exec(block);
    if (heading) {
      current = { id: heading[2], heading: heading[1], paragraphs: [] };
      sections.push(current);
      continue;
    }
    if (!current) {
      fail(
        label,
        `prose block outside any section: "${block.slice(0, PROSE_ERROR_PREVIEW_LENGTH)}…".`,
      );
    }
    current.paragraphs.push(block);
  }
  if (sections.length === 0) {
    fail(label, 'body has no anchored sections.');
  }
  for (const section of sections) {
    if (section.paragraphs.length === 0) {
      fail(label, `section ${section.id} has no paragraphs.`);
    }
  }

  return { summary, sections };
}

// --- locale files -----------------------------------------------------------

interface LocaleDoc {
  title?: string;
  faqs: Array<{ q: string; a: string }>;
  selfCareLimits: string;
  body: ParsedBody;
}

/**
 * read frontmatter and prose for the expected language.
 * @param raw file text, frontmatter included.
 * @param expectedLocale required language identifier.
 * @param label source document named in error messages.
 * @returns the frontmatter data and the parsed prose body.
 */
export function parseLocaleFile(raw: string, expectedLocale: string, label: string): LocaleDoc {
  const doc = matter(raw);
  const data = doc.data as Record<string, unknown>;
  if (data.schema !== PROSE_SCHEMA_ID) {
    fail(label, `frontmatter schema must be "${PROSE_SCHEMA_ID}" (got ${String(data.schema)}).`);
  }
  if (data.locale !== expectedLocale) {
    fail(label, `frontmatter locale must be "${expectedLocale}" (got ${String(data.locale)}).`);
  }
  if (!Array.isArray(data.faqs)) {
    fail(label, 'frontmatter faqs missing.');
  }
  for (const faq of data.faqs) {
    const entry = faq as Record<string, unknown>;
    if (typeof entry.q !== 'string' || typeof entry.a !== 'string') {
      fail(label, 'every faq needs string q and a.');
    }
  }
  if (typeof data.selfCareLimits !== 'string') {
    fail(label, 'frontmatter selfCareLimits missing.');
  }

  return {
    title: data.title === undefined ? undefined : frontmatterText(data.title, label, 'title'),
    faqs: (data.faqs as Array<{ q: string; a: string }>).map((faq) => ({ q: faq.q, a: faq.a })),
    selfCareLimits: data.selfCareLimits,
    body: parseBody(doc.content, label),
  };
}

/**
 * adapt a parsed locale document to an editorial arm.
 * @param doc parsed language document.
 * @returns the summary and sections as an editorial arm.
 */
export function armFrom(doc: LocaleDoc): EditorialArm {
  return {
    summary: doc.body.summary,
    sections: doc.body.sections,
    faqs: doc.faqs,
    selfCareLimits: doc.selfCareLimits,
  };
}

/**
 * convert a frontmatter date to its calendar representation.
 * @param value raw frontmatter value.
 * @param label source document named in error messages.
 * @param field frontmatter key being read.
 * @returns the parsed date, or undefined when the field is absent.
 */
export function revivedDate(value: unknown, label: string, field: string): Date | undefined {
  if (value === undefined) {
    return undefined;
  }
  const date = new Date(frontmatterText(value, label, field));
  if (Number.isNaN(date.getTime())) {
    fail(label, `${field} is not an ISO date.`);
  }

  return date;
}

// --- reconstruction ---------------------------------------------------------

interface SafeParseLike<T> {
  safeParse(value: unknown): { success: true; data: T } | { success: false; error: unknown };
}

/**
 * validate a content value and attach its source on failure.
 * @param schema validator for the expected result.
 * @param value decoded content to validate.
 * @param label source document named in error messages.
 * @returns the value as the schema parsed it.
 */
export function parseWith<T>(schema: SafeParseLike<T>, value: unknown, label: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const detail =
      result.error instanceof Error ? result.error.message : JSON.stringify(result.error);
    fail(label, `reconstructed module failed registry validation: ${detail}`);
  }

  return result.data;
}

/**
 * narrows frontmatter scalars before preserving their string representation.
 * @param value decoded frontmatter value.
 * @param label source document label.
 * @param field frontmatter key being read.
 * @returns the scalar's existing string representation.
 */
function frontmatterText(value: unknown, label: string, field: string): string {
  if (value === null || typeof value !== 'object') {
    return String(value);
  }
  if (value instanceof Date) {
    return String(value);
  }

  return fail(label, `${field} must be a scalar or date.`);
}
