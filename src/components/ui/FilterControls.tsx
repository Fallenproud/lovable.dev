import React from 'react';
import { filterData } from '../../data/filterData';

export function FilterControls() {
  return (
    <div className="box-border gap-x-2 flex flex-col justify-between gap-y-2 w-full md:gap-x-4 md:flex-row md:gap-y-4">
      <button type="button" role="combobox" className="text-sm items-center bg-transparent shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] flex h-9 justify-between leading-[21px] text-center text-nowrap w-36 border border-stone-200 px-3 py-2 rounded-md border-solid">
        <span className="box-border flow-root text-nowrap overflow-hidden">Popular</span>
        <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-9.svg" alt="Icon" className="box-border shrink-0 h-4 opacity-50 text-nowrap w-4" />
      </button>
      <div className="box-content gap-x-[normal] block flex-nowrap min-h-0 min-w-0 gap-y-[normal] md:aspect-auto md:box-border md:gap-x-2 md:flex md:flex-wrap md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:gap-y-2 md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto]">
        {filterData.categories.map((category, index) => (
          <div key={category.id} className={index === 0 ? "text-base font-normal [align-items:normal] bg-transparent box-content block h-auto leading-[normal] min-h-0 min-w-0 p-0 rounded-none md:text-sm md:font-medium md:items-center md:aspect-auto md:bg-stone-100 md:box-border md:flex md:h-9 md:leading-[21px] md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:[mask-position:0%] md:bg-left-top md:px-3 md:py-2 md:scroll-m-0 md:scroll-p-[auto] md:rounded-bl md:rounded-br md:rounded-tl md:rounded-tr" : "text-base font-normal [align-items:normal] box-content block h-auto leading-[normal] min-h-0 min-w-0 p-0 rounded-none md:text-sm md:font-medium md:items-center md:aspect-auto md:box-border md:flex md:h-9 md:leading-[21px] md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:border md:border-stone-200 md:[mask-position:0%] md:bg-left-top md:px-3 md:py-2 md:scroll-m-0 md:scroll-p-[auto] md:rounded-bl md:rounded-br md:rounded-tl md:rounded-tr md:border-solid"}>
            {category.label}
          </div>
        ))}
      </div>
      <div className="box-border flex justify-end w-36 ml-auto md:ml-0">
        <button className="text-sm font-medium items-center bg-transparent gap-x-2 flex h-9 justify-center leading-[21px] gap-y-2 text-center text-nowrap px-4 py-2 rounded-md">
          <a href="/projects/featured" className="box-border block text-nowrap">View All</a>
        </button>
      </div>
    </div>
  );
}
