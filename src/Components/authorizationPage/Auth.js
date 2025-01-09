import { useState } from "react";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import "./Auth.css";

export const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  return (
    <div
      className={`form-wrapper ${isRegister ? "show-register" : "show-login"}`}
    >
      {isRegister ? (
        <Register switchToLogin={() => setIsRegister(false)} />
      ) : (
        <Login switchToRegister={() => setIsRegister(true)} />
      )}
    </div>
  );
};
