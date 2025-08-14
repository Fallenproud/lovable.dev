import React from 'react';
import { footerData } from '../../data/footerData';

export function Footer() {
  return (
    <footer className="bg-stone-50 box-border flex flex-col justify-center w-full border-stone-100 mt-6 mb-4 mx-auto p-8 rounded-[20px] border-2 border-solid md:flex-row">
      <nav className="content-center box-border gap-x-4 grid grid-cols-[repeat(3,minmax(0px,1fr))] justify-end gap-y-12 w-full md:gap-x-12 md:grid-cols-[repeat(6,minmax(0px,1fr))]">
        <div className="items-center box-border flex flex-col col-end-[-1] col-start-1 mb-16 md:[align-items:normal] md:col-end-[span_1] md:col-start-[span_1] md:mb-0">
          <a href="/" className="self-center box-border block md:self-start">
            <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-10.svg" alt="Icon" className="box-border h-8 w-8" />
          </a>
          <div className="self-center box-border mt-4 md:self-start">
            <button type="button" className="text-zinc-600 items-center bg-transparent gap-x-1 flex gap-y-1 text-center p-0">
              <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-11.svg" alt="Icon" className="box-border shrink-0 h-4 w-4" />
              <span className="text-sm box-border block leading-[21px]">EN</span>
            </button>
          </div>
        </div>
        {footerData.sections.map((section) => (
          <div key={section.id} className="box-border text-center md:text-start">
            <p className="font-medium box-border text-center mb-3 md:text-start">{section.title}</p>
            <ul className="text-zinc-600 box-border list-none text-center pl-0 md:text-start">
              {section.links.map((link, index) => (
                <li key={link.id} className={index === 0 ? "box-border text-center md:text-left" : "box-border text-center mt-3 md:text-left"}>
                  {link.type === 'button' ? (
                    <button type="button" className="bg-transparent text-center p-0">
                      {link.label}
                    </button>
                  ) : (
                    <a 
                      href={link.href} 
                      className={index === 0 ? "items-center box-border gap-x-1 flex justify-center gap-y-1 text-center md:justify-normal md:text-left" : "box-border text-center md:text-left"}
                      title={link.title}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </footer>
  );
}
