import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
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

import "./App.css";

// Centralized route config (cleaner & scalable)
const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/about", element: <About /> },
  { path: "/service", element: <Service /> },
  { path: "/contact", element: <Contact /> },
  { path: "/create-new-user", element: <Create /> },
  { path: "/manage-user-account", element: <ManageUsers /> },
  { path: "/create-new-courses", element: <CreateCourses /> },
  { path: "/manage-courses", element: <ManageCourses /> },
];

function AppRoutes() {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
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