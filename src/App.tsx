import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./Application";
import { ApplicationContextProvider } from "./contexts/ApplicationContext";
import Callback from "./pages/Callback";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { SaveStatusProvider } from "./contexts/SaveStatusContext";

function App() {
  return (
    <ApplicationContextProvider>
      <AuthProvider>
        <SaveStatusProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              {/* <Route path="/applied" element={<Applied />} /> */}
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
        </SaveStatusProvider>
      </AuthProvider>
    </ApplicationContextProvider>
  );
}

export default App;
