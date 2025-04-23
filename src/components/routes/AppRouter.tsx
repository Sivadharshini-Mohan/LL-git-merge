import { RouterProvider, createRootRoute, createRouter, createRoute } from '@tanstack/react-router';
import LandingPage from '../../pages/LandingPage';
import CodeAnalyseCompleted from '../code-analysis/CodeAnalyseCompleted';
import { MainLayout } from '../layout/MainLayout';

// Create a root route
const rootRoute = createRootRoute({
  component: MainLayout,
});

// Define the routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const codeAnalysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/code-analyis',
  component: CodeAnalyseCompleted,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, codeAnalysisRoute]);

// Create the router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Router component
export function AppRouter() {
  return <RouterProvider router={router} />;
}
