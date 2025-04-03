import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    name: "",
    surname: "",
    age: 0,
    phone: "",
  });
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("https://localhost:7118/register", {
        email: data.email,
        password: data.password,
      });
      await axios
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
        });
      await axios.put(
        "https://localhost:7118/api/Account/info",
        {
          userName: data.username,
          name: data.name,
          surname: data.surname,
          phoneNumber: data.phone,
          age: data.age,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setError("");
    } catch (error) {
      setError(error.response?.data.message || "An error occurred.");
    }
    navigate("/profile");
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
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={inputData}
            required
          />
          <FaUser className="auth-icon" />
        </div>
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
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={inputData}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={inputData}
          />
        </div>
        <div className="input-box">
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={inputData}
          />
        </div>
        <div className="input-box">
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            onChange={inputData}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <p className="login-register-suggest">
        Already registered?{" "}
        <span onClick={() => navigate("/login")}>Sign in</span>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};
