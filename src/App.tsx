import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./Application";
import { ApplicationContextProvider } from "./contexts/ApplicationContext";
import Callback from "./pages/Callback";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { SubmittedRoute } from "./components/SubmittedRoute/SubmittedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { EnumsProvider } from "./contexts/EnumsContext";
import Submitted from "./pages/Submitted";

function App() {
  return (
    <ApplicationContextProvider>
      <AuthProvider>
        <EnumsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route
                path="/submitted"
                element={
                  <SubmittedRoute>
                    <Submitted />
                  </SubmittedRoute>
                }
              />
              <Route
                path="/apply/:section"
                element={
                  <ProtectedRoute>
                    <Application />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </EnumsProvider>
      </AuthProvider>
    </ApplicationContextProvider>
  );
}

export default App;
