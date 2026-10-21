/**
 * Points that sit on the back of the hand or at the fingertips, placed on
 * the enlarged hand of the leaf board (`HAND_BACK`, viewBox 28 16 220 384:
 * the back of the right hand, thumb out to the left, index finger x 114–141,
 * middle 146–176, ring 181–208, little 213–237, finger knuckles near y 220,
 * wrist crease near y 380). Points on the palm or the inner wrist are not
 * listed: this drawing cannot show them.
 */
export const HAND_BACK_POINTS: Readonly<
  Record<string, { readonly x: number; readonly y: number }>
> = {
  // thumb, radial corner of the nail
  LU11: { x: 40, y: 198 },
  // index finger, radial side: nail corner, before and behind the knuckle
  LI1: { x: 116, y: 66 },
  LI2: { x: 115, y: 204 },
  LI3: { x: 116, y: 232 },
  // on the mound between thumb and index finger, as the board marks it
  LI4: { x: 118, y: 258 },
  // the hollow at the radial end of the wrist crease
  LI5: { x: 109, y: 368 },
  // middle fingertip
  PC9: { x: 161, y: 28 },
  // ring finger, ulnar corner of the nail
  TH1: { x: 206, y: 62 },
  // between ring and little finger, behind the web
  TH2: { x: 211, y: 196 },
  // between the fourth and fifth hand bones, behind the knuckles
  TH3: { x: 212, y: 234 },
  // back of the wrist crease, in the hollow beside the tendons
  TH4: { x: 184, y: 376 },
  // little finger: radial and ulnar corners of the nail
  HT9: { x: 215, y: 102 },
  SI1: { x: 235, y: 102 },
  // ulnar edge of the hand, before and behind the little-finger knuckle
  SI2: { x: 237, y: 204 },
  SI3: { x: 236, y: 232 },
  // ulnar edge, between the hand bone and the wrist bones
  SI4: { x: 219, y: 310 },
  // ulnar end of the wrist crease
  SI5: { x: 211, y: 372 },
};
