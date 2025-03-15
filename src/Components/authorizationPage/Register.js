import axios from "axios";
import { useState } from "react";
import "./Register.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Register = ({ switchToLogin }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("https://localhost:7118/register", {
        // username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log("Registration Successful:", response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred.");
    }
    switchToLogin();
  };

  const inputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-and-register-div">
      <form onSubmit={submitForm} className="register form">
        <div className="sign-text-header">
          <h2>Welcome!</h2>
          <p>Please enter your details to sign up.</p>
        </div>
        {/* <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={inputData}
            required
          />
          <FaUser className="auth-icon" />
        </div> */}
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={inputData}
            required
          />
          <MdEmail className="auth-icon" />
        </div>
        {showPasswordRequirements && (
          <p className="password-requirements-text">
            At least 1 upper case letter, 1 special character and 1 number
          </p>
        )}
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={inputData}
            onClick={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            required
          />
          <FaLock className="auth-icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={inputData}
            required
          />
          <FaLock className="auth-icon" />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <p className="login-register-suggest">
        Already registered? <span onClick={switchToLogin}>Sign in</span>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};
