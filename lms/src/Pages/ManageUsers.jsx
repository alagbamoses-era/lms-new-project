import React, { useState, useEffect } from "react";
import EditUser from "../Components/EditUsers"
import AxiosInstance from "../Components/Axios";
import '../css/EditUser.css'



function ManageUsers() {
  // Fetch all the users
  // users.map() => display each user, with a button
  // <button onClick={setShowEditForm && setUserToEdit}>
  // Pass userToEdit as a prop to the EditUser component (don#t need the ID from useParams and don#t need to fetch data in that component)
  // setFormData from userToEdit e.g. username = userToEdit.username
  const [showEditForm, setShowEditForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(true);

    const clickForm = () => {
        setShowEditForm(c => c === false ? true : false)
    }
   console.log("user to edit", userToEdit)
    console.log("user to edit", userToEdit.username)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AxiosInstance.get("/users/");
                setUsers(response.data);
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
            <h1>Users</h1>
            <button onClick={!clickForm }>Show Users</button>
            <ul className="edit-user">

            {users.map((user) => (
                <li key={user.id}>
                    <span>{user.username}</span> | <span>{user.email}</span>
                    <button ButtonArea onClick={() => {setShowEditForm(true); setUserToEdit(user)}}>Edit</button>
                
                </li>
            ))}

            </ul>
            {showEditForm && <EditUser  userToEdit={userToEdit} /> }
    
        </div>
    );
}


export default ManageUsers
