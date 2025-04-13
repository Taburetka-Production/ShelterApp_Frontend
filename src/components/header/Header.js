import { ROUTES } from "@/routes/routes";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("");
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const { accessToken } = useAppSelector((state) => state.auth);
  const route = accessToken ? ROUTES.PROFILE : ROUTES.AUTH_LOGIN;
  const menuItems = [
    { id: 1, name: "Головна", path: `${ROUTES.MAIN}` },
    { id: 2, name: "Притулки", path: `${ROUTES.SHELTERS_PAGE}` },
    { id: 3, name: "Увійти", path: `${ROUTES.AUTH_LOGIN}` },
    { id: 4, name: "Профіль", path: `${route}` },
  ];
  const handleIconClicked = useCallback(
    (iconName) => {
      if (iconName === "user") navigate(route);
      else if (iconName === "logo") {
        navigate(ROUTES.MAIN);
      }
    },
    [navigate, route],
  );

  const openDropdown = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMenuClass("open");
    setIsDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setMenuClass("close");
    setIsDropdownOpen(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    openDropdown();
  }, [openDropdown]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      closeDropdown();
    }, 300);
  }, [closeDropdown]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="header">
      <div
        className="header-menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
            {menuItems.map((item) => (
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
