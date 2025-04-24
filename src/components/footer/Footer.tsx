import { Link } from "react-router-dom";
import "./Footer.css";
import { ROUTES } from "@/routes/routes";

const items = [
  { id: 1, name: "Головна", path: `${ROUTES.MAIN}` },
  { id: 2, name: "Притулки", path: `${ROUTES.SHELTERS_PAGE}` },
  { id: 3, name: "Зареєструватися", path: `${ROUTES.AUTH_REGISTER}` },
  { id: 4, name: "Увійти", path: `${ROUTES.AUTH_LOGIN}` },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-items">
        <h1>Shelter Hub</h1>
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
