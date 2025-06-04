import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./Application";
import ContextProvider from "./components/ContextProvider";
import Callback from "./pages/Callback";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <Application />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
