export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  memberCount: number;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  currentOrg: Organization | null;
  organizations: Organization[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchOrg: (orgId: string) => void;
}

export interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOrg?: boolean;
  redirectTo?: string;
}
