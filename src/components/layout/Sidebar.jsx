import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "홈",
      path: "/",
      icon: "⌂",
    },
    {
      label: "게시물 만들기",
      path: "/create",
      icon: "＋",
    },
    {
      label: "프로필",
      path: "/profile",
      icon: "◎",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar-logo">BlogFeed</h1>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="sidebar-logout"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </aside>
  );
}

export default Sidebar;