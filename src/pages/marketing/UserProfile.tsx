import React from 'react';
import { useParams } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { Calendar, MapPin, Link as LinkIcon, Star, GitBranch, Users } from 'lucide-react';

export function UserProfile() {
  const { username } = useParams();

  // Mock user data
  const user = {
    username: username || 'demo-user',
    name: 'Demo User',
    bio: 'Full-stack developer passionate about AI-powered development. Building the future with Lovable.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'San Francisco, CA',
    website: 'https://demo-user.dev',
    joinDate: '2024-01-01',
    stats: {
      projects: 12,
      followers: 156,
      following: 89,
      stars: 234
    }
  };

  const projects = [
    {
      id: 'ai-todo-app',
      name: 'AI Todo App',
      description: 'Smart todo application with AI-powered task suggestions and natural language processing.',
      language: 'TypeScript',
      stars: 45,
      forks: 12,
      updatedAt: '2024-01-15',
      isPublic: true
    },
    {
      id: 'react-dashboard',
      name: 'React Dashboard',
      description: 'Modern dashboard template built with React, Tailwind CSS, and Chart.js.',
      language: 'JavaScript',
      stars: 78,
      forks: 23,
      updatedAt: '2024-01-12',
      isPublic: true
    },
    {
      id: 'api-wrapper',
      name: 'API Wrapper Library',
      description: 'TypeScript library for wrapping REST APIs with automatic type generation.',
      language: 'TypeScript',
      stars: 34,
      forks: 8,
      updatedAt: '2024-01-10',
      isPublic: true
    }
  ];

  return (
    <>
      <SEOHead 
        title={`${user.name} (@${user.username})`}
        description={user.bio}
        canonical={`https://lovable.dev/u/${user.username}`}
      />
      
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-gray-100"
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-xl text-gray-600 mb-4">@{user.username}</p>
                <p className="text-gray-700 mb-4">{user.bio}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {user.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        {user.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Follow
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Message
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.projects}</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.stars}</div>
                  <div className="text-sm text-gray-600">Stars</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Public Projects</h2>
            
            {projects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <GitBranch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No public projects</h3>
                <p className="text-gray-600">This user hasn't made any projects public yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {project.name}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Public
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span>{project.language}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitBranch className="h-3 w-3 mr-1" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                      <span>
                        Updated {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Feed Coming Soon</h3>
              <p className="text-gray-600">
                We're working on a comprehensive activity feed to show recent contributions and interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
