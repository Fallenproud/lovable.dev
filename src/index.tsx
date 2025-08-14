import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MarketingLayout } from './layouts/MarketingLayout';
import { AppLayout } from './layouts/AppLayout';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { OrgRoute } from './components/guards/OrgRoute';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/marketing/Home').then(m => ({ default: m.Home })));
const Pricing = React.lazy(() => import('./pages/marketing/Pricing').then(m => ({ default: m.Pricing })));
const Docs = React.lazy(() => import('./pages/marketing/Docs').then(m => ({ default: m.Docs })));
const Blog = React.lazy(() => import('./pages/marketing/Blog').then(m => ({ default: m.Blog })));
const Changelog = React.lazy(() => import('./pages/marketing/Changelog').then(m => ({ default: m.Changelog })));
const Integrations = React.lazy(() => import('./pages/marketing/Integrations').then(m => ({ default: m.Integrations })));
const Login = React.lazy(() => import('./pages/marketing/Login').then(m => ({ default: m.Login })));
const Signup = React.lazy(() => import('./pages/marketing/Signup').then(m => ({ default: m.Signup })));
const ForgotPassword = React.lazy(() => import('./pages/marketing/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const Terms = React.lazy(() => import('./pages/marketing/Terms').then(m => ({ default: m.Terms })));
const Privacy = React.lazy(() => import('./pages/marketing/Privacy').then(m => ({ default: m.Privacy })));
const UserProfile = React.lazy(() => import('./pages/marketing/UserProfile').then(m => ({ default: m.UserProfile })));

const Dashboard = React.lazy(() => import('./pages/app/Dashboard').then(m => ({ default: m.Dashboard })));
const PlaygroundPage = React.lazy(() => import('./pages/app/PlaygroundPage').then(m => ({ default: m.PlaygroundPage })));
const Projects = React.lazy(() => import('./pages/app/Projects').then(m => ({ default: m.Projects })));
const Templates = React.lazy(() => import('./pages/app/Templates').then(m => ({ default: m.Templates })));
const Community = React.lazy(() => import('./pages/app/Community').then(m => ({ default: m.Community })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
  </div>
);

// Placeholder components for routes not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">This page is coming soon.</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  // Marketing routes
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: 'docs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Docs />
          </Suspense>
        ),
      },
      {
        path: 'docs/*',
        element: <PlaceholderPage title="Documentation Article" />,
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: 'blog/:slug',
        element: <PlaceholderPage title="Blog Post" />,
      },
      {
        path: 'changelog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Changelog />
          </Suspense>
        ),
      },
      {
        path: 'integrations',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Integrations />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: 'legal/terms',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: 'legal/privacy',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Privacy />
          </Suspense>
        ),
      },
      {
        path: 'u/:username',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UserProfile />
          </Suspense>
        ),
      },
    ],
  },
  
  // App routes (protected)
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'playground',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PlaygroundPage />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'projects/:projectId',
        element: <PlaceholderPage title="Project Workspace" />,
      },
      {
        path: 'templates',
        element: <PlaceholderPage title="Templates" />,
      },
      {
        path: 'templates/:templateId',
        element: <PlaceholderPage title="Template Details" />,
      },
      {
        path: 'community',
        element: <PlaceholderPage title="Community" />,
      },
      {
        path: 'search',
        element: <PlaceholderPage title="Search" />,
      },
      {
        path: 'profile',
        element: <PlaceholderPage title="My Profile" />,
      },
      {
        path: 'settings',
        element: <Navigate to="/app/settings/profile" replace />,
      },
      {
        path: 'settings/profile',
        element: <PlaceholderPage title="Profile Settings" />,
      },
      {
        path: 'settings/security',
        element: <PlaceholderPage title="Security Settings" />,
      },
      {
        path: 'settings/api-keys',
        element: <PlaceholderPage title="API Keys" />,
      },
      {
        path: 'settings/notifications',
        element: <PlaceholderPage title="Notification Settings" />,
      },
      {
        path: 'settings/billing',
        element: <PlaceholderPage title="Billing" />,
      },
    ],
  },

  // Organization routes (protected + org validation)
  {
    path: '/orgs/:orgId',
    element: (
      <ProtectedRoute>
        <OrgRoute>
          <AppLayout />
        </OrgRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PlaceholderPage title="Organization Dashboard" />,
      },
      {
        path: 'projects',
        element: <PlaceholderPage title="Organization Projects" />,
      },
      {
        path: 'members',
        element: <PlaceholderPage title="Team Members" />,
      },
      {
        path: 'billing',
        element: <PlaceholderPage title="Organization Billing" />,
      },
      {
        path: 'settings',
        element: <PlaceholderPage title="Organization Settings" />,
      },
    ],
  },

  // Error routes
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Page not found</p>
          <a href="/" className="text-blue-600 hover:text-blue-500">
            Go back home
          </a>
        </div>
      </div>
    ),
  },
]);
