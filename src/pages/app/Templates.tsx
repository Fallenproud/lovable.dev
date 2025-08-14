import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { Search, Filter, Star, Download, Eye, Code, Zap, Users, Smartphone, Globe } from 'lucide-react';

export function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFramework, setSelectedFramework] = useState('All');

  const categories = ['All', 'Web App', 'Mobile', 'Dashboard', 'E-commerce', 'Landing Page', 'Blog'];
  const frameworks = ['All', 'React', 'Vue', 'Next.js', 'Vanilla'];

  const templates = [
    {
      id: 'modern-dashboard',
      name: 'Modern Dashboard',
      description: 'A comprehensive admin dashboard with charts, tables, and user management features.',
      category: 'Dashboard',
      framework: 'React',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      author: 'Lovable Team',
      rating: 4.9,
      downloads: '2.1K',
      featured: true,
      tags: ['Dashboard', 'Admin', 'Charts', 'Tables'],
      preview: '/templates/modern-dashboard/preview'
    },
    {
      id: 'saas-landing',
      name: 'SaaS Landing Page',
      description: 'Beautiful landing page template perfect for SaaS products with pricing and testimonials.',
      category: 'Landing Page',
      framework: 'Next.js',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      author: 'Design Studio',
      rating: 4.8,
      downloads: '1.8K',
      featured: true,
      tags: ['Landing', 'SaaS', 'Marketing', 'Responsive'],
      preview: '/templates/saas-landing/preview'
    },
    {
      id: 'ecommerce-store',
      name: 'E-commerce Store',
      description: 'Complete e-commerce solution with product catalog, cart, and checkout functionality.',
      category: 'E-commerce',
      framework: 'React',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      author: 'Commerce Pro',
      rating: 4.7,
      downloads: '1.5K',
      featured: true,
      tags: ['E-commerce', 'Shopping', 'Cart', 'Payment'],
      preview: '/templates/ecommerce-store/preview'
    },
    {
      id: 'blog-platform',
      name: 'Blog Platform',
      description: 'Modern blog template with markdown support, categories, and search functionality.',
      category: 'Blog',
      framework: 'Next.js',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=400&h=300&fit=crop',
      author: 'Content Creator',
      rating: 4.6,
      downloads: '1.2K',
      featured: false,
      tags: ['Blog', 'Markdown', 'CMS', 'SEO'],
      preview: '/templates/blog-platform/preview'
    },
    {
      id: 'mobile-app',
      name: 'Mobile App UI',
      description: 'React Native inspired mobile app interface with navigation and common components.',
      category: 'Mobile',
      framework: 'React',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      author: 'Mobile Dev',
      rating: 4.5,
      downloads: '980',
      featured: false,
      tags: ['Mobile', 'UI', 'Navigation', 'Components'],
      preview: '/templates/mobile-app/preview'
    },
    {
      id: 'portfolio-site',
      name: 'Portfolio Website',
      description: 'Clean and professional portfolio template for developers and designers.',
      category: 'Web App',
      framework: 'Vue',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      author: 'Portfolio Pro',
      rating: 4.4,
      downloads: '850',
      featured: false,
      tags: ['Portfolio', 'Personal', 'Showcase', 'Responsive'],
      preview: '/templates/portfolio-site/preview'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesFramework = selectedFramework === 'All' || template.framework === selectedFramework;
    return matchesSearch && matchesCategory && matchesFramework;
  });

  const featuredTemplates = templates.filter(template => template.featured);

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'React':
        return '⚛️';
      case 'Vue':
        return '💚';
      case 'Next.js':
        return '▲';
      default:
        return '🌐';
    }
  };

  return (
    <>
      <SEOHead 
        title="Templates"
        description="Browse and use professional templates to kickstart your projects"
        noIndex={true}
      />
      
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="mt-2 text-gray-600">
            Browse professional templates to kickstart your next project
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {frameworks.map(framework => (
                <option key={framework} value={framework}>{framework}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Templates */}
        {selectedCategory === 'All' && selectedFramework === 'All' && searchQuery === '' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <span className="text-lg">{getFrameworkIcon(template.framework)}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>
                      <span>by {template.author}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={template.preview}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Link>
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                        <Code className="h-4 w-4 mr-2" />
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
            <span className="text-gray-500 font-normal ml-2">({filteredTemplates.length})</span>
          </h2>
          
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Eye className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <span className="text-sm">{getFrameworkIcon(template.framework)}</span>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={template.preview}
                        className="flex-1 inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Preview
                      </Link>
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
