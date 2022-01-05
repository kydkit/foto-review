import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

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
    console.log("submitting");

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
      <h1>Welcome to Photobook!</h1>

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

      <p>
        Not a member yet? Sign up{" "}
        <Link className={style.aLink} to="/signup">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
