import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData } from '../../data/navigationData';

export function MarketingHeader() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky items-center box-border flex flex-col justify-between w-full z-50 border-b border-solid border-transparent top-0">
      <div className="items-center box-border flex h-16 justify-between max-w-screen-2xl w-full mx-auto px-2 md:px-4">
        <div className="items-center box-border gap-x-8 flex gap-y-8 pl-0 md:pl-8">
          <div className="relative box-border">
            <span className="box-border gap-x-1.5 flex flex-col gap-y-1.5">
              <Link to="/" className="box-border block">
                <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-1.svg" alt="Lovable" className="box-border flex h-[22px]" />
              </Link>
            </span>
          </div>
          <nav className="items-center box-border gap-x-6 hidden min-h-0 min-w-0 gap-y-6 md:flex md:min-h-[auto] md:min-w-[auto]">
            <Link 
              to="/pricing" 
              className={`text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto] ${
                isActive('/pricing') ? 'font-medium text-blue-600' : ''
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/docs" 
              className={`text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto] ${
                isActive('/docs') ? 'font-medium text-blue-600' : ''
              }`}
            >
              Docs
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto] ${
                isActive('/blog') ? 'font-medium text-blue-600' : ''
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/changelog" 
              className={`text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto] ${
                isActive('/changelog') ? 'font-medium text-blue-600' : ''
              }`}
            >
              Changelog
            </Link>
            <Link 
              to="/integrations" 
              className={`text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto] ${
                isActive('/integrations') ? 'font-medium text-blue-600' : ''
              }`}
            >
              Integrations
            </Link>
            <Link 
              to="/app" 
              className="text-sm box-border inline leading-[21px] min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto] font-medium text-blue-600"
            >
              App
            </Link>
          </nav>
        </div>
        <div className="items-center box-border gap-x-4 flex gap-y-4 pr-0 md:pr-8">
          <div className="box-border gap-x-2 flex gap-y-2">
            <Link 
              to="/login" 
              className="text-sm font-medium items-center bg-stone-100 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border gap-x-2 flex h-8 justify-center leading-[21px] gap-y-2 text-nowrap border border-stone-200 px-4 py-2 rounded-md border-solid"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="text-stone-50 text-sm font-medium items-center bg-zinc-900 box-border gap-x-2 flex h-8 justify-center leading-[21px] gap-y-2 text-nowrap px-4 py-2 rounded-md"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
