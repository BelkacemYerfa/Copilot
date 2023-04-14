import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { PrivateRoute } from "./private/PrivateRoute";
import { Auth } from "./pages/Auth";
import { Suspense } from "react";

function App() {
  return (
    <div className="font-Inter">
      <Router>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<h1>Home</h1>} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
