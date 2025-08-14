export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const navigationData = {
  mainNav: [
    { id: 'community', label: 'Community', href: "https://discord.com/invite/lovable-dev" },
    { id: 'pricing', label: 'Pricing', href: '/pricing' },
    { id: 'enterprise', label: 'Enterprise', href: "https://enterprise.lovable.dev/" },
    { id: 'learn', label: 'Learn', href: "https://docs.lovable.dev/" },
    { id: 'launched', label: 'Launched', href: "https://launched.lovable.dev/" }
  ]
} as const;
