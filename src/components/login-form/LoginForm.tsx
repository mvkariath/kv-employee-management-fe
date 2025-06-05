import { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import Input from "../floating-input/FloatingInput";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api-services/auth/login.api";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [inputValidationError, setInputValidationError] =
    useState<boolean>(false);
  const [credentialsError, setCredentialsError] = useState(false);

  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  const userNameCheck = (username: string) => {
    return {
      isInvalid: username.length > 20,
      limit: 20,
    };
  };
  const passwordCheck = (username: string) => {
    return {
      isInvalid: username.length > 20,
      limit: 20,
    };
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  useEffect(() => {
    console.log(showPass);
    localStorage.setItem("showPass", String(showPass));
  }, [showPass]);

  async function loginUser() {
    console.log(username, password);
    login({ email: username, password: password })
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", response.accessToken);
        navigate("/employee");
      })
      .catch((error) => {
        console.log("this si terror of login ", error);
        setCredentialsError(error.data.message);
      });
  }

  return (
    <form className="login-form">
      <img src="/assets/kv-logo.png" height={45} width={208} />
      <Input
        ref={usernameRef}
        setInputValidationError={setInputValidationError}
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
        className={`login-button ${
          isLoading || inputValidationError ? "disabled" : ""
        }`}
        text={isLoading ? "Loading.." : "Login"}
        disabled={isLoading}
        onClick={loginUser}
      />
      {credentialsError && (
        <p className="input-error">Invalid Credentials !!</p>
      )}
    </form>
  );
};

export default LoginForm;
