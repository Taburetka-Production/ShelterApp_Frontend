import { axiosInstance } from "@/App";
import { AccountApi } from "@/generated-client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { User } from "@/redux/types";
import {
  PROFILE_NESTED_ROUTES,
  ROUTES,
  SHELTER_NESTED_ROUTES,
} from "@/routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaCog, FaPaw, FaUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Profile.scss";
import { Button } from "../button/Button";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const { accessToken } = useAppSelector((state) => state.auth);

  const fetchProfile = async (): Promise<User> => {
    const apiInstance = new AccountApi(undefined, "", axiosInstance);
    const response = (await apiInstance.apiAccountInfoGet({
      headers: { Authorization: `Bearer ${accessToken}` },
    })) as unknown as AxiosResponse<User>;
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfile();
        setUserData(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 400) {
            setError("Потрібно залогінитися");
            navigate(ROUTES.AUTH_LOGIN);
            return;
          }
          setError(err.response?.data?.message || err.message);
          console.error("AxiosError:", err);
          return;
        }
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Невідома помилка завантаження профілю.");
        }
        console.error("Помилка:", err);
      }
    };

    if (accessToken) {
      fetchData();
    } else {
      navigate(ROUTES.AUTH_LOGIN);
    }
  }, [accessToken, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.AUTH_LOGIN);
  };

  const handleCreateShelter = () => {
    navigate(`${ROUTES.SHELTER}/${SHELTER_NESTED_ROUTES.CREATE}`);
  };

  if (error && !userData) {
    return <div className="profile-page-message">{error}</div>;
  }

  if (!userData) {
    return <div className="profile-page-message">Загрузка профілю...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-wrapper">
          <div className="profile-side">
            <div className="profile-side user">
              <div className="profile-user-photo">
                <img
                  src={
                    userData.avatarUrl ||
                    `${process.env.PUBLIC_URL}/images/user.png`
                  }
                  alt={`${userData.userName} avatar`}
                />
                {/* <input type="file" accept="image/*" style={{ display: "none" }} /> */}
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
                      to={`${ROUTES.PROFILE}`}
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                      end
                    >
                      <FaUserCircle />
                      <span>Інформація</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${ROUTES.PROFILE}/${PROFILE_NESTED_ROUTES.FAVORITES}`}
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                    >
                      <FaPaw />
                      <span>Улюблені</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${ROUTES.PROFILE}/${PROFILE_NESTED_ROUTES.NOTIFICATION}`}
                      className={({ isActive }) =>
                        isActive ? "link active" : "link"
                      }
                    >
                      <MdOutlineMail />
                      <span>Повідомлення</span>
                    </NavLink>
                  </li>
                  {userData.roles?.includes("SuperAdmin") && (
                    <li>
                      <NavLink
                        to={`${ROUTES.SUPER_ADMIN_PANEL}`}
                        className={({ isActive }) =>
                          isActive ? "link active" : "link"
                        }
                      >
                        <FaCog />
                        <span>Панель СуперАдміна</span>
                      </NavLink>
                    </li>
                  )}
                </ul>
                <button onClick={handleLogout} className="profile-logout-btn">
                  <BiLogOut className="logout-icon" />
                  <span>Вийти</span>{" "}
                </button>
                {/* <Button
                  onClick={handleCreateShelter}
                  className="profile-info-btns"
                >
                  Створити притулок
                </Button> */}
              </nav>
            </div>
          </div>
          <div className="profile-content">
            <Outlet context={userData} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
