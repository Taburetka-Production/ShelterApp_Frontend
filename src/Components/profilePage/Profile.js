import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [navigateOnProfile, setnavigateOnProfile] = useState("");

  const fetchProfile = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
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
        <h1>Welcome, {profileData.userName}!</h1>
        <div className="profile-side">
          <div className="profile-personal-div">
            <h2>{profileData.userName}</h2>
          </div>
          <div className="profile-option-list">
            <button>Add shelter</button>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
          </div>
          <button onClick={handleLogout}>Вийти</button>
        </div>
        <div className="profile-content">
          <p>Email: {profileData.email}</p>
        </div>
      </div>
    </div>
  );
};
