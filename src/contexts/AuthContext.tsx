import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, Organization } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for development
const mockUser: User = {
  id: '1',
  email: 'demo@lovable.dev',
  username: 'demo',
  name: 'Demo User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  createdAt: '2024-01-01T00:00:00Z'
};

const mockOrgs: Organization[] = [
  {
    id: 'personal',
    name: 'Personal',
    slug: 'personal',
    plan: 'free',
    memberCount: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'acme-corp',
    name: 'Acme Corp',
    slug: 'acme-corp',
    plan: 'pro',
    memberCount: 5,
    createdAt: '2024-01-15T00:00:00Z'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [organizations] = useState<Organization[]>(mockOrgs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('lovable_auth') === 'true';
      if (isAuthenticated) {
        setUser(mockUser);
        setCurrentOrg(mockOrgs[0]);
      }
      setIsLoading(false);
    };

    setTimeout(checkAuth, 100);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('lovable_auth', 'true');
    setUser(mockUser);
    setCurrentOrg(mockOrgs[0]);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('lovable_auth');
    setUser(null);
    setCurrentOrg(null);
  };

  const switchOrg = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrg(org);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      currentOrg,
      organizations,
      isLoading,
      login,
      logout,
      switchOrg
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
