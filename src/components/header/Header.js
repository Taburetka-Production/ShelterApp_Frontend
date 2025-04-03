import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  let closeTimeout;

  const items = [
    { id: 1, name: "Головна", path: "/" },
    { id: 2, name: "Притулки", path: "/shelters" },
    { id: 3, name: "Увійти", path: "/login" },
    { id: 4, name: "Профіль", path: "/profile" },
  ];

  const handleIconClicked = (iconName) => {
    if (iconName === "user") navigate("/profile");
    if (iconName === "logo") navigate("/");
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
