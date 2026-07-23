import React from 'react'
import { useEffect, useState } from "react";
import '../css/Courses.css'
import AxiosInstance from 'axios'



  function Courses() {
  

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true);

  

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AxiosInstance.get("/courses/");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

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
          <div className="EditFormBox">
            <h1>Courses</h1>
           
            <ul className="edit-user">

            {courses.map((course) => (
                <li key={course.id}>
                    <span>{course.title}</span>
                </li>
            ))}

            </ul>
      
        </div>
        </div>
       </section>
    </div>
  );
};


export default Courses
