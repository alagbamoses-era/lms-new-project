import React from "react";
import "../css/About.css";
import Home from './Home'

const About = () => {
  return (
    <>
    <div className="about-container">
      <section className="hero">
        <h1>About Us</h1>
        <p>
          We are passionate about providing best learning and building innovative digital solutions that
          help businesses grow and succeed in today's competitive world.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver learning on high-quality web applications with modern
            technologies, exceptional user experience, and reliable performance.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>
            To become a trusted learning institution and technology partner by creating impactful and
            scalable digital products for clients worldwide.
          </p>
        </div>

        <div className="about-card">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Modern UI/UX Design</li>
            <li>✔ Responsive Websites</li>
            <li>✔ Fast Performance</li>
            <li>✔ Clean & Maintainable Code</li>
            <li>✔ Customer Satisfaction</li>
          </ul>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;