import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../css/Sidebar.css';
import NavBar from '../Components/NavBar';

function Home() {
  return (
    <div>
      <NavBar />  
      <Sidebar />
    </div>
  )
}

export default Home
