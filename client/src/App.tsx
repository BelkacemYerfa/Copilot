import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { PrivateRoute } from "./private/PrivateRoute";
import { Auth } from "./pages/Auth";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedRoutes from "./components/animated/AnimatedRoutes";

function App() {
  return (
    <div className="font-Inter">
      <Router>
        <Suspense fallback={<div>loading...</div>}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
