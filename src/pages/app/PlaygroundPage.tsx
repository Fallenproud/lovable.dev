import React from 'react';
import { SEOHead } from '../../components/ui/SEOHead';
import { PlaygroundProvider } from '../../contexts/PlaygroundContext';
import { PlaygroundLayout } from '../../components/playground/PlaygroundLayout';

export function PlaygroundPage() {
  return (
    <>
      <SEOHead 
        title="Playground"
        description="AI-powered development playground"
        noIndex={true}
      />
      <PlaygroundProvider>
        <PlaygroundLayout />
      </PlaygroundProvider>
    </>
  );
}
