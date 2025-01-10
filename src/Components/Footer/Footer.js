import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const items = [
    { id: 1, name: "Main page", path: "/mainpage" },
    { id: 2, name: "Shelters", path: "/shelters" },
    { id: 3, name: "Sign up", path: "/authorization" },
    { id: 4, name: "Sign in", path: "/authorization" },
  ];

  return (
    <footer class="footer">

      <div className="footer-items">
        <h1>Logo</h1>
        <ul className="footer-links">
          {items.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className = "footer-photo-container">
        <img src="/images/10.png" alt="Description" />
        <img src="/images/11.png" alt="Description" />
      </div>
      

    </footer>
  );
};
