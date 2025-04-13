import { User } from "@/redux/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/App";
import { UsersApi } from "@/generated-client";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiInstance = new UsersApi(undefined, "", axiosInstance);
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
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`https://localhost:7118/api/Users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const handleGrant = async (userId: string) => {
    try {
      await axios.post(
        `https://localhost:7118/api/Users/grant-admin/${userId}`,
      );
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
        <h2>Users List</h2>
        <div className="panel super-admin-controls">
          <div className="panel super-admin-search-filter">
            <input type="text" placeholder="Search" />
            <select>
              <option>Filters</option>
            </select>
          </div>
        </div>
      </div>
      <table className="panel super-admin-users-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Username</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.avatarUrl}</td>
              <td>{user.userName}</td>
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
