import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../style/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Roadmap", path: "/roadmap", icon: "↗" },
    { name: "Courses", path: "/courses", icon: "📚" },
    { name: "Bookmarks", path: "/bookmarks", icon: "🔖" },
    { name: "Progress", path: "/progress", icon: "📈" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">T</div>
        <h2>Trajectory</h2>
      </div>

      <p className="sidebar-heading">MAIN</p>

      <nav className="sidebar-nav">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <p className="sidebar-heading">ACCOUNT</p>

      <nav className="sidebar-nav">
        {navItems.slice(5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span className="user-icon">👤</span>
          <div>
            <p className="user-label">Signed in as</p>
            <p className="user-name">
              {user?user.user.fullname: "Account" ||"Account"}
              
              
            </p>
        
          </div>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <span className="logout-icon">⏻</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;