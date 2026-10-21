# Classical acupoint catalogue — dataset and licensing notice

The 361 classical points in this directory are compiled from an openly
licensed Chinese-language dataset plus in-house English wording. Every entry
is zod-validated at module load (`cataloguePointSchema` in `../schemas.ts`);
a shape failure fails the build rather than shipping.

## Sources and licensing

1. **Point spine** — [`mac20777/aijiu-mpvue`](https://github.com/mac20777/aijiu-mpvue),
   file `complateXwInfo.json`, MIT License. Provides hanzi, pinyin, point class
   (`tedingxue`), location, and indications for each of the 361 points.
   Upstream copyright notice, retained per the MIT License:

   > Copyright (c) 2019 macheng macheng2025@gmail.com

2. **English wording and cautions** — authored in-house (2026) from the
   Chinese-language record above, following WHO _Standard Acupuncture Point
   Locations in the Western Pacific Region_ (2008) nomenclature conventions:
   region-first phrasing, cun measurements, standard English point names. The
   needling and moxibustion cautions (depth limits, structures to avoid,
   pregnancy restrictions, classical prohibitions) are written in the site's
   own words. Verbatim WHO text is not used and no WHO permission is required
   under this method.

## Normalization applied at compile time

- Meridian codes follow this site's convention: SJ and TE → TH (Triple
  Heater); liver channel coded LV to match existing editorial entries (`LV3`
  et al.).
- DU → GV, RN → CV.
- Point names are brought onto traditional characters (`hant-names.ts`) so
  every registry entry stores hanzi in one script, like the authored points;
  the /zh-cn tree derives the simplified form at render time.
- BG13 corrected to GB13.
- Yintang (EX-HN3) and other extra-meridian records are excluded: this
  catalogue covers exactly the 361 classical points of the fourteen meridians,
  matching `pointCounts` in `../meridians.ts`.

## Deliberate omissions

Fields that would require editorial judgment beyond the source record are left
empty on catalogue entries: no region classification, no condition mappings,
no generated FAQs or how-to-find steps, no `about` prose. Editorial entries in
`../points.ts` remain the only source for those features; both shapes coexist
in one registry via `AnyPoint`.

## Compilation

The per-meridian modules are compiled artifacts of a one-time offline build;
regeneration requires the upstream dataset and the authored translation layer
and is not part of the site build. Do not hand-edit the emitted arrays — fix
the upstream layer or the generator and recompile.
