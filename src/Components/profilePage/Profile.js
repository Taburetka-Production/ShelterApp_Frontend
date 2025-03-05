import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink , Outlet, useNavigate } from "react-router-dom";
import "./Profile.css";
import { BiLogOut } from "react-icons/bi";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Please log in.");
    }
  
    const response = await axios.get("https://localhost:7118/api/UserInfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfile();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchData();
  }, []);
  
  if (error) {
    return <div>{error}</div>;
  }
  
  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/authorization");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Welcome {profileData.userName}</h2>
        <div className="profile-wrapper">
          <div className="profile-side">
            <div className="profile-side user">
              <div className="profile-user-photo">
              <img src={profileData.avatarUrl ? profileData.avatarUrl : `${process.env.PUBLIC_URL}/images/user.png`} alt="You"/>
                <input type="file" accept="image/*" style={{ display: "none" }}></input>
              </div>
              <div className="profile-user-information">
                <h2>{profileData.userName}</h2>
              </div>
            </div>
            <div className="profile-side navigation">
              <nav>
                <ul>
                  <li>
                    <NavLink  to="/profile/" className={({ isActive }) => (isActive ? 'link active' : 'link')} end>Profile Info</NavLink >
                  </li>
                  <li className="profile-nav-element">
                    <NavLink  to="/profile/pets" className={({ isActive }) => (isActive ? 'link active' : 'link')}>Pets</NavLink >
                  </li>
                  <li className="profile-nav-element">
                    <NavLink  to="/profile/transactions" className={({ isActive }) => (isActive ? 'link active' : 'link')}>Transactions</NavLink >
                  </li>
                  <li className="profile-nav-element">
                    <NavLink  to="/profile/tracked" className={({ isActive }) => (isActive ? 'link active' : 'link')}>Tracked</NavLink >
                  </li>
                </ul>
                <button onClick={() => handleLogout()} className="profile-logout-btn"><BiLogOut className="logout-icon"/>Logout</button>
              </nav>
            </div>
          </div>
          <div className="profile-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
