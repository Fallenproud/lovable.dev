import React from 'react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Calendar, Plus, Zap, Bug, Shield, Sparkles } from 'lucide-react';

export function Changelog() {
  const releases = [
    {
      version: '2.1.0',
      date: '2024-01-15',
      type: 'major',
      title: 'Advanced Editor Features',
      description: 'Major update with professional code editing capabilities',
      changes: [
        {
          type: 'feature',
          title: 'Advanced Code Editor',
          description: 'Monaco editor with TypeScript support, IntelliSense, and custom themes'
        },
        {
          type: 'feature',
          title: 'Code Intelligence',
          description: 'Real-time error detection and smart code suggestions'
        },
        {
          type: 'feature',
          title: 'Find & Replace',
          description: 'Advanced search functionality with regex support'
        },
        {
          type: 'improvement',
          title: 'Enhanced File Management',
          description: 'Improved file tree with drag & drop, context menus, and file templates'
        }
      ]
    },
    {
      version: '2.0.0',
      date: '2024-01-10',
      type: 'major',
      title: 'AI-Powered Playground',
      description: 'Complete redesign of the development environment',
      changes: [
        {
          type: 'feature',
          title: 'Enhanced Chat Interface',
          description: 'Improved AI conversation with code block highlighting and suggestions'
        },
        {
          type: 'feature',
          title: 'Live Preview System',
          description: 'Real-time preview with device simulation and hot reload'
        },
        {
          type: 'feature',
          title: 'Project Management',
          description: 'Complete project lifecycle management with templates'
        },
        {
          type: 'improvement',
          title: 'Performance Optimizations',
          description: 'Faster loading times and smoother interactions'
        }
      ]
    },
    {
      version: '1.5.2',
      date: '2024-01-05',
      type: 'patch',
      title: 'Bug Fixes & Improvements',
      description: 'Various fixes and performance improvements',
      changes: [
        {
          type: 'fix',
          title: 'Fixed Authentication Issues',
          description: 'Resolved login/logout flow problems'
        },
        {
          type: 'fix',
          title: 'Improved Mobile Responsiveness',
          description: 'Better mobile experience across all pages'
        },
        {
          type: 'improvement',
          title: 'Enhanced Error Handling',
          description: 'Better error messages and recovery mechanisms'
        }
      ]
    },
    {
      version: '1.5.0',
      date: '2024-01-01',
      type: 'minor',
      title: 'New Year Update',
      description: 'New features and improvements for the new year',
      changes: [
        {
          type: 'feature',
          title: 'Dark Mode Support',
          description: 'Added system-wide dark mode with custom themes'
        },
        {
          type: 'feature',
          title: 'Keyboard Shortcuts',
          description: 'Comprehensive keyboard shortcuts for power users'
        },
        {
          type: 'improvement',
          title: 'Faster Build Times',
          description: 'Optimized build process for quicker deployments'
        },
        {
          type: 'security',
          title: 'Security Enhancements',
          description: 'Improved security measures and vulnerability fixes'
        }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'improvement':
        return <Zap className="h-4 w-4 text-blue-600" />;
      case 'fix':
        return <Bug className="h-4 w-4 text-orange-600" />;
      case 'security':
        return <Shield className="h-4 w-4 text-purple-600" />;
      default:
        return <Sparkles className="h-4 w-4 text-gray-600" />;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'patch':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SEOHead 
        title="Changelog"
        description="Stay updated with the latest Lovable releases, features, and improvements"
        canonical="https://lovable.dev/changelog"
      />
      
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Changelog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest Lovable releases, new features, and improvements.
            </p>
          </div>

          {/* Releases */}
          <div className="space-y-12">
            {releases.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Timeline line */}
                {index < releases.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Version badge */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">
                      v{release.version.split('.')[0]}
                    </span>
                  </div>
                  
                  {/* Release content */}
                  <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-900">
                          Version {release.version}
                        </h2>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVersionBadge(release.type)}`}>
                          {release.type}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(release.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {release.description}
                    </p>
                    
                    {/* Changes */}
                    <div className="space-y-3">
                      {release.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start space-x-3">
                          {getChangeIcon(change.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {change.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {change.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe to updates */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-blue-100 mb-6">
              Get notified about new releases and features.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-2 bg-white text-blue-600 font-medium rounded-r-md hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
