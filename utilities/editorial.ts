import { SITE } from './routes';

import type { Organization, Person } from 'schema-dts';

/**
 * Single source of truth for editorial identities.
 * All schema.org Person/Organization references link here by `@id`.
 */

export const EDITORIAL_ID = `${SITE.url}/about#editorial`;
export const ORG_ID = `${SITE.url}#organization`;
export const SITE_ID = `${SITE.url}#website`;

export const editorialPerson: Person = {
  '@type': 'Person',
  '@id': EDITORIAL_ID,
  'name': 'Acupoints Editorial Team',
  'url': `${SITE.url}/about`,
  'jobTitle': 'Editorial reviewer',
  'worksFor': { '@id': ORG_ID },
  'knowsAbout': ['Traditional Chinese Medicine', 'Acupuncture', 'Acupressure', 'Meridian theory'],
  'description':
    'A small editorial team compiling openly licensed datasets, reviewing legacy records, and authoring the editorial layer under its published content policy.',
};

export const organization: Organization = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  'name': SITE.name,
  'url': SITE.url,
  'logo': `${SITE.url}/favicon.svg`,
  'description': SITE.description,
};
