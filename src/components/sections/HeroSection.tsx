import React from 'react';

export function HeroSection() {
  return (
    <section className="items-center box-border flex flex-col justify-center w-full mb-5 py-[200px] md:mb-0">
      <div className="items-center box-border flex flex-col text-center mb-4 px-4 md:mb-6">
        <div className="items-center box-border gap-x-2 flex flex-col justify-center gap-y-2 w-full"></div>
        <h1 className="text-2xl font-medium items-center box-border gap-x-1 flex leading-6 gap-y-1 mb-2 md:text-5xl md:gap-x-0 md:leading-[48px] md:gap-y-0 md:mb-2.5">
          <span className="text-2xl box-border block tracking-[-0.6px] leading-6 pt-0.5 md:text-5xl md:tracking-[-1.2px] md:leading-[48px] md:pt-0">
            Build something
            <span className="static text-2xl box-border inline h-auto tracking-[-0.6px] leading-6 text-wrap w-auto overflow-visible m-0 md:absolute md:text-5xl md:block md:h-px md:tracking-[-1.2px] md:leading-[48px] md:text-nowrap md:w-px md:overflow-hidden md:-m-px">Lovable</span>
          </span>
          <div className="text-2xl box-border gap-x-1.5 hidden flex-col leading-6 min-h-0 min-w-0 gap-y-1.5 ml-2 md:text-5xl md:flex md:leading-[48px] md:min-h-[auto] md:min-w-[auto] md:ml-4">
            <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-3.svg" alt="Icon" className="text-2xl box-border flex h-[22px] leading-6 md:text-5xl md:h-9 md:leading-[48px]" />
            <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-4.svg" alt="Icon" className="text-2xl box-border hidden h-[22px] leading-6 md:text-5xl md:h-9 md:leading-[48px]" />
          </div>
        </h1>
        <p className="text-zinc-900/70 text-lg box-border leading-[22.5px] max-w-[279.053px] mb-6 md:text-xl md:leading-[25px] md:max-w-full">Create apps and websites by chatting with AI</p>
      </div>
      <div className="box-border max-w-screen-md w-full">
        <div className="relative box-border w-full">
          <div className="items-center box-border flex flex-col w-full">
            <div className="relative box-border h-full w-full">
              <form className="bg-stone-100 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.1)_0px_8px_10px_-6px] box-border gap-x-2 flex flex-col gap-y-2 w-full border border-stone-200 p-3 rounded-[28px] border-solid">
                <div className="relative items-center box-border flex basis-[0%] grow">
                  <textarea 
                    placeholder="Ask Lovable to create a prototype" 
                    className="bg-transparent box-border flex basis-[0%] grow h-20 leading-[22px] max-h-[200px] min-h-20 text-ellipsis text-nowrap w-full p-2 rounded-md"
                  ></textarea>
                </div>
                <div className="items-center box-border gap-x-1 flex flex-wrap gap-y-1">
                  <button type="button" className="text-zinc-600 text-sm font-medium items-center bg-stone-100 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] gap-x-1.5 flex h-8 justify-center leading-[21px] gap-y-1.5 text-center text-nowrap w-8 border border-stone-200 p-0 rounded-full border-solid">
                    <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-5.svg" alt="Icon" className="box-border shrink-0 h-5 text-nowrap w-5" />
                  </button>
                  <div className="box-border">
                    <button type="button" className="text-zinc-600 text-sm font-medium items-center bg-stone-100 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] gap-x-1.5 inline-flex h-8 justify-center leading-[21px] gap-y-1.5 text-center text-nowrap border border-stone-200 px-3 py-2 rounded-full border-solid">
                      <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-6.svg" alt="Icon" className="box-border shrink-0 h-4 text-nowrap w-4" />
                      <span className="box-border hidden min-h-0 min-w-0 text-nowrap md:flex md:min-h-[auto] md:min-w-[auto]">Attach</span>
                    </button>
                  </div>
                  <button type="button" className="text-zinc-600 text-sm font-medium items-center bg-stone-100 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] gap-x-1 flex h-8 justify-center leading-[21px] gap-y-1 text-center text-nowrap border border-stone-200 px-3 py-2 rounded-full border-solid"></button>
                  <div className="items-center box-border gap-x-1 flex gap-y-1 ml-auto">
                    <div className="relative items-center box-border gap-x-1 flex gap-y-1 md:gap-x-2 md:gap-y-2">
                      <div className="box-border"></div>
                      <button type="submit" className="items-center bg-zinc-900 flex h-8 justify-center opacity-50 text-center w-8 p-0 rounded-full">
                        <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-8.svg" alt="Icon" className="text-stone-50 box-border shrink-0 h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="box-border h-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
