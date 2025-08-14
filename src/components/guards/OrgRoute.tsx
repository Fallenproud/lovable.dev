import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface OrgRouteProps {
  children: React.ReactNode;
}

export function OrgRoute({ children }: OrgRouteProps) {
  const { organizations, isLoading } = useAuth();
  const { orgId } = useParams();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  const orgExists = organizations.some(org => org.id === orgId);
  
  if (!orgExists) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
