import { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import Input from "../floating-input/FloatingInput";

import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  const userNameCheck = (username: string) => {
    return {
      isInvalid: username.length > 10,
      limit: 10,
    };
  };
  const passwordCheck = (username: string) => {
    return {
      isInvalid: username.length > 15,
      limit: 15,
    };
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  useEffect(() => {
    console.log(showPass);
    localStorage.setItem("showPass", String(showPass));
  }, [showPass]);

  function loginUser() {
    {
      /*Implement the api logics logic here */
    }
    if (username == password) {
      if (credentialsError) setCredentialsError(false);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/employee");
    } else {
      setCredentialsError(true);
    }
  }

  return (
    <form className="login-form">
      <img src="/assets/kv-logo.png" height={45} width={208} />
      <Input
        ref={usernameRef}
        placeholder="Email Id "
        type="email"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        inputChecker={userNameCheck}
        endAdonment={
          <button
            className="clear-button"
            type="button"
            onClick={() => {
              setUsername("");
            }}
          >
            Clear
          </button>
        }
      />
      <Input
        placeholder="Password"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputChecker={passwordCheck}
        endAdonment={
          <button
            className="clear-button"
            type="button"
            onClick={() => {
              setPassword("");
            }}
          >
            Clear
          </button>
        }
      />

      <div className="checkbox">
        <input
          type="checkbox"
          onChange={(event) => {
            setShowPass(event.target.checked);
          }}
        ></input>
        <label>Show password</label>
      </div>
      {}
      <Button
        className="login-button"
        text="Login"
        disabled={false}
        onClick={loginUser}
      />

      {credentialsError && (
        <p className="input-error">Invalid Credentials !!</p>
      )}
    </form>
  );
};

export default LoginForm;
