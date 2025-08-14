import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { BookOpen, ArrowRight, Search, Code, Zap, Users } from 'lucide-react';

export function Docs() {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of building with Lovable',
      icon: Zap,
      links: [
        { title: 'Quick Start Guide', href: '/docs/quick-start' },
        { title: 'Your First Project', href: '/docs/first-project' },
        { title: 'Understanding the Interface', href: '/docs/interface' },
      ]
    },
    {
      title: 'AI Development',
      description: 'Master AI-powered development',
      icon: Code,
      links: [
        { title: 'Writing Effective Prompts', href: '/docs/prompts' },
        { title: 'Code Generation', href: '/docs/code-generation' },
        { title: 'Iterative Development', href: '/docs/iterative' },
      ]
    },
    {
      title: 'Collaboration',
      description: 'Work together with your team',
      icon: Users,
      links: [
        { title: 'Team Management', href: '/docs/teams' },
        { title: 'Sharing Projects', href: '/docs/sharing' },
        { title: 'Real-time Collaboration', href: '/docs/collaboration' },
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Documentation"
        description="Learn how to build amazing applications with Lovable's AI-powered development platform"
        canonical="https://lovable.dev/docs"
      />
      
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to know to build amazing applications with Lovable's AI-powered development platform.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Link
              to="/docs/quick-start"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Zap className="h-8 w-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
              <p className="text-blue-100">Get up and running in minutes</p>
            </Link>
            
            <Link
              to="/docs/prompts"
              className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <Code className="h-8 w-8 mb-4 text-gray-600" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">AI Prompts</h3>
              <p className="text-gray-600">Learn to write effective prompts</p>
            </Link>
            
            <Link
              to="/docs/examples"
              className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <BookOpen className="h-8 w-8 mb-4 text-gray-600" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Examples</h3>
              <p className="text-gray-600">Explore sample projects</p>
            </Link>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-12">
            {docSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center mb-6">
                    <Icon className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.links.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{link.title}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our community and support team are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Join Community
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
