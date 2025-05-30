import "./LoginForm2.css";
import LoginInput from "./LoginInput";
import { useRef, useEffect } from "react";
import kvLogo from "/assets/kv-logo.png";
import kvLoginImg from "/assets/kv-login.jpeg";
import Button from "./Button";

const UncontrolledLogin = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const clearButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (usernameRef?.current) {
      usernameRef.current.focus();
    }
    if (clearButtonRef.current) {
      clearButtonRef.current.disabled = true;
    }
  }, []);

  const clearUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Clear button clicked");

    if (!usernameRef.current || !clearButtonRef.current) return;

    usernameRef.current.value = "";
    clearButtonRef.current.disabled = true;

    usernameRef.current.focus();
  };

  const handleUserChange = (value: string) => {
    console.log("Username changed:", value);

    if (!clearButtonRef.current) return;

    clearButtonRef.current.disabled = value.length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="content">
      <div className="pattern-side">
        <div className="pattern" />
        <div className="circle-large">
          <div className="circle-inner">
            <img src={kvLoginImg} alt="KV Login" className="login-image" />
          </div>
        </div>
      </div>
      <div className="login-side">
        <div className="login-content">
          <img className="logo" src={kvLogo} alt="KV Logo" />
          <form onSubmit={handleSubmit}>
            <LoginInput
              id="login-username-input"
              label="Username"
              ref={usernameRef}
              onChange={(event) => {
                handleUserChange(event.target.value);
              }}
              endAdornment={
                <button
                  onClick={clearUser}
                  ref={clearButtonRef}
                  type="button"
                  disabled={false}
                >
                  Clear
                </button>
              }
            />
            <LoginInput
              id="login-password-input"
              label="Password"
              type="password"
            />
            <Button type="button" className="login-button">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UncontrolledLogin;
