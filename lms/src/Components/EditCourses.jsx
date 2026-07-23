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


const EditCourses = ({courseToEdit}) => {

  
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);



  const [error, setError] = useState("");

  const [courseData, setCourseData] = useState({
    title: courseToEdit.title ?? "",
    category: courseToEdit.category ?? "",
    description: courseToEdit.description ?? "",
   
  });



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
        `courses/${courseToEdit.id}/`,
        courseToSend
      );


      alert("User updated successfully!");

      navigate("/manage-courses");


    } catch (err) {

      console.error(
        "Update failed:",
        err.response?.data || err.message
      );

      alert("Unable to update user.");

    }

  };


  


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