import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { Plus, FolderOpen, Calendar, Users } from 'lucide-react';

export function Projects() {
  // Mock projects data
  const projects = [
    {
      id: '1',
      name: 'E-commerce Dashboard',
      description: 'Admin dashboard for online store management',
      updatedAt: '2024-01-15',
      collaborators: 3,
      status: 'active'
    },
    {
      id: '2', 
      name: 'Task Management App',
      description: 'Team collaboration and task tracking tool',
      updatedAt: '2024-01-12',
      collaborators: 1,
      status: 'draft'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Projects"
        description="Manage your projects"
        noIndex={true}
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-2 text-gray-600">
              Manage and organize your development projects
            </p>
          </div>
          <Link
            to="/app/playground"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/app/projects/${project.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {project.collaborators}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-12 text-center">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first project
              </p>
              <Link
                to="/app/playground"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
