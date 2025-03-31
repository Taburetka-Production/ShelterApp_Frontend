import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7118/login", {
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken } = response.data;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Tokens saved successfully!");
      }
      console.log("Login Successful:", response.data);
      setError("");
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      console.error("Login Error:", error);
    }
  };

  const inputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-and-register-div">
      <form onSubmit={submitForm} className="login form">
        <div className="sign-text-header">
          <h2>Welcome back</h2>
          <p>Please enter your details to sign in.</p>
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={inputData}
            required
          />
          <MdEmail className="auth-icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={inputData}
            required
          />
          <FaLock className="auth-icon" />
        </div>
        <div className="remember-me-forgot-password-div">
          <div>
            <input type="checkbox" />
            <label htmlFor="rememberMe" className="remember-me-label">
              Remember me
            </label>
          </div>
          <p>Forgot Password?</p>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <p className="login-register-suggest">
        Don't have an account yet?
        <span onClick={() => navigate("/register")}>Sign up</span>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};
