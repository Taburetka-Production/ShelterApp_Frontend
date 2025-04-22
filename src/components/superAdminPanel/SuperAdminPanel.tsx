import { NavLink, Outlet } from "react-router-dom";
import "./SuperAdminPanel.scss";
import { ROUTES, SUPER_ADMIN_PANEL_NESTED_ROUTES } from "@/routes/routes";

export const SuperAdminPanel: React.FC = () => {
  return (
    <div className="panel super-admin-container">
      <div className="panel super-admin-sidebar">
        <h2>SuperAdmin panel</h2>
        <nav className="panel super-admin-menu">
          <ul>
            <NavLink
              to={ROUTES.SUPER_ADMIN_PANEL}
              className={({ isActive }) => (isActive ? "link active" : "link")}
              end
            >
              Users List
            </NavLink>
            <NavLink
              to={SUPER_ADMIN_PANEL_NESTED_ROUTES.SHELTERS_LIST}
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Shelters List
            </NavLink>
            <li>Animals List</li>
            <li>Reviews List</li>
          </ul>
        </nav>
      </div>
      <div className="panel super-admin-main">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
