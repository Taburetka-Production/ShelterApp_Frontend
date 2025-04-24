import { axiosInstance } from "@/App";
import { UsersApi } from "@/generated-client";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/redux/types";
// import { User } from "@/generated-client/api";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import "./Users.scss";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiInstance = new UsersApi(undefined, "", axiosInstance);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        const response =
          (await apiInstance.apiUsersAllUsersGet()) as unknown as AxiosResponse<
            User[]
          >;
        setUsers(response.data);
      } catch (error) {
        console.error("Помилка:", error);
      }
    };
    fetchUsers();
  }, [accessToken]);

  const handleDelete = async (userId: string) => {
    try {
      const apiInstance = new UsersApi(undefined, "", axiosInstance);
      await apiInstance.apiUsersUserIdDelete(userId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const handleGrant = async (userId: string) => {
    try {
      const apiInstance = new UsersApi(undefined, "", axiosInstance);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
      await apiInstance.apiUsersGrantAdminIdPost(userId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, roles: ["ShelterAdmin"] } : user,
        ),
      );
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert(error.response.data);
      } else {
        console.error("Помилка", error);
      }
    }
  };
  const confirmDelete = () => {
    if (selectedUserId) {
      handleDelete(selectedUserId);
      setSelectedUserId(null);
      setShowModal(false);
    }
  };

  const openDeleteModal = (userId: string) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  return (
    <div>
      <div className="panel super-admin-header">
        <h2>Список користувачів</h2>
        <div className="panel super-admin-controls">
          <div className="panel super-admin-search-filter">
            <input type="text" placeholder="Search" />
            <select>
              <option>Фільтри</option>
            </select>
          </div>
        </div>
      </div>
      <table className="panel super-admin-users-table">
        <thead>
          <tr>
            <th>Аватар</th>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Вік</th>
            <th>Пошта</th>
            <th>Ролі</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="panel super-admin-user-avatar-container">
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : `${process.env.PUBLIC_URL}/images/user.png`
                  }
                  alt={`${user.name}'s avatar`}
                  className="panel super-admin-user-avatar"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>
                <button
                  className="panel super-admin-action-btn delete"
                  onClick={() => openDeleteModal(user.id)}
                >
                  Delete
                </button>
                <button
                  className="panel super-admin-action-btn"
                  onClick={() => handleGrant(user.id)}
                >
                  Upgrade
                </button>
                <button className="panel super-admin-action-btn">Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="panel modal">
          <div className="panel modal-window">
            <h3>Ви впевнені?</h3>
            <button onClick={confirmDelete} style={{ marginRight: "10px" }}>
              Так
            </button>
            <button onClick={() => setShowModal(false)}>Скасувати</button>
          </div>
        </div>
      )}
    </div>
  );
};
