import { useEffect } from "react";
import LoginForm from "../../components/login-form/LoginForm";
import useMousePointer from "../../hooks/useMousePointer";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const mousePointer = useMousePointer();
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
          <div className="coordinates-card">
            <p>
              X Coordinate -<span>{mousePointer.locX}</span>{" "}
            </p>
            <p>
              Y Coordinate - <span>{mousePointer.locY}</span>
            </p>
          </div>

          <img alt="workers image" src="./assets/kv-login.jpeg" />
        </div>
      </div>
      <div className="form-container">
        <LoginForm />
        <>{/* <UncontrolledLogin /> */}</>
      </div>
    </div>
  );
};

export default Login;
