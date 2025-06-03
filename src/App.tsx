import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./Application";
import ContextProvider from "./components/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Application />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
