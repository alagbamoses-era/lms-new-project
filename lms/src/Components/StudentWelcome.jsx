import React from "react";
import { useSelector } from "react-redux";
import "../css/StudentWelcome.css";

const StudentWelcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="welcome-container">
      <div className="welcome-card">

        <div className="welcome-header">
          <h1>
            Welcome, {user?.username || "Student"}!
          </h1>

          <p>
            We are happy to have you back in the Learning Management System.
          </p>
        </div>


        <div className="student-info">
          <h3>Personal Information</h3>

          <p>
            <strong>Name:</strong>{" "}
            {user?.username || "Not available"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email || "Not available"}
          </p>
        </div>


        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h2>📚 My Courses</h2>
            <p>
              View your enrolled courses and continue learning.
            </p>

            <button>
              View Courses
            </button>
          </div>


          <div className="dashboard-card">
            <h2>📝 Assignments</h2>
            <p>
              Check your assignments and submission deadlines.
            </p>

            <button>
              View Assignments
            </button>
          </div>


          <div className="dashboard-card">
            <h2>📊 Progress</h2>
            <p>
              Track your learning progress and achievements.
            </p>

            <button>
              View Progress
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentWelcome;