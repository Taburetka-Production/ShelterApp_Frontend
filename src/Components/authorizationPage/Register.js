import axios from "axios";
import { useState } from "react";
import "./Register.css";

export const Register = ({ switchToLogin }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     const apiInstance = new Register(undefined, "", axiosInstance);
  //     const { data } = await apiInstance.SheltersGet();
  //     setData(data);
  //   })();
  // }, []);

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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username..."
          onChange={inputData}
          required
        />
        <label htmlFor="email">E-mail Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          onChange={inputData}
          required
        />
        <label htmlFor="password">Password</label>
        {showPasswordRequirements && <p className="password-requirements-text">At least 1 upper case letter, 1 special character and 1 number</p>}
        <input
          type="password"
          name="password"
          placeholder="• • • • • • • •"
          onChange={inputData}
          onClick={() => setShowPasswordRequirements(true)}
          onBlur={() => setShowPasswordRequirements(false)}
          required
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="• • • • • • • •"
          onChange={inputData}
          required
        />
        <button type="submit">Sign up</button>
      </form>
      <p>
        Already registered? <span onClick={switchToLogin}>Sign in</span>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};
