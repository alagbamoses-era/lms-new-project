import React, { useState, useEffect } from "react";
import EditCourses from "../Components/EditCourses"
import AxiosInstance from "../Components/Axios";
import '../css/EditUser.css'



function ManageUsers() {
  // Fetch all the users
  // users.map() => display each user, with a button
  // <button onClick={setShowEditForm && setUserToEdit}>
  // Pass userToEdit as a prop to the EditUser component (don#t need the ID from useParams and don#t need to fetch data in that component)
  // setFormData from userToEdit e.g. username = userToEdit.username
  const [showEditForm, setShowEditForm] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState({});
  const [courses, setCourses] = useState([])


  const [loading, setLoading] = useState(true);

    const clickForm = () => {
        setShowEditForm(c => c === false ? true : false)
    }
   

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AxiosInstance.get("/courses/");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
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
        <div className="EditFormBox">
            <h1>Courses</h1>
            <button onClick={!clickForm }>Show Courses</button>
            <ul className="edit-user">

            {courses.map((course) => (
                <li key={course.id}>
                    <span>{course.title}</span>
                    <button ButtonArea onClick={() => {setShowEditForm(true); setCourseToEdit(course)}}>Edit</button>
                
                </li>
            ))}

            </ul>
            {showEditForm && <EditCourses courseToEdit={courseToEdit}/> }

            
        </div>
    );
}


export default ManageUsers
