import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login = ({ switchToRegister }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
  
    axios
      .post("https://localhost:7118/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
  
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          console.log("Tokens saved successfully!");
        }
  
        console.log("Login Successful:", response.data);
        setError("");
        navigate('/profile')
      })
      .catch((error) => {
        setError(error.response?.data?.message || "An error occurred.");
        console.error("Login Error:", error);
      });
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
        <label htmlFor="email">E-mail Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          onChange={inputData}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="• • • • • • • •"
          onChange={inputData}
          required
        />
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
      <p>
        Don't have an account yet? <span onClick={switchToRegister}>Sign up</span>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};
