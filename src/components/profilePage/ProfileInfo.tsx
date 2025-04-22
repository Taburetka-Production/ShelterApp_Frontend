import { ROUTES, SHELTER_NESTED_ROUTES } from "@/routes/routes";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import "./ProfileInfo.scss";
import { useAppSelector } from "@/redux/hooks";
import { axiosInstance } from "@/App";
import { AccountApi } from "@/generated-client";

interface UserData {
  age: number;
  avatarUrl: string | null;
  email: string;
  name: string;
  phoneNumber: string;
  surname: string;
  userName: string;
  roles: string[];
}

export const ProfileInfo: React.FC = () => {
  const navigate = useNavigate();
  const initialData = useOutletContext<UserData>();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<UserData>(initialData);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setUserData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setUserData({
      ...userData,
      [name]: type === "number" ? Number(value) || 0 : value,
    });
  };

  const handleCancelEdit = () => {
    setUserData(initialData);
    setEditMode(false);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setMessage("Сесія застаріла. Будь ласка, увійдіть знову.");
      return;
    }
    setIsSubmitting(true);
    setMessage("");
    try {
      const dataToSend = { ...userData };
      const apiInstance = new AccountApi(undefined, "", axiosInstance);
      await apiInstance.apiAccountInfoPut(dataToSend, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setMessage("Профіль успішно оновлено.");
      setEditMode(false);
    } catch (error: any) {
      console.error("Помилка оновлення профілю:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Помилка оновлення профілю.";
      setMessage(`Помилка: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateShelter = () => {
    navigate(`${ROUTES.SHELTER}/${SHELTER_NESTED_ROUTES.CREATE}`);
  };

  return (
    <div>
      <Button onClick={handleCreateShelter} className="profile-info-btns">
        Create shelter
      </Button>
      <div className="profileInfo-section">
        <div className="profileInfo-header">
          <h2>Profile info</h2>
          <div className="profileInfo-header-buttons">
            {!editMode && (
              <Button onClick={() => setEditMode(true)} className="edit-btn">
                Edit
              </Button>
            )}
            {editMode && (
              <>
                <Button
                  onClick={handleCancelEdit}
                  className="cancel-btn"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="save-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profileInfo-details">
          <div className="detail-item">
            <label htmlFor="profile-name">Name</label>{" "}
            <input
              id="profile-name"
              name="name"
              value={userData.name || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="detail-item">
            <label htmlFor="profile-surname">Surname</label>
            <input
              id="profile-surname"
              name="surname"
              value={userData.surname || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="detail-item">
            <label htmlFor="profile-username">Username</label>
            <input
              id="profile-username"
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="detail-item">
            <label htmlFor="profile-age">Age</label>
            <input
              id="profile-age"
              type="number"
              name="age"
              value={userData.age || 0}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="detail-item">
            <label htmlFor="profile-phone">Phone number</label>
            <input
              id="profile-phone"
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="detail-item">
            <label htmlFor="profile-email">Email address</label>
            <input
              id="profile-email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </form>
        {message && <p className="profile-info-message">{message}</p>}
      </div>
    </div>
  );
};
