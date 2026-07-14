import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLogin } from "../store/slices/auth";
import axiosService from "./Axios";

import "../css/LoginForm.css";


const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .required("Username is required."),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords must match."
    )
    .required("Please confirm your password."),
});


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const { data } = await axiosService.post(
          "api/auth/register/",
          {
            username: values.username.trim(),
            email: values.email.trim(),
            password: values.password,
          }
        );
        console.log("where are you", data)


        /*
          If your backend returns tokens after registration:
          {
            access,
            refresh,
            user
          }

          the user will be logged in automatically.
        */

        if (data.access && data.refresh) {
          dispatch(
            setLogin({
              access: data.access,
              refresh: data.refresh,
              user: data.user,
            })
          );

          navigate("/home", { replace: true });
        } else {
          // If registration only creates an account
          navigate("/login", {
            replace: true,
            state: {
              message:
                "Registration successful. Please login.",
            },
          });
        }

      } catch (error) {

        const message =
          error.response?.data?.detail ||
          error.response?.data?.email?.[0] ||
          error.response?.data?.username?.[0] ||
          error.response?.data?.password?.[0] ||
          error.response?.data?.non_field_errors?.[0] ||
          "Unable to register. Please try again later.";

        setErrorMessage(message);

      } finally {
        setLoading(false);
      }
    },
  });


  return (
    <div className="container">

      <form
        className="form-container"
        onSubmit={formik.handleSubmit}
        noValidate
      >

        <div className="form">

          <h2>Create Account</h2>

          <p>
            Register for the Learning Management System.
          </p>


          <div className="form-group">

            <input
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="username"
              {...formik.getFieldProps("username")}
            />

            {formik.touched.username &&
              formik.errors.username && (
                <div className="error">
                  {formik.errors.username}
                </div>
              )}

          </div>



          <div className="form-group">

            <input
              id="email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              {...formik.getFieldProps("email")}
            />

            {formik.touched.email &&
              formik.errors.email && (
                <div className="error">
                  {formik.errors.email}
                </div>
              )}

          </div>



          <div className="form-group">

            <input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              {...formik.getFieldProps("password")}
            />

            {formik.touched.password &&
              formik.errors.password && (
                <div className="error">
                  {formik.errors.password}
                </div>
              )}

          </div>



          <div className="form-group">

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...formik.getFieldProps("confirmPassword")}
            />

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error">
                  {formik.errors.confirmPassword}
                </div>
              )}

          </div>



          {errorMessage && (
            <div className="error">
              {errorMessage}
            </div>
          )}



          <div className="button-group">

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Register"}
            </button>


            <button
              type="button"
              className="register-btn"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>

          </div>


        </div>

      </form>

    </div>
  );
};


export default RegisterForm;