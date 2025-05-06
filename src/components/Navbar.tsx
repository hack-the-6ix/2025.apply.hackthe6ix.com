import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
      <Link to="/about-you" style={{ margin: '0 1rem' }}>About You</Link>
      <Link to="/experiences" style={{ margin: '0 1rem' }}>Experiences</Link>
      <Link to="/long-answer" style={{ margin: '0 1rem' }}>Long Answer</Link>
      <Link to="/survey" style={{ margin: '0 1rem' }}>Survey</Link>
      <Link to="/review" style={{ margin: '0 1rem' }}>Review</Link>
    </nav>
  );
}
