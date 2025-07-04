import assets from "../assets/assets";
import "../styles/Login/LoginPage.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function LoginPage() {
  const { signUp, login, showUser, authUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [reactSignUp, setReactSignUp] = useState({
    email: "",
    password: "",
    fullName: "",
    terms: false,
  });
  const [reactLogin, setReactLogin] = useState({
    email: "",
    password: "",
    terms: false,
  });
  const navigate = useNavigate();
  function handleLogin() {
    setIsLogin((prev) => {
      return !prev;
    });
  }

  function handleSignupSubmit(e) {
    setReactSignUp((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  }

  function handleLoginSubmit(e) {
    setReactLogin((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  }

  useEffect(() => {
    showUser();
  }, []);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  return (
    <section className="login">
      <div className="login-left">
        <img src={assets.logo_big} alt="logo" />
      </div>
      <div className="login-right">
        <div className="login-header">
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        </div>
        <form className="login-form">
          {isLogin ? (
            <>
              <input
                onChange={handleLoginSubmit}
                value={reactLogin.email}
                name="email"
                placeholder="Email Address"
                type="text"
              />
              <input
                onChange={handleLoginSubmit}
                value={reactLogin.password}
                name="password"
                placeholder="Password"
                type="text"
              />
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await login(reactLogin);
                  navigate("/");
                }}
              >
                Login Now
              </button>
              <label htmlFor="">
                <input
                  onChange={handleLoginSubmit}
                  value={reactLogin.terms}
                  name="terms"
                  type="checkbox"
                />
                agree the terms of use & privacy policy
              </label>
              <p>
                Create an account?
                <span onClick={handleLogin}>click here</span>
              </p>
            </>
          ) : (
            <>
              <input
                onChange={handleSignupSubmit}
                value={reactSignUp.fullName}
                name="fullName"
                placeholder="Full Name"
                type="text"
              />
              <input
                onChange={handleSignupSubmit}
                value={reactSignUp.email}
                name="email"
                placeholder="Email Address"
                type="text"
              />
              <input
                onChange={handleSignupSubmit}
                value={reactSignUp.password}
                name="password"
                placeholder="password"
                type="text"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  signUp(reactSignUp);
                  isLogin(true);
                }}
              >
                Create Account
              </button>
              <label htmlFor="">
                <input
                  onChange={handleSignupSubmit}
                  value={reactSignUp.terms}
                  name="terms"
                  type="checkbox"
                />
                agree the terms of use & privacy policy
              </label>
              <p>
                Already have an account?
                <span onClick={handleLogin}>Login here</span>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
