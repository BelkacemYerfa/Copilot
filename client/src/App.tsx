import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AnimatedRoutes from "./components/animated/AnimatedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider, initialState } from "./context/GlobalContext";
import Loader from "./components/shared/loader/Loader";

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
          <Suspense fallback={<Loader />}>
            <GlobalProvider
              user={initialState.user}
              theme={initialState.theme}
              creaptedCode={initialState.creaptedCode}
            >
              <AnimatedRoutes />
            </GlobalProvider>
          </Suspense>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
