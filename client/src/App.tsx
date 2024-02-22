import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
// import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./routers";
import Loading from "./components/Loading";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
        <RouterProvider router={router} />
        <ReactQueryDevtools />
        {/* </ErrorBoundary> */}
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
