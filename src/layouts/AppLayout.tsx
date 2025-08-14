import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/navigation/AppSidebar';
import { AppHeader } from '../components/navigation/AppHeader';

export function AppLayout() {
  const location = useLocation();
  const isPlayground = location.pathname === '/app/playground';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {!isPlayground && <AppSidebar />}
      <div className="flex-1 flex flex-col">
        {!isPlayground && <AppHeader />}
        <main className={isPlayground ? "flex-1" : "flex-1 p-6"}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
