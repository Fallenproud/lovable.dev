import { Project } from '../types/projectTypes';

const CATEGORY_STYLES = {
  website: "text-orange-900 text-xs font-medium bg-amber-100 box-border block leading-[18px] text-nowrap mr-2 px-2 py-0.5 rounded-md",
  consumerApp: "text-rose-800 text-xs font-medium bg-pink-200 box-border block leading-[18px] text-nowrap mr-2 px-2 py-0.5 rounded-md", 
  prototype: "text-orange-900 text-xs font-medium bg-orange-100 box-border block leading-[18px] text-nowrap mr-2 px-2 py-0.5 rounded-md",
  internalTools: "text-blue-800 text-xs font-medium bg-blue-100 box-border block leading-[18px] text-nowrap mr-2 px-2 py-0.5 rounded-md"
} as const;

export const projectsData = {
  projects: [
    {
      id: '35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727',
      title: 'pulse-robot-template',
      href: '/projects/35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727',
      imageSrc: '/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fgpt-engineer-screenshots%2Fid-preview-411579c6--35d72d2e-6e25-40e5-9b0c-c0d1a7c1b727.lovable.app-1741697099333.png&w=3840&q=75',
      imageAlt: 'Screenshot of pulse-robot-template',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocL01_bk7WFAyWmMnelPHjXvSQfLmloLh4N8TnqB3Wwpmr6_9PLQ=s96-c.jpg" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 24949
    },
    {
      id: 'ad6b25f3-65b0-4cdc-978f-72d1735712c6',
      title: 'cryptocurrency-trading-dashboard',
      href: '/projects/ad6b25f3-65b0-4cdc-978f-72d1735712c6',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/14.png",
      imageAlt: 'Screenshot of cryptocurrency-trading-dashboard',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/2.jpg" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 14918
    },
    {
      id: 'ec1d4f1e-2506-4da5-a91b-34afa90cceb6',
      title: 'wrlds-ai-integration',
      href: '/projects/ec1d4f1e-2506-4da5-a91b-34afa90cceb6',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/16.png",
      imageAlt: 'Screenshot of wrlds-ai-integration',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJJWe9toj03NxOLPeGeLm3Py25i-oce5SLkzO6baUDlFQbslm0izA=s96-c.jpg" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 9181
    },
    {
      id: '92dc0c12-c831-4ed8-9ab7-0f875920f45d',
      title: 'crypto-trade-template',
      href: '/projects/92dc0c12-c831-4ed8-9ab7-0f875920f45d',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/23.png",
      imageAlt: 'Screenshot of crypto-trade-template',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocL01_bk7WFAyWmMnelPHjXvSQfLmloLh4N8TnqB3Wwpmr6_9PLQ=s96-c.jpg" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 8226
    },
    {
      id: '96f629c9-6031-4f68-8bd0-680a3c64b6e3',
      title: 'modern-seaside-stay',
      href: '/projects/96f629c9-6031-4f68-8bd0-680a3c64b6e3',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/25.png",
      imageAlt: 'Screenshot of modern-seaside-stay',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocIKJ9Agb1Wp0dj3XtkPkERmBskWljk0WbxHEgx-bYPale2SPHI=s96-c.jpg" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 7941
    },
    {
      id: 'fafe259a-ff46-45f0-812e-1c598bf4b505',
      title: 'characterforge-imagix',
      href: '/projects/fafe259a-ff46-45f0-812e-1c598bf4b505',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/22.png",
      imageAlt: 'Screenshot of characterforge-imagix',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJpJO1uPKe-337VYj8SKTvqWLr9aBFq4PFg5lTZUqJ_yFlPrTw=s96-c.png" },
      category: { label: 'Consumer App', className: CATEGORY_STYLES.consumerApp },
      remixes: 6345
    },
    {
      id: '721b7097-37cd-4dc4-8946-0910b3ea8bc7',
      title: 'agri-dom',
      href: '/projects/721b7097-37cd-4dc4-8946-0910b3ea8bc7',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/20.png",
      imageAlt: 'Screenshot of agri-dom',
      avatar: { type: 'letter-a' as const, letter: 'A' },
      category: { label: 'Prototype', className: CATEGORY_STYLES.prototype },
      remixes: 6240
    },
    {
      id: '1340b42f-5412-43e0-b239-b5fdabd2feb7',
      title: 'billify-generator',
      href: '/projects/1340b42f-5412-43e0-b239-b5fdabd2feb7',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/15.png",
      imageAlt: 'Screenshot of billify-generator',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJuYf8Gsr2gPJt2Dt4ME_ch2y_s6fI1iNrQUq_vBPcXQKQcr9rk=s96-c.png" },
      category: { label: 'Internal Tools', className: CATEGORY_STYLES.internalTools },
      remixes: 5822
    },
    {
      id: 'a8baea9a-97ae-4008-b023-5de63357c0e2',
      title: 'market-mosaic-online',
      href: '/projects/a8baea9a-97ae-4008-b023-5de63357c0e2',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/12.png",
      imageAlt: 'Screenshot of market-mosaic-online',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJtSK28BSKLob_-hUU6g-RBBDHTZPyVlu2nOklREKAeb-Cdqh_L=s96-c.jpg" },
      category: { label: 'Consumer App', className: CATEGORY_STYLES.consumerApp },
      remixes: 5744
    },
    {
      id: '84322c50-98b7-4990-ba4e-2545accf5d91',
      title: 'landing-simulator-sorcery',
      href: '/projects/84322c50-98b7-4990-ba4e-2545accf5d91',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/13.png",
      imageAlt: 'Screenshot of landing-simulator-sorcery',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJpJO1uPKe-337VYj8SKTvqWLr9aBFq4PFg5lTZUqJ_yFlPrTw=s96-c.png" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 4822
    },
    {
      id: '513db1a2-0fcc-4643-bd43-f10d076dfa80',
      title: 'cortex-second-brain',
      href: '/projects/513db1a2-0fcc-4643-bd43-f10d076dfa80',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/24.png",
      imageAlt: 'Screenshot of cortex-second-brain',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJpJO1uPKe-337VYj8SKTvqWLr9aBFq4PFg5lTZUqJ_yFlPrTw=s96-c.png" },
      category: { label: 'Consumer App', className: CATEGORY_STYLES.consumerApp },
      remixes: 4781
    },
    {
      id: 'f34e3a91-e821-4705-9e65-257dcf59254e',
      title: 'orangery-ventures-harmony',
      href: '/projects/f34e3a91-e821-4705-9e65-257dcf59254e',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/26.png",
      imageAlt: 'Screenshot of orangery-ventures-harmony',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJzyeET5CBOEqxL9Ps8_wpE8BEKrgQM2zJNHyT8Zry5kzA6fSos5Q=s96-c.jpg" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 4614
    },
    {
      id: '4895dbd0-4609-4ca0-9728-8cee578eee22',
      title: 'psk-services',
      href: '/projects/4895dbd0-4609-4ca0-9728-8cee578eee22',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/18.png",
      imageAlt: 'Screenshot of psk-services',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJi-v23EytHgsQUNgL8mouqRrYRCAbTJik8ne10t1PXCkVJtwO2=s96-c.png" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 3551
    },
    {
      id: '569a64aa-fd54-4462-a091-9529939f2136',
      title: 'forklift-navigator',
      href: '/projects/569a64aa-fd54-4462-a091-9529939f2136',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/21.png",
      imageAlt: 'Screenshot of forklift-navigator',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocJJ-FNKRcioZeVHmszxtIOccHPjPetTQ7gn8QWPtYvJSS9yiMbhlw=s96-c.png" },
      category: { label: 'Prototype', className: CATEGORY_STYLES.prototype },
      remixes: 2809
    },
    {
      id: '50068c47-1a49-461d-a839-cedf70ff9dd5',
      title: 'glow-convert-sell',
      href: '/projects/50068c47-1a49-461d-a839-cedf70ff9dd5',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/17.png",
      imageAlt: 'Screenshot of glow-convert-sell',
      avatar: { type: 'image' as const, src: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/ACg8ocLKSw1AHo0xeU5hX1ik5OVLGCqRwzFFmD6xmRpxzdwB-SgAjWk=s96-c.png" },
      category: { label: 'Website', className: CATEGORY_STYLES.website },
      remixes: 2806
    },
    {
      id: 'aa3f66a7-cf0f-41ac-99b0-6838871e6ffa',
      title: 'trailguidecoihues',
      href: '/projects/aa3f66a7-cf0f-41ac-99b0-6838871e6ffa',
      imageSrc: "https://c.animaapp.com/meaq1oglzQaLFZ/assets/19.png",
      imageAlt: 'Screenshot of trailguidecoihues',
      avatar: { type: 'letter-j' as const, letter: 'J' },
      category: { label: 'Consumer App', className: CATEGORY_STYLES.consumerApp },
      remixes: 2444
    }
  ]
} as const;
