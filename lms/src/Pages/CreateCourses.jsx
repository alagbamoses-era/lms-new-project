import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosService from "../Components/Axios"; 
import "../css/CreateCourse.css";

const CreateCourse = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("This is the user",user)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    user_id: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const courseData = {
    title: formData.title,
    category: formData.category,
    description: formData.description,
    user: user.id
  };

  try {
    const { data } = await axiosService.post("/courses/", courseData);

    console.log("Course Created:", data);

    alert("Course created successfully!");

    setFormData({
      title: "",
      category: "",
      description: "",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to create course.");
  }
};

  return (
    <div className="course-container">
      <div className="course-card">
        <h2>Create New Course</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Teacher</label>
            <input
              type="email"
              value={user.id || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter course category"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              required
            />
          </div>

          <button type="submit">Create Course</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;