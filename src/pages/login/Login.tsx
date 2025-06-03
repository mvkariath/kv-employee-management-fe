import { useEffect } from "react";
import LoginForm from "../../components/login-form/LoginForm";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      console.log("navigating");
      navigate("/employee");
    }
  }, []);

  return (
    <div className="main-container">
      <div className="image-container">
        <div className="circle">
          <img alt="workers image" src="./assets/kv-login.jpeg" />
        </div>
      </div>
      <div className="form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
