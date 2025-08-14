import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export function Blog() {
  const featuredPost = {
    id: 'ai-development-future',
    title: 'The Future of AI-Powered Development',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we build applications and what it means for developers.',
    author: 'Lovable Team',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    tags: ['AI', 'Development', 'Future']
  };

  const posts = [
    {
      id: 'getting-started-lovable',
      title: 'Getting Started with Lovable: A Complete Guide',
      excerpt: 'Learn how to create your first project with Lovable and harness the power of AI for development.',
      author: 'Sarah Chen',
      date: '2024-01-12',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
      tags: ['Tutorial', 'Getting Started']
    },
    {
      id: 'best-practices-ai-prompts',
      title: 'Best Practices for Writing AI Prompts',
      excerpt: 'Master the art of communicating with AI to get the exact code you need for your projects.',
      author: 'Alex Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
      tags: ['AI', 'Best Practices', 'Prompts']
    },
    {
      id: 'collaborative-development',
      title: 'Collaborative Development in the AI Era',
      excerpt: 'How teams are using AI-powered tools to collaborate more effectively and build better software.',
      author: 'Maria Garcia',
      date: '2024-01-08',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
      tags: ['Collaboration', 'Teams', 'AI']
    },
    {
      id: 'performance-optimization',
      title: 'AI-Assisted Performance Optimization',
      excerpt: 'Discover how AI can help identify and fix performance bottlenecks in your applications.',
      author: 'David Kim',
      date: '2024-01-05',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      tags: ['Performance', 'Optimization', 'AI']
    },
    {
      id: 'security-ai-development',
      title: 'Security Considerations in AI Development',
      excerpt: 'Essential security practices when building applications with AI assistance.',
      author: 'Jennifer Liu',
      date: '2024-01-03',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
      tags: ['Security', 'AI', 'Best Practices']
    }
  ];

  const categories = ['All', 'AI', 'Development', 'Tutorial', 'Best Practices', 'Teams'];

  return (
    <>
      <SEOHead 
        title="Blog"
        description="Stay updated with the latest insights, tutorials, and news about AI-powered development"
        canonical="https://lovable.dev/blog"
      />
      
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest insights, tutorials, and news about AI-powered development.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Link
              to={`/blog/${featuredPost.id}`}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Featured
                    </span>
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Load More Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-blue-100 mb-6">
              Get the latest posts delivered right to your inbox.
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
