import React from 'react';
import { ProjectGrid } from '../ui/ProjectGrid';
import { FilterControls } from '../ui/FilterControls';

export function CommunitySection() {
  return (
    <div className="bg-stone-50 box-border gap-x-12 flex flex-col gap-y-12 w-full p-8 rounded-[20px]">
      <div className="box-border gap-x-5 flex flex-col gap-y-5">
        <div className="box-border gap-x-2 flex flex-col gap-y-2 md:gap-x-4 md:gap-y-4">
          <div className="[align-items:normal] box-border gap-x-2 flex flex-col gap-y-2 w-full md:items-center md:gap-x-4 md:flex-row md:gap-y-4">
            <div className="items-center box-border flex w-full">
              <p className="text-2xl font-medium box-border leading-9">From the Community</p>
            </div>
          </div>
          <FilterControls />
        </div>
        <ProjectGrid />
        <div className="box-border flex justify-center">
          <button className="text-sm font-medium items-center bg-stone-50 gap-x-2 flex h-8 justify-center leading-[21px] gap-y-2 text-center text-nowrap border border-stone-200 mt-8 px-4 py-2 rounded-md border-solid">Show More</button>
        </div>
      </div>
    </div>
  );
}
