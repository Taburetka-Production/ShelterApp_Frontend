import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SheltersPage from './Pages/SheltersPage';
import MainPage from './Pages/MainPage';
import "./styles/main.scss";
import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7118/',
});
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
