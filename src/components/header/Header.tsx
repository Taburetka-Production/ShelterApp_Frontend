import { ROUTES } from "@/routes/routes";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaHome, FaSignInAlt, FaWarehouse } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("");
  const navigate = useNavigate();
  const timeoutRef = useRef<number | null>(null);
  const user = useAppSelector((state) => state.auth.accessToken);

  const menuItems = [
    {
      name: "Головна",
      path: `${ROUTES.MAIN}`,
      icon: <FaHome />,
    },
    {
      name: "Притулки",
      path: `${ROUTES.SHELTERS_PAGE}`,
      icon: <FaWarehouse />,
    },
    {
      name: "Увійти",
      path: `${ROUTES.AUTH_LOGIN}`,
      icon: <FaSignInAlt />,
    },
  ];

  const handleIconClicked = useCallback(
    (iconName: string) => {
      if (iconName === "user")
        user ? navigate(ROUTES.PROFILE) : navigate(ROUTES.PROFILE);
      else if (iconName === "logo") {
        navigate(ROUTES.MAIN);
      }
    },
    [navigate, user],
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
              <li key={item.path}>
                <Link to={item.path}>
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="header-divider-left"></div>
      <div className="header-divider-right"></div>

      <div className="header-logo">
        <img
          src="/images/logo.png"
          alt="ShelterHub"
          onClick={() => handleIconClicked("logo")}
        />
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
