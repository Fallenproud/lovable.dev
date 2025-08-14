import React, { useState } from 'react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Search, Filter, ExternalLink, Star, Download } from 'lucide-react';

export function Integrations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Deployment', 'Analytics', 'Communication'];

  const integrations = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect your GitHub repositories for seamless version control and collaboration.',
      category: 'Development',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      rating: 4.9,
      installs: '10K+',
      featured: true,
      status: 'Available'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deploy your applications instantly with Vercel\'s edge network.',
      category: 'Deployment',
      logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
      rating: 4.8,
      installs: '8K+',
      featured: true,
      status: 'Available'
    },
    {
      id: 'figma',
      name: 'Figma',
      description: 'Import designs from Figma and convert them to code automatically.',
      category: 'Design',
      logo: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg',
      rating: 4.7,
      installs: '12K+',
      featured: true,
      status: 'Available'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates directly in your Slack workspace.',
      category: 'Communication',
      logo: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
      rating: 4.6,
      installs: '5K+',
      featured: false,
      status: 'Available'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Sync your project documentation with Notion pages.',
      category: 'Development',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      rating: 4.5,
      installs: '3K+',
      featured: false,
      status: 'Available'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Track your application performance and user engagement.',
      category: 'Analytics',
      logo: 'https://developers.google.com/analytics/images/terms/logo_lockup_analytics_icon_vertical_black_2x.png',
      rating: 4.4,
      installs: '7K+',
      featured: false,
      status: 'Available'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Add payment processing to your applications with ease.',
      category: 'Development',
      logo: 'https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg',
      rating: 4.8,
      installs: '6K+',
      featured: false,
      status: 'Coming Soon'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Connect with your development community on Discord.',
      category: 'Communication',
      logo: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843dcf5_icon_clyde_black_RGB.svg',
      rating: 4.3,
      installs: '2K+',
      featured: false,
      status: 'Coming Soon'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredIntegrations = integrations.filter(integration => integration.featured);

  return (
    <>
      <SEOHead 
        title="Integrations"
        description="Connect Lovable with your favorite tools and services to streamline your development workflow"
        canonical="https://lovable.dev/integrations"
      />
      
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Integrations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect Lovable with your favorite tools and services to streamline your development workflow.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Integrations */}
          {selectedCategory === 'All' && searchQuery === '' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{integration.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{integration.installs}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{integration.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {integration.category}
                      </span>
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        Install
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Integrations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedCategory === 'All' ? 'All Integrations' : `${selectedCategory} Integrations`}
              <span className="text-gray-500 font-normal ml-2">({filteredIntegrations.length})</span>
            </h2>
            
            {filteredIntegrations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-10 h-10 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{integration.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-600">{integration.installs}</span>
                        </div>
                      </div>
                      {integration.status === 'Coming Soon' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {integration.category}
                      </span>
                      {integration.status === 'Available' ? (
                        <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors">
                          <Download className="h-3 w-3 mr-1" />
                          Install
                        </button>
                      ) : (
                        <button className="inline-flex items-center px-3 py-1.5 bg-gray-300 text-gray-600 text-xs font-medium rounded cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Request Integration */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see what you need?
            </h2>
            <p className="text-gray-600 mb-6">
              Request a new integration and we'll consider adding it to our roadmap.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              <ExternalLink className="h-4 w-4 mr-2" />
              Request Integration
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
