import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SheltersPage from "./Pages/SheltersPage";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
