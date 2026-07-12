import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../css/Sidebar.css';
import NavBar from '../Components/NavBar';
import StudentWelcome from '../Components/StudentWelcome';

function Home() {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <StudentWelcome />
    </div>
  );
}

export default Home
