import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axiosService from "./Axios";
import {setAuthTokens, setAccount} from "../store/slices/auth";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (values) => {
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axiosService.post("/auth/login/", values);
      console.log("Login successful:", data);

      dispatch(
        setAuthTokens({
          token: data.access,
          refreshToken: data.refresh,
        })
      );

      dispatch(setAccount(data.user));

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const renderError = (field) =>
    formik.touched[field] &&
    formik.errors[field] && (
      <div className="error">{formik.errors[field]}</div>
    );

  return (
    <div className="container">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="form-toggle">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="form">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderError("email")}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderError("password")}

          {isLogin ? (
            <a href="/">Forgot Password?</a>
          ) : (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          )}

          {message && <div className="error">{message}</div>}

          <button type="submit" disabled={loading}>
            {loading
              ? "Logging in..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>

          {isLogin && (
            <p>
              Not a member?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setIsLogin(false)}
              >
                Sign Up Now
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;