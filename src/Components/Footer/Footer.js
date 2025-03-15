import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const items = [
    { id: 1, name: "Головна", path: "/mainpage" },
    { id: 2, name: "Притулки", path: "/shelters" },
    { id: 3, name: "Зареєструватися", path: "/authorization" },
    { id: 4, name: "Увійти", path: "/authorization" },
  ];

  return (
    <footer className="footer">
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
    </footer>
  );
};
