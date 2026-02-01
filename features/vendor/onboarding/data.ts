export const STEPS = [
  'Business Info',
  'Contact Info',
  'Location Info',
  'Bank Info',
  'Documents',
] as const;


export type Step = typeof STEPS[number];