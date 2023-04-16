import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { PrivateRoute } from "../../private/PrivateRoute";
import { Auth } from "../../pages/Auth";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<h1>Home</h1>} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
