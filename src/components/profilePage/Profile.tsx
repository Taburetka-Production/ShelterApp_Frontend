import { User } from "@/redux/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Profile.css";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const fetchProfile = async (): Promise<User> => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Please log in.");
    }
    const response = await axios.get<User>(
      "https://localhost:7118/api/Account/info",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfile();
        setUserData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-h2">Welcome {userData.userName}</h2>
        <div className="profile-wrapper">
          <div className="profile-side">
            <div className="profile-side user">
              <div className="profile-user-photo">
                <img
                  src={
                    userData.avatarUrl
                      ? userData.avatarUrl
                      : `${process.env.PUBLIC_URL}/images/user.png`
                  }
                  alt="You"
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                ></input>
              </div>
              <div className="profile-user-information">
                <h2 className="profile-h2">{userData.userName}</h2>
              </div>
            </div>
            <div className="profile-side navigation">
              <nav>
                <ul>
                  <li>
                    <NavLink
                      to="."
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                      end
                    >
                      Profile Info
                    </NavLink>
                  </li>
                  <li className="profile-nav-element">
                    <NavLink
                      to="pets"
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                    >
                      Pets
                    </NavLink>
                  </li>
                  <li className="profile-nav-element">
                    <NavLink
                      to="transactions"
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                    >
                      Transactions
                    </NavLink>
                  </li>
                  <li className="profile-nav-element">
                    <NavLink
                      to="tracked"
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                    >
                      Tracked
                    </NavLink>
                  </li>
                </ul>
                <button
                  onClick={() => handleLogout()}
                  className="profile-logout-btn"
                >
                  <BiLogOut className="logout-icon" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          <div className="profile-content">
            <Outlet context={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};
