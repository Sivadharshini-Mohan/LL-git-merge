import { router } from "../components/routes/AppRouter";

/**
 * Navigates to the code analysis page
 */
export const navigateToCodeAnalysis = () => {
  router.navigate({ to: "/code-analyis" });
};

/**
 * Navigates to the projects (home) page
 */
export const navigateToProjects = () => {
  router.navigate({ to: "/" });
};

/**
 * Navigation utility that can be used for any route
 * @param path The path to navigate to
 * @param params Optional route parameters
 */
export const navigateTo = (path: string, params?: Record<string, string>) => {
  router.navigate({ 
    to: path,
    params
  });
}; 