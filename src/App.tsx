import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Profile from './Pages/profilePage';
import MainPage from './Pages/MainPage';
import SheltersPage from './Pages/SheltersPage';
import AuthorizationPage from './Pages/authorizationPage/index';
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/mainpage" />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
        <Route path ="/authorization" element = {<AuthorizationPage />} />
        <Route path ="/profile" element = {<Profile />} />
      </Routes>
    </Router>
  )
}

export default App;
