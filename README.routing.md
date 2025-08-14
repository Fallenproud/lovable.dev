# Lovable Routing System

This document outlines the complete Information Architecture and Routing implementation for the Lovable-like product.

## 🏗️ Architecture Overview

The routing system is built using React Router v6 with the following key components:

- **MarketingLayout**: Public pages (home, pricing, docs, etc.)
- **AppLayout**: Authenticated app pages with sidebar navigation
- **Route Guards**: Authentication and organization access control
- **SEO Integration**: Meta tags, sitemaps, and robots.txt
- **Code Splitting**: Lazy-loaded pages for optimal performance

## 📁 File Structure

```
src/
├── config/
│   └── routeSpec.json          # Complete route specification
├── contexts/
│   └── AuthContext.tsx         # Authentication state management
├── components/
│   ├── guards/
│   │   ├── ProtectedRoute.tsx  # Authentication guard
│   │   └── OrgRoute.tsx        # Organization access guard
│   ├── navigation/
│   │   ├── MarketingHeader.tsx # Public site navigation
│   │   ├── AppSidebar.tsx      # App sidebar navigation
│   │   └── AppHeader.tsx       # App header with org switcher
│   └── ui/
│       └── SEOHead.tsx         # SEO meta tags component
├── layouts/
│   ├── MarketingLayout.tsx     # Public pages layout
│   └── AppLayout.tsx           # App pages layout
├── pages/
│   ├── marketing/              # Public pages
│   │   ├── Home.tsx
│   │   ├── Pricing.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   └── app/                    # App pages
│       ├── Dashboard.tsx
│       ├── Playground.tsx
│       └── Projects.tsx
├── types/
│   └── auth.ts                 # Authentication types
├── utils/
│   └── seo.ts                  # SEO utilities
└── router.tsx                  # Main router configuration
```

## 🛣️ Route Structure

### Public Routes (MarketingLayout)
- `/` - Home page
- `/pricing` - Pricing plans
- `/docs` - Documentation index
- `/docs/*` - Documentation articles
- `/blog` - Blog index
- `/blog/:slug` - Blog posts
- `/changelog` - Release notes
- `/integrations` - Integrations gallery
- `/login` - Sign in
- `/signup` - Create account
- `/forgot-password` - Password reset
- `/legal/terms` - Terms of service
- `/legal/privacy` - Privacy policy
- `/u/:username` - Public user profiles

### App Routes (AppLayout + Auth Guard)
- `/app` - Dashboard
- `/app/playground` - AI development playground
- `/app/projects` - Projects list
- `/app/projects/:projectId` - Project workspace
- `/app/templates` - Templates gallery
- `/app/templates/:templateId` - Template details
- `/app/community` - Community showcase
- `/app/search` - Global search
- `/app/profile` - User profile
- `/app/settings/*` - Settings pages
  - `/app/settings/profile` - Profile settings
  - `/app/settings/security` - Security settings
  - `/app/settings/api-keys` - API keys
  - `/app/settings/notifications` - Notifications
  - `/app/settings/billing` - Billing

### Organization Routes (AppLayout + Auth + Org Guards)
- `/orgs/:orgId` - Organization dashboard
- `/orgs/:orgId/projects` - Organization projects
- `/orgs/:orgId/members` - Team members
- `/orgs/:orgId/billing` - Organization billing
- `/orgs/:orgId/settings` - Organization settings

## 🔐 Authentication & Guards

### ProtectedRoute
- Redirects unauthenticated users to `/login`
- Preserves intended destination in `returnUrl`
- Shows loading spinner during auth check

### OrgRoute
- Validates organization access
- Redirects to `/app` if organization not found
- Works with organization switcher in app header

### Mock Authentication
The system includes a mock authentication provider for development:
- Use any email/password to "log in"
- Authentication state persists in localStorage
- Includes mock user and organization data

## 🎨 Navigation Components

### MarketingHeader
- Logo and main navigation links
- Active state highlighting
- Login/Signup buttons
- Responsive design

### AppSidebar
- Main app navigation
- Active route highlighting
- Icons from Lucide React
- Profile and settings at bottom

### AppHeader
- Organization switcher dropdown
- User menu with logout
- Breadcrumbs for deep pages

## 🔍 SEO Implementation

### SEOHead Component
- Dynamic meta tags
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- No-index for private pages

### Sitemap & Robots
- Static sitemap.xml in public/
- Robots.txt with sitemap reference
- Utility functions for dynamic generation

## 🧪 Testing

### Playwright Tests
- Navigation flow testing
- Authentication guard behavior
- Route existence verification
- 404 handling
- Organization access control

Run tests with:
```bash
npm install @playwright/test
npx playwright test
```

## 🚀 Usage

### Development
The system is designed to be non-destructive. To use the new routing:

1. **Option A**: Replace your main App component:
```tsx
// In src/index.tsx
import AppGenerated from './App.generated';
// Use AppGenerated instead of App
```

2. **Option B**: Gradually migrate routes:
```tsx
// Import specific components as needed
import { MarketingLayout } from './layouts/MarketingLayout';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
```

### Authentication Integration
To integrate with real authentication:

1. Replace mock data in `AuthContext.tsx`
2. Implement real API calls in login/logout functions
3. Add JWT token handling
4. Update user/organization data fetching

### Organization Management
To add real organization features:

1. Implement organization API endpoints
2. Add organization creation/management UI
3. Update organization switching logic
4. Add role-based permissions

## 📋 Next Steps

1. **Content Management**: Add MDX support for docs and blog
2. **Real Authentication**: Integrate with your auth provider
3. **Organization Features**: Implement team management
4. **Search**: Add global search functionality
5. **Analytics**: Add page view tracking
6. **Performance**: Implement route-based code splitting
7. **Accessibility**: Add ARIA labels and keyboard navigation
8. **Internationalization**: Add multi-language support

## 🔧 Configuration

The routing system is highly configurable through:

- `routeSpec.json`: Complete route definitions
- `AuthContext.tsx`: Authentication behavior
- `router.tsx`: Route configuration
- `seo.ts`: SEO defaults and utilities

All components follow TypeScript best practices and include proper error handling.
