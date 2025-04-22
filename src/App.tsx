import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./components/routes/AppRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>
);

export default App;
