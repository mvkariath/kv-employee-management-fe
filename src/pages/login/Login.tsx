import LoginForm from "../../components/login-form/LoginForm";
import "./Login.css";
import { Navigate } from "react-router-dom";

const Login = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/employee" />;
  }

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
