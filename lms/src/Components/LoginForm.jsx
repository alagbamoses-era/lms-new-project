import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLogin } from "../store/slices/auth";
import axiosService from "./Axios";

import "../css/LoginForm.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const payload = {
          email: values.email.trim(),
          password: values.password,
        };

        const { data } = await axiosService.post("/auth/login/", payload);
        console.log("Here is the data", data)

        dispatch(
          setLogin({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
          })
        );

        navigate("/home", { replace: true });
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            error.response.data?.detail || "Invalid email or password."
          );
        } else {
          setErrorMessage(
            "Unable to connect to the server. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <form className="form-container" onSubmit={formik.handleSubmit} noValidate>
        <div className="form">
          <h2>Learning Management System</h2>
          <p>Please sign in to continue.</p>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error" role="alert">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error" role="alert">
                {formik.errors.password}
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="error" role="alert">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !formik.isValid || !formik.dirty}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;