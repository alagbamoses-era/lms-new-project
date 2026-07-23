import { Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";

import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Create from "./Pages/Create";
import CreateCourses from "./Pages/CreateCourses";
import ManageCourses from "./Pages/ManageCourses";
import ManageUsers from "./Pages/ManageUsers";
import Courses from "./Pages/Courses";

import "./App.css";

function ProtectedRoute({ children }) {
  const isAuthenticated =
    useSelector((state) => state.auth?.isAuthenticated) ?? false;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const isAuthenticated =
    useSelector((state) => state.auth?.isAuthenticated) ?? false;

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

const protectedRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/courses", element: <Courses /> },
  { path: "/create-new-user", element: <Create /> },
  { path: "/manage-user-account", element: <ManageUsers /> },
  { path: "/create-new-courses", element: <CreateCourses /> },
  { path: "/manage-courses", element: <ManageCourses /> },
];

function AppRoutes() {
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login Page */}
      <Route path="/login" element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        }
      />

      {/* Register Page */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterForm />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<div className="loading">Loading application...</div>}
      >
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;