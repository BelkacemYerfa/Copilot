import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { PrivateRoute } from "../../private/PrivateRoute";
import { Auth } from "../../pages/Auth";
import NotFound from "../../pages/NotFound";
import { HomeWrapper } from "../../pages/HomeWrapper";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="room/:id" element={<HomeWrapper />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
