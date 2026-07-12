import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";

import LoginForm from "./Components/LoginForm";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";
import Create from "./Pages/Create";
import CreateCourses from "./Pages/CreateCourses";
import ManageCourses from "./Pages/ManageCourses";
import ManageUsers from "./Pages/ManageUsers";
import Courses from "./Pages/Courses";

import "./App.css";
import EditUser from "./Pages/ManageUsers";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated
  );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public route */}
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />

      <Route
        path="/service"
        element={
          <ProtectedRoute>
            <Service />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-new-user"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-user-account"
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-new-courses"
        element={
          <ProtectedRoute>
            <CreateCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-courses"
        element={
          <ProtectedRoute>
            <ManageCourses />
          </ProtectedRoute>
        }
      />

      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;