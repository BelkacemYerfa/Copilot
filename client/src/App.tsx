import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AnimatedRoutes from "./components/animated/AnimatedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div className="font-Inter">
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <AnimatedRoutes />
          </Suspense>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
