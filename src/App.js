import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SheltersPage from './Pages/SheltersPage';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
      </Routes>
    </Router>
  );
}

export default App;