import React from 'react';
import { SEOHead } from '../../components/ui/SEOHead';

export function Pricing() {
  return (
    <>
      <SEOHead 
        title="Pricing"
        description="Choose the perfect plan for your needs"
        canonical="https://lovable.dev/pricing"
      />
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <p className="mt-4 text-gray-600">Perfect for getting started</p>
              <div className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  5 projects
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Basic templates
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Community support
                </li>
              </ul>
              <button className="mt-8 w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800">
                Get started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Popular</span>
              </div>
              <p className="mt-4 text-gray-600">For professional developers</p>
              <div className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited projects
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Premium templates
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Advanced AI features
                </li>
              </ul>
              <button className="mt-8 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600">
                Start free trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-gray-600">For large teams</p>
              <div className="mt-8">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Everything in Pro
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  SSO integration
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Custom integrations
                </li>
              </ul>
              <button className="mt-8 w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
