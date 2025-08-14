export interface FilterCategory {
  readonly id: string;
  readonly label: string;
}

export const filterData = {
  categories: [
    { id: 'discover', label: 'Discover' },
    { id: 'internal-tools', label: 'Internal Tools' },
    { id: 'website', label: 'Website' },
    { id: 'personal', label: 'Personal' },
    { id: 'consumer-app', label: 'Consumer App' },
    { id: 'b2b-app', label: 'B2B App' },
    { id: 'prototype', label: 'Prototype' }
  ]
} as const;
