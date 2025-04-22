import { axiosInstance } from "@/App";
import { LoginRequest, ShelterAppApi } from "@/generated-client";
import { ROUTES } from "@/routes/routes";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";

interface LoginData {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const shelterAppApiInstance = new ShelterAppApi(
        undefined,
        "",
        axiosInstance,
      );
      const LoginRequestData: LoginRequest = {
        email: data.username,
        password: data.password,
      };
      const response = await shelterAppApiInstance.loginPost(
        false,
        false,
        LoginRequestData,
      );
      const { accessToken, refreshToken } = response.data;
      if (accessToken && refreshToken) {
        dispatch(setCredentials({ accessToken, refreshToken }));
      }
      setError("");
      navigate(ROUTES.PROFILE);
    } catch (error: any) {
      setError(error.response?.data?.message || "Виникла помилка.");
      console.error("Помилка авторізації:", error);
    }
  };

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegClick = () => {
    navigate(ROUTES.AUTH_REGISTER);
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <form onSubmit={submitForm} className="login form">
          <h2 className="login-title">Увійти</h2>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={inputData}
              required
            />
            <MdEmail className="input-icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={inputData}
              required
            />
            <FaLock className="input-icon" />
          </div>

          <div className="login-options-row">
            <span className="forgot-password-link">Забули пароль?</span>
            <div className="remember-me">
              <label htmlFor="rememberMe">Запам'ятати мене</label>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
            </div>
          </div>

          <button type="submit" className="login-button">
            Увійти
          </button>
          <p className="login-register-suggest">
            Ще немає акаунту?
            <span onClick={handleRegClick}>Зареєструватися</span>
          </p>
          {error && <p>{error}</p>}
        </form>

        <div className="login-image-container">
          <img src="/images/loginpage.svg" alt="cat and dog" />
        </div>
      </div>
    </div>
  );
};
