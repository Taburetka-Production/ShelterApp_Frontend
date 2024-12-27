import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SheltersPage from './Pages/SheltersPage';
import MainPage from './Pages/MainPage';
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/mainpage" />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
      </Routes>
    </Router>
  )
}

export default App;
