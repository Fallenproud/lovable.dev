import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronDown, LogOut } from 'lucide-react';

export function AppHeader() {
  const { user, currentOrg, organizations, logout, switchOrg } = useAuth();
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Organization Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <span>{currentOrg?.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showOrgDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      switchOrg(org.id);
                      setShowOrgDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      currentOrg?.id === org.id ? 'bg-gray-50 font-medium' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{org.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{org.plan}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2 text-sm"
          >
            <img
              className="h-8 w-8 rounded-full"
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`}
              alt={user?.name}
            />
            <span className="font-medium text-gray-700">{user?.name}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {showUserDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowUserDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
