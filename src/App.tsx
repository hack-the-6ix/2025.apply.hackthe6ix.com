import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutYou from './pages/AboutYou';
import Experiences from './pages/Experiences';
import LongAnswer from './pages/LongAnswer';
import Survey from './pages/Survey';
import Review from './pages/Review';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-you" element={<AboutYou />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/long-answer" element={<LongAnswer />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
