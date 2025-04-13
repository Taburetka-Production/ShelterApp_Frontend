import { axiosInstance } from "@/App";
import {
  AccountApi,
  LoginRequest,
  RegistrationDto,
  ShelterAppApi,
} from "@/generated-client/api";
import { ROUTES } from "@/routes/routes";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Register.css";

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  name: string;
  surname: string;
  age: number;
  phone: string;
}

export const Register: React.FC = () => {
  const [data, setData] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    name: "",
    surname: "",
    age: 0,
    phone: "",
  });
  const [error, setError] = useState<string>("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    try {
      const shelterAppApiInstance = new ShelterAppApi(
        undefined,
        "",
        axiosInstance,
      );
      const accountApiInstance = new AccountApi(undefined, "", axiosInstance);

      const registerData: RegistrationDto = {
        email: data.email,
        password: data.password,
        userName: data.username,
        name: data.name,
        surname: data.surname,
        age: data.age,
      };
      await accountApiInstance.apiAccountRegisterPost(registerData);

      const loginData: LoginRequest = {
        email: data.username,
        password: data.password,
      };
      const response = await shelterAppApiInstance.loginPost(
        false,
        false,
        loginData,
      );
      const { accessToken, refreshToken } = response.data;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    } catch (error: any) {
      setError(error.response?.data.message || "Виникла помилка.");
    }
    navigate(ROUTES.PROFILE);
  };

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLoginClick = () => {
    navigate(ROUTES.AUTH_LOGIN);
  };

  return (
    <div className="register-div">
      <form onSubmit={submitForm} className="register form">
        <div className="sign-text-header">
          <h2>Welcome!</h2>
          <p>Please enter your details to sign up.</p>
        </div>

        <div className="register-input-box">
          <label htmlFor="register-name">Name</label>
          <input
            type="text"
            id="register-name"
            name="name"
            value={data.name}
            onChange={inputData}
          />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-surname">Surname</label>
          <input
            type="text"
            id="register-surname"
            name="surname"
            value={data.surname}
            onChange={inputData}
          />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-email">Email Address</label>
          <input
            type="email"
            id="register-email"
            name="email"
            value={data.email}
            onChange={inputData}
            required
          />
          <MdEmail className="auth-icon" />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-username">Username</label>
          <input
            type="text"
            id="register-username"
            name="username"
            value={data.username}
            onChange={inputData}
            required
          />
          <FaUser className="auth-icon" />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={data.password}
            onChange={inputData}
            onClick={() => setShowPasswordRequirements(true)}
            required
          />
          <FaLock className="auth-icon" />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="register-confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={inputData}
            required
          />
          <FaLock className="auth-icon" />
        </div>

        {showPasswordRequirements && (
          <p className="password-requirements-text">
            Password must be at least 8 characters long, contain 1 upper case
            letter, 1 number, and 1 special character.
          </p>
        )}
        <div className="register-input-box">
          <label htmlFor="register-phone">Phone number</label>
          <input
            type="tel"
            id="register-phone"
            name="phone"
            value={data.phone}
            onChange={inputData}
          />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-age">Age</label>
          <input
            type="number"
            id="register-age"
            name="age"
            value={data.age}
            onChange={inputData}
          />
        </div>

        <button type="submit">Зареєструватися</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="register-suggest">
        Вже зареєстровані?
        <span onClick={handleLoginClick}>Увійти</span>
      </p>
    </div>
  );
};
