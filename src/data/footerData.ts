export interface FooterLink {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly title?: string;
  readonly type?: 'button' | 'link';
}

export interface FooterSection {
  readonly id: string;
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export const footerData = {
  sections: [
    {
      id: 'company',
      title: 'Company',
      links: [
        { id: 'blog', label: 'Blog', href: '/blog' },
        { id: 'careers', label: 'Careers', href: '/careers' }
      ]
    },
    {
      id: 'product',
      title: 'Product',
      links: [
        { id: 'import-figma', label: 'Import from Figma', type: 'button' },
        { id: 'videos', label: 'Videos', href: '/videos' },
        { id: 'status', label: 'Status', href: "https://status.lovable.dev/" },
        { id: 'changelog', label: 'Changelog', href: "https://docs.lovable.dev/changelog" },
        { id: 'pricing', label: 'Pricing', href: '/pricing' },
        { id: 'student-discount', label: 'Student Discount', href: '/students' },
        { id: 'solutions', label: 'Solutions', href: '/solutions' },
        { id: 'hire-partner', label: 'Hire a Partner', href: '/partners' },
        { id: 'how-to', label: 'How-To Guides', href: '/how-to' },
        { id: 'become-partner', label: 'Become a Partner', href: '/partners/apply' }
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { id: 'launched', label: 'Launched', href: "https://launched.lovable.dev/" },
        { id: 'enterprise', label: 'Enterprise', href: "https://enterprise.lovable.dev/" },
        { id: 'learn', label: 'Learn', href: "https://docs.lovable.dev/" },
        { id: 'support', label: 'Support', href: '/support' },
        { id: 'integrations', label: 'Integrations', href: "https://docs.lovable.dev/integrations/introduction" },
        { id: 'affiliates', label: 'Affiliates', href: '/affiliates' },
        { id: 'press-media', label: 'Press & Media', href: '/brand' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
        { id: 'terms', label: 'Terms & Conditions', href: '/terms' },
        { id: 'abuse', label: 'Report Abuse', href: '/abuse' },
        { id: 'security', label: 'Report Security Concerns', href: '/security' },
        { id: 'do-not-sell', label: 'Do Not Sell or Share My Personal Information', href: '/do-not-sell-or-share-my-personal-information' },
        { id: 'trust-center', label: 'Trust Center', href: "https://trust.delve.co/lovable" }
      ]
    },
    {
      id: 'socials',
      title: 'Socials',
      links: [
        { id: 'twitter', label: 'X / Twitter', href: "https://twitter.com/lovable_dev", title: 'Follow on X' },
        { id: 'linkedin', label: 'LinkedIn', href: "https://www.linkedin.com/company/lovable-dev/", title: 'Follow on LinkedIn' },
        { id: 'discord', label: 'Discord', href: "https://discord.com/invite/lovable-dev", title: 'Join the Discord server' },
        { id: 'reddit', label: 'Reddit', href: "https://reddit.com/r/lovable", title: 'Join Lovable on Reddit' }
      ]
    }
  ]
} as const;
