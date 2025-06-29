import assets from "../assets/assets";
import "../styles/Login/LoginPage.css";
import { useState } from "react";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [reactSignUp, setReactSignUp] = useState({
    email: "",
    password: "",
    name: "",
    terms: false,
  });
  const [reactLogin, setReactLogin] = useState({
    email: "",
    password: "",
    terms: false,
  });
  function handleLogin() {
    setIsLogin((prev) => {
      return !prev;
    });
  }

  function handleSignupSubmit(e) {
    setReactSignUp((prev) => {
      return {
        ...prev,
        [e.currentTarget.name]: e.currentTarget.value,
      };
    });
  }

  function handleLoginSubmit(e) {
    setReactLogin((prev) => {
      return {
        ...prev,
        [e.currentTarget.name]: e.currentTarget.value,
      };
    });
  }

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
                value={reactLogin.name}
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
              <button>Login Now</button>
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
                value={reactSignUp.name}
                name="name"
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
              <button>Create Account</button>
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
