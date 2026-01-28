export const STEPS = [
  { label: 'Business Info', date: '2026-01-15' },
  { label: 'Verification', date: '2026-01-16' },
  { label: 'Bank Setup', date: '2026-01-17' },
  { label: 'Operations', date: '2026-01-18' },
  { label: 'Approval', date: '2026-01-19' },
] as const;

export const DOCUMENTS = [
  {
    name: 'CAC Business Registration',
    desc: 'Business License',
    verified: true,
  },
  {
    name: 'NAFDAC Food Safety Certificate',
    desc: 'Food Safety Certificate',
    verified: false,
  },
  {
    name: 'Tax Identification Number',
    desc: 'Tax ID',
    verified: false,
  },
  {
    name: 'Business Premises Photo',
    desc: 'Premises Photo',
    verified: false,
  },
] as const;
