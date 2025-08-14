import React from 'react';
import { SEOHead } from '../../components/ui/SEOHead';
import { HeroSection } from '../../components/sections/HeroSection';
import { CommunitySection } from '../../components/sections/CommunitySection';

export function Home() {
  return (
    <>
      <SEOHead 
        title="Build something Lovable - Create apps and websites by chatting with AI"
        description="Create apps and websites by chatting with AI"
        canonical="https://lovable.dev/"
      />
      <HeroSection />
      <CommunitySection />
    </>
  );
}
