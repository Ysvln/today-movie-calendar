import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./routers";
import Loading from "./components/Loading";
import AsyncBoundary from "./components/AsyncBoundary";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
      },
    },
  });
  return (
    <AsyncBoundary suspenseFallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AsyncBoundary>
  );
}

export default App;
