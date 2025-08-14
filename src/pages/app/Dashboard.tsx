import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Code, FolderOpen, Template } from 'lucide-react';

export function Dashboard() {
  const { user, currentOrg } = useAuth();

  const quickActions = [
    {
      name: 'New Project',
      description: 'Start a new project from scratch',
      href: '/app/playground',
      icon: Plus,
      color: 'bg-blue-500'
    },
    {
      name: 'Browse Templates',
      description: 'Start with a pre-built template',
      href: '/app/templates',
      icon: Template,
      color: 'bg-green-500'
    },
    {
      name: 'Open Playground',
      description: 'Experiment with AI-powered coding',
      href: '/app/playground',
      icon: Code,
      color: 'bg-purple-500'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Dashboard"
        description="Your development dashboard"
        noIndex={true}
      />
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Working in <span className="font-medium">{currentOrg?.name}</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              to={action.href}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow block"
            >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{action.name}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <Link to="/app/projects" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 text-center text-gray-500">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent projects</p>
              <Link to="/app/playground" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Create your first project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
