import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import AxiosInstance from "./Axios";
import TextForm from "./forms/TextForm";
import SelectForm from "./forms/SelectForm";

import "../css/EditUser.css";


const EditCourses = (courseToEdit) => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [courseData, setCourseData] = useState({
    title: "",
    category: "",
    description: "",
   
  });


  useEffect(() => {
    fetchData();
  }, [id]);


  const fetchData = async () => {

    try {

      setLoading(true);

      const [
        coursesResponse,
      
      ] = await Promise.all([

        AxiosInstance.get(`courses/${id}/`),


      ]);


      const courses = coursesResponse.data;
      console.log(courses)


      setCourseData({

        title: courses.title || "",

        category: courses.category || "",

        description: courses.description || "",


      });


      setCourses(coursesResponse.data);

     


    } catch (err) {

      console.error(
        "Loading user failed:",
        err.response?.data || err.message
      );

      setError("Unable to load course information.");

    } finally {

      setLoading(false);

    }

  };


  const handleChange = (field, value) => {

    setCourseData(previous => ({
      ...previous,
      [field]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const courseToSend = {
        title: courseData.title,
        category: courseData.category,
        description: courseData.description,
      
      };



      await AxiosInstance.put(
        `users/${id}/`,
        courseToSend
      );


      alert("User updated successfully!");

      navigate("/manage-user-account");


    } catch (err) {

      console.error(
        "Update failed:",
        err.response?.data || err.message
      );

      alert("Unable to update user.");

    }

  };


  if (loading) {

    return (
      <Box className="EditPage">
        <Typography>
          Loading user details...
        </Typography>
      </Box>
    );

  }


  return (

    <Box className="EditPage">
      {error && (

        <Typography className="error">

          {error}

        </Typography>

      )}

      <form onSubmit={handleSubmit}>


        <Box className="EditFormBox">


          <Box className="FormArea">

            <TextForm

              label="title"

              value={courseData.title}

              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }

            />
            

          </Box>

           <Box className="FormArea">

            <TextForm

              label="category"

              value={courseData.category}

              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value
                )
              }

            />
          </Box>

           <Box className="FormArea">

          <TextForm

              label="description"

              value={courseData.description}

              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }

            />
            </Box>
            
            <Button

              type="submit"

              variant="contained"

              color="primary"

            >

              Update Courses

            </Button>



            <Button

              variant="outlined"

              color="secondary"

              onClick={() =>
                navigate("/manage-courses")
              }

            >

              Cancel

            </Button>


          </Box>


      </form>


    </Box>

  );

};


export default EditCourses;