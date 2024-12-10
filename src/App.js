import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SheltersPage from './Pages/SheltersPage';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Main Page</Link>
        <Link to="/shelters">Shelters Page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
      </Routes>
    </Router>
  );
}

export default App;