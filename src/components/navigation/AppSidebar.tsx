import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code, 
  FolderOpen, 
  Template, 
  Users, 
  Search,
  Settings,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Playground', href: '/app/playground', icon: Code },
  { name: 'Projects', href: '/app/projects', icon: FolderOpen },
  { name: 'Templates', href: '/app/templates', icon: Template },
  { name: 'Community', href: '/app/community', icon: Users },
  { name: 'Search', href: '/app/search', icon: Search }, // Placeholder for global search
];

const bottomNavigation = [
  { name: 'Profile', href: '/app/profile', icon: User },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app';
    if (path === '/app/playground') return location.pathname === '/app/playground';
    return location.pathname.startsWith(path) && location.pathname !== '/app/playground';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link to="/app" className="flex items-center">
          <img src="https://c.animaapp.com/meaq1oglzQaLFZ/assets/icon-1.svg" alt="Lovable" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">Lovable</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4 space-y-1">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
