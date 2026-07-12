import React from 'react'
import '../css/Courses.css'

function Courses() {
  return (
    <div className="about-container">
      <section className="hero">
        <h1>Courses</h1>
        <p>
          Here at our learning platform, we offer a wide range of courses designed to help you acquire new skills and knowledge. Our courses are created by industry experts and cover various topics to cater to different learning needs.   
          We are passionate about providing best learning and building innovative digital solutions that
          help businesses grow and succeed in today's competitive world.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Project Management</li>
            <li>✔ Business Analysis</li>
            <li>✔ Software Development</li>
            <li>✔ Machine Learning</li>
            <li>✔ Data Analysis</li>
          </ul>
        </div>
      </section>
    </div>
  );
};


export default Courses
