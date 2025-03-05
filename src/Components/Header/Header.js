import React, { useState, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const items = [
    { id: 1, name: "Головна", path: "/mainpage" },
    { id: 2, name: "Притулки", path: "/shelters" },
    { id: 4, name: "Увійти", path: "/authorization" },
    { id: 5, name: "Профіль", path: "/profile" },
  ];

  let closeTimeout;

  const handleIconClicked = (iconName) => {
    // console.log(`${iconName} icon clicked!`);
    iconName === "user"
      ? navigate("/profile")
      : console.log(`${iconName} icon clicked`);
    iconName === "logo"
      ? navigate("/mainpage")
      : console.log(`${iconName} icon clicked`);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setMenuClass("open");
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setMenuClass("close");
      setIsDropdownOpen(false);
    }, 300);
  };

  return (
    <header className="header">
      <div
        className="header-menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={dropdownRef}
      >
        <button className="header-menu icon-style">
          <i className="fas fa-bars"></i>
        </button>

        {isDropdownOpen && (
          <ul
            className={`dropdown-menu ${menuClass}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item) => (
              <li key={item.id}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="header-divider-left"></div>
      <div className="header-divider-right"></div>

      <div className="header-logo">
        <h1 className="logo" onClick={() => handleIconClicked("logo")}>
          lamash
        </h1>
      </div>

      <div className="header-icons">
        <button
          onClick={() => handleIconClicked("user")}
          className="header-icons icon-style"
        >
          <i className="far fa-user"></i>
        </button>
      </div>
    </header>
  );
};
