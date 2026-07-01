import React from 'react';
import { Routes, Route } from 'react-router';
import SignUpForm from './Components/SignUpForm';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import About from './Pages/About';
import Service from './Pages/Service';
import Contact from './Pages/Contact';
import Create from './Pages/Create';
import CreateCourses from './Pages/CreateCourses';
import ManageCourses from './Pages/ManageCourses';
import ManageUsers from './Pages/ManageUsers';
import './App.css';

function App() {
  return (
    <div className="App">
      
        <Routes>
  
          <Route path='/' element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-new-user" element={<Create />} />
          <Route path="/manage-user-account" element={<ManageUsers />} />
          <Route path="/create-new-courses" element={<CreateCourses />} />
          <Route path="/manage-courses" element={<ManageCourses />} />

        </Routes>
      
    </div>
  );
}

export default App;

 
