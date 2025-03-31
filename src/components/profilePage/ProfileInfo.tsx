import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "./ProfileInfo.scss";

interface UserData {
  age: number;
  avatarUrl: string | null;
  email: string;
  name: string;
  phoneNumber: string;
  surname: string;
  userName: string;
}

export const ProfileInfo: React.FC = () => {
  const navigate = useNavigate();
  const handleCreateShelter = () => {
    navigate("/shelter-create");
  };
  const handleSuperAdmin = () => {
    navigate("/SuperAdminPanel");
  };
  const [editMode, setEditMode] = useState(false);
  const initialData = useOutletContext<UserData>();
  const [userData, setUserData] = useState<UserData>(initialData);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setMessage("Будь ласка, увійдіть у систему.");
      return;
    }
    try {
      await axios.put<UserData>(
        "https://localhost:7118/api/Account/info",
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setMessage("Профіль успішно оновлено.");
      setEditMode(false);
    } catch (error: any) {
      setMessage(error);
    }
  };

  return (
    <div>
      <Button onClick={handleCreateShelter} className="profile-info-btns">
        Create shelter
      </Button>
      <Button onClick={handleSuperAdmin} className="profile-info-btns">
        Super Admin Panel
      </Button>
      <div className="profileInfo-section">
        <div className="profileInfo-header">
          <h2>Profile Info</h2>
          <div>
            <Button
              onClick={() => setEditMode(!editMode)}
              className="edit-mode"
            >
              {editMode ? "Cancel" : "EDIT"}
            </Button>
            {editMode && (
              <Button onClick={handleSubmit} className="save-edit">
                Save
              </Button>
            )}
          </div>
        </div>

        <div className="profileInfo-details">
          <div className="detail-item">
            <label>Username</label>
            <input
              name="UserName"
              value={userData.userName}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="detail-item">
            <label>First Name</label>
            <input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="detail-item">
            <label>Last Name</label>
            <input
              name="surname"
              value={userData.surname || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="detail-item">
            <label>Age</label>
            <input
              name="age"
              value={userData.age}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="detail-item">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="detail-item">
            <label>Email</label>
            <input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </div>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};
