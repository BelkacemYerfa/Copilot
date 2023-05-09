import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AnimatedRoutes from "./components/animated/AnimatedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, initialState } from "./context/authContext";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <div className="font-Inter">
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <AuthProvider user={initialState.user} theme={initialState.theme}>
              <AnimatedRoutes />
            </AuthProvider>
          </Suspense>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
