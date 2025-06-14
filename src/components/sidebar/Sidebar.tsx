import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface NavItems {
  label: string;
  link: string;
  icon: string;
}
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function isLinkActive(path: string) {
    return (
      location.pathname.split("/").slice(-1)[0] === path ||
      (location.pathname.split("/").slice(-1)[0] === "employee" && !path)
    );
  }

  const navItems: NavItems[] = [
    {
      label: "Employee List",
      link: "",
      icon: "icon",
    },
    // {
    //   label: "Create Employee",
    //   link: "create",
    // },
    {
      label: "My Profile",
      link: "profile",
      icon: "user",
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img alt="kv-logo" src="/assets/kv-logo.png" />
      </div>
      {navItems.map((navItem) => {
        return (
          <nav>
            <div
              className={`nav-item ${
                isLinkActive(navItem.link) ? "" : "inactive"
              }`}
            >
              <div className="nav-item-icon">
                <img alt="users icon" src={`/assets/${navItem.icon}.svg`} />
              </div>
              <Link
                to={navItem.link}
                className={`nav-link ${
                  isLinkActive(navItem.link) ? "" : "inactive"
                }`}
              >
                {navItem.label}
              </Link>
            </div>
          </nav>
        );
      })}

      <button onClick={handleLogout} className="logout-button">
        {/* <img src="/assets/logout.svg" height={70} width={70} /> */}
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
