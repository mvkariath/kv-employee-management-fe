import "../../pages/employee-form/EmployeeForm.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="create-employee-page">
      <Sidebar />
      <div className="main-content-container">
        <Topbar />
        <div className="employee-form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
