import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../css/Sidebar.css';
import NavBar from '../Components/NavBar';
import LoginForm from '../Components/LoginForm';

function Home() {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <LoginForm />
    </div>
  );
}

export default Home
