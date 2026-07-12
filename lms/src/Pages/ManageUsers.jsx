import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import AxiosInstance from "../Components/Axios";
import TextForm from "../Components/forms/TextForm";
import SelectForm from "../Components/forms/SelectForm";

import "../css/EditUser.css";


const EditUser = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    gender: "",
    programme: "",
  });


  useEffect(() => {
    fetchData();
  }, [id]);


  const fetchData = async () => {

    try {

      setLoading(true);

      const [
        userResponse,
        rolesResponse,
        gendersResponse,
        programmesResponse
      ] = await Promise.all([

        AxiosInstance.get(`users/${id}/`),

        AxiosInstance.get("roles/"),

        AxiosInstance.get("genders/"),

        AxiosInstance.get("programmes/"),

      ]);


      const user = userResponse.data;


      setFormData({

        username: user.username || "",

        email: user.email || "",

        password: "",

        role: user.role || "",

        gender: user.gender || "",

        programme: user.programme || "",

      });


      setRoles(rolesResponse.data);

      setGenders(gendersResponse.data);

      setProgrammes(programmesResponse.data);


    } catch (err) {

      console.error(
        "Loading user failed:",
        err.response?.data || err.message
      );

      setError("Unable to load user information.");

    } finally {

      setLoading(false);

    }

  };


  const handleChange = (field, value) => {

    setFormData(previous => ({
      ...previous,
      [field]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const dataToSend = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        gender: formData.gender,
        programme: formData.programme,
      };


      // Only update password if user entered a new one
      if (formData.password) {

        dataToSend.password = formData.password;

      }


      await AxiosInstance.put(
        `users/${id}/`,
        dataToSend
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


      <Box className="EditTopBar">

        <EditIcon />

        <Typography className="Title">

          Manage User Account

        </Typography>

      </Box>



      {error && (

        <Typography className="error">

          {error}

        </Typography>

      )}



      <form onSubmit={handleSubmit}>


        <Box className="EditFormBox">


          <Box className="FormArea">

            <TextForm

              label="Username"

              value={formData.username}

              onChange={(e) =>
                handleChange(
                  "username",
                  e.target.value
                )
              }

            />

          </Box>



          <Box className="FormArea">

            <TextForm

              label="Email"

              value={formData.email}

              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value
                )
              }

            />

          </Box>



          <Box className="FormArea">

            <TextForm

              label="New Password"

              type="password"

              value={formData.password}

              onChange={(e) =>
                handleChange(
                  "password",
                  e.target.value
                )
              }

            />

          </Box>



          <Box className="FormArea">

            <SelectForm

              label="Role"

              options={roles}

              value={formData.role}

              onChange={(value) =>
                handleChange(
                  "role",
                  value
                )
              }

            />

          </Box>



          <Box className="FormArea">

            <SelectForm

              label="Gender"

              options={genders}

              value={formData.gender}

              onChange={(value) =>
                handleChange(
                  "gender",
                  value
                )
              }

            />

          </Box>



          <Box className="FormArea">

            <SelectForm

              label="Programme"

              options={programmes}

              value={formData.programme}

              onChange={(value) =>
                handleChange(
                  "programme",
                  value
                )
              }

            />

          </Box>



          <Box className="ButtonArea">


            <Button

              type="submit"

              variant="contained"

              color="primary"

            >

              Update User

            </Button>



            <Button

              variant="outlined"

              color="secondary"

              onClick={() =>
                navigate("/manage-user-account")
              }

            >

              Cancel

            </Button>


          </Box>


        </Box>


      </form>


    </Box>

  );

};


export default EditUser;