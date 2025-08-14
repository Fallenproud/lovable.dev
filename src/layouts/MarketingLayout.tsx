import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingHeader } from '../components/navigation/MarketingHeader';
import { Footer } from '../components/layout/Footer';

export function MarketingLayout() {
  return (
    <div className="text-zinc-900 text-base not-italic normal-nums font-normal accent-auto bg-stone-50 box-border flex flex-col tracking-[normal] leading-6 list-outside list-disc min-h-screen text-start indent-[0px] normal-case visible border-separate font-cameraplainvariable_83c9a9">
      <div className="box-border flex basis-[0%] flex-col grow">
        <div className="relative bg-stone-50 box-border min-h-screen w-full">
          <div className="absolute box-border w-full overflow-hidden inset-0"></div>
          <div className="absolute bg-blend-overlay bg-[url('https://lovable.dev/_next/static/media/grain.1ccdda41.png')] bg-size-[100px_100px] box-border mix-blend-overlay inset-0"></div>
          <MarketingHeader />
          <main className="box-border max-w-screen-2xl w-full overflow-hidden mx-auto px-2 md:px-4">
            <div className="relative box-border w-full">
              <Outlet />
            </div>
          </main>
          <div className="relative box-border max-w-screen-2xl w-full z-10 mx-auto px-2 md:px-4">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
