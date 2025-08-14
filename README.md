# Lovable - AI-Powered Development Platform

> Create apps and websites by chatting with AI

## 🚀 Overview

Lovable is an AI-powered development platform that allows users to create full-stack applications through natural language conversations. Built with React, TypeScript, and modern web technologies, it provides an intuitive interface for both beginners and experienced developers to bring their ideas to life.

## ✨ Features

### Current Implementation
- **🏠 Landing Page**: Beautiful marketing site with community showcase
- **🔐 Authentication System**: Mock auth with user/organization management
- **🧭 Complete Routing**: 40+ routes with SEO optimization
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🎨 Component Library**: Reusable UI components with consistent styling

### In Development
- **🤖 AI Playground**: Interactive development environment with real-time preview
- **💬 AI Chat Interface**: Contextual conversations for code generation and editing
- **📁 Project Management**: Full project lifecycle management
- **🔧 Code Editor**: Integrated Monaco editor with syntax highlighting
- **👀 Live Preview**: Real-time preview of generated applications

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6 with lazy loading
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Testing**: Playwright for E2E testing
- **SEO**: React Helmet Async

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── navigation/     # Navigation components
│   ├── sections/       # Page sections
│   ├── ui/            # Base UI components
│   └── guards/        # Route protection
├── contexts/          # React contexts
├── data/             # Static data and configurations
├── layouts/          # Page layouts
├── pages/            # Page components
│   ├── marketing/    # Public pages
│   └── app/         # Authenticated app pages
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── router.tsx       # Route configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd lovable

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npx playwright test
```

## 🎯 Current Status

### ✅ Completed
- [x] Landing page with community showcase
- [x] Complete routing system (40+ routes)
- [x] Authentication context and guards
- [x] Marketing layout with navigation
- [x] App layout with sidebar navigation
- [x] SEO optimization with meta tags
- [x] Responsive design system
- [x] Basic app pages (Dashboard, Projects)
- [x] E2E testing setup

### 🚧 In Progress
- [ ] AI Playground environment
- [ ] Real-time code preview
- [ ] AI chat interface
- [ ] Project file management
- [ ] Code editor integration

### 📋 Planned
- [ ] Template system
- [ ] Community features
- [ ] Real authentication
- [ ] Database integration
- [ ] Deployment pipeline

## 🎮 Usage

### Navigation
The application has two main layouts:

1. **Marketing Layout** (`/`): Public pages including home, pricing, docs
2. **App Layout** (`/app/*`): Authenticated application with sidebar navigation

### Authentication
Currently uses mock authentication for development:
- Any email/password combination will log you in
- Two mock organizations: "Personal" (free) and "Acme Corp" (pro)
- Authentication state persists in localStorage

### Key Routes
- `/` - Landing page
- `/pricing` - Pricing plans
- `/login` - Sign in
- `/app` - Dashboard (requires auth)
- `/app/playground` - AI development environment (requires auth)
- `/app/projects` - Project management (requires auth)

## 🔧 Configuration

### Environment Variables
```bash
# Add to .env.local
VITE_API_URL=your_api_url
VITE_AUTH_PROVIDER=your_auth_provider
```

### Routing
Routes are defined in `src/router.tsx` with lazy loading for optimal performance. The complete route specification is available in `src/config/routeSpec.json`.

### SEO
SEO configuration is handled through the `SEOHead` component with support for:
- Dynamic titles and descriptions
- Open Graph tags
- Twitter Cards
- Canonical URLs
- Sitemap generation

## 🧪 Testing

### E2E Testing with Playwright
```bash
# Install Playwright
npm install @playwright/test

# Run tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui
```

Test coverage includes:
- Navigation flows
- Authentication guards
- Route protection
- Organization switching
- 404 handling

## 🚀 Deployment

### Build
```bash
npm run build
```

### Static Hosting
The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Ensure all tests pass
4. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Component-first architecture
- Responsive design principles
- Accessibility best practices

## 📚 Documentation

- [Routing System](./README.routing.md) - Complete routing documentation
- [Component Guide](./docs/components.md) - Component usage guide
- [API Reference](./docs/api.md) - API documentation
- [Deployment Guide](./docs/deployment.md) - Deployment instructions

## 🗺️ Roadmap

See [TODO.md](./TODO.md) for detailed development roadmap and task breakdown.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by bolt.new's innovative AI development approach
- Built with modern React and TypeScript best practices
- Designed with accessibility and performance in mind

---

**Note**: This is a development version with mock authentication and placeholder content. See TODO.md for production readiness tasks.
