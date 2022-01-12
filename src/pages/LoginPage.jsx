import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//fire
import { useAuthContext } from "../context/AuthContext";
//style (using same style as signupPage)
import style from "../css/SignupPage.module.css";

const LoginPage = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError("Please check your credentials");
      setLoading(false);
    }
  };
  return (
    <div className={style.container}>
      <h1>Welcome to Foto-Foto!</h1>

      <form onSubmit={handleSubmit} className={style.formContainer}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        {loading ? <span>...Loading</span> : ""}
        {error ? <span>{error}</span> : ""}
        <button type="submit">Log in</button>
      </form>

      <p className={style.signupText}>
        Not a member yet?{" "}
        <Link className="links" to="/signup">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
