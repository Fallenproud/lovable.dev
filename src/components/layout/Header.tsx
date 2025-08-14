import React from 'react';
import { navigationData } from '../../data/navigationData';

export function Header() {
  return (
    <nav className="sticky items-center box-border flex flex-col justify-between w-full z-50 border-b border-solid border-transparent top-0">
      <div className="items-center box-border flex h-16 justify-between max-w-screen-2xl w-full mx-auto px-2 md:px-4">
        <div className="items-center box-border gap-x-8 flex gap-y-8 pl-0 md:pl-8">
          <div className="relative box-border">
            <span className="box-border gap-x-1.5 flex flex-col gap-y-1.5">
              <a href="/" className="box-border block">
                <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-1.svg" alt="Icon" className="box-border flex h-[22px]" />
                <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-2.svg" alt="Icon" className="box-border hidden h-[22px]" />
              </a>
            </span>
          </div>
          <nav className="items-center box-border gap-x-6 hidden min-h-0 min-w-0 gap-y-6 md:flex md:min-h-[auto] md:min-w-[auto]">
            {navigationData.mainNav.map((item) => (
              <a key={item.id} href={item.href} className="text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto]">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="items-center box-border gap-x-4 flex gap-y-4 pr-0 md:pr-8">
          <div className="box-border gap-x-2 flex gap-y-2">
            <a href="/login" className="text-sm font-medium items-center bg-stone-100 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border gap-x-2 flex h-8 justify-center leading-[21px] gap-y-2 text-nowrap border border-stone-200 px-4 py-2 rounded-md border-solid">Log in</a>
            <a href="/signup" className="text-stone-50 text-sm font-medium items-center bg-zinc-900 box-border gap-x-2 flex h-8 justify-center leading-[21px] gap-y-2 text-nowrap px-4 py-2 rounded-md">Get started</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
