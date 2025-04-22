import { axiosInstance } from "@/App";
import {
  AccountApi,
  LoginRequest,
  RegistrationDto,
  ShelterAppApi,
} from "@/generated-client/api";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { ROUTES } from "@/routes/routes";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register: React.FC = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    name: "",
    surname: "",
    age: "",
    phone: "",
  });
  const [error, setError] = useState<string>("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validatePassword = (pwd: string): boolean => {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!pattern.test(pwd)) return false;
    return true;
  };

  const validateUsername = (name: string): boolean => {
    const allowed = /^[A-Za-z0-9\-\._@+]+$/;
    return allowed.test(name);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    if (!validatePassword(data.password)) {
      setError(
        "Пароль має бути ≥6 символів, містити велику й малу літери, цифру та спеціальний символ.",
      );
      return;
    }
    if (!validateUsername(data.username)) {
      setError(
        "Ім’я користувача може містити лише латинські букви, цифри та символи - . _ @ +",
      );
      return;
    }
    try {
      const accountApiInstance = new AccountApi(undefined, "", axiosInstance);
      const registerData: RegistrationDto = {
        email: data.email,
        password: data.password,
        userName: data.username,
        name: data.name,
        surname: data.surname,
        age: Number(data.age),
      };
      await accountApiInstance.apiAccountRegisterPost(registerData);

      const shelterAppApiInstance = new ShelterAppApi(
        undefined,
        "",
        axiosInstance,
      );
      const loginData: LoginRequest = {
        email: data.username,
        password: data.password,
      };
      const loginResponse = await shelterAppApiInstance.loginPost(
        false,
        false,
        loginData,
      );

      const { accessToken, refreshToken } = loginResponse.data;
      if (accessToken && refreshToken) {
        dispatch(setCredentials({ accessToken, refreshToken }));
      }
      navigate(ROUTES.PROFILE);
    } catch (error: any) {
      setError(error.response?.data.message || "Виникла помилка.");
    }
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
          <label htmlFor="register-email">Поштова адреса</label>
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
          <label htmlFor="register-username">Юзернейм</label>
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
          <label htmlFor="register-password">Пароль</label>
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
          <label htmlFor="register-confirmPassword">Повторити пароль</label>
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
            Пароль має бути ≥6 символів, містити велику й малу літери, цифру та
            спеціальний символ.
          </p>
        )}
        <div className="register-input-box">
          <label htmlFor="register-phone">Номер телефону</label>
          <input
            type="tel"
            id="register-phone"
            name="phone"
            value={data.phone}
            onChange={inputData}
          />
        </div>

        <div className="register-input-box">
          <label htmlFor="register-age">Вік</label>
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
