import { useState, useEffect } from "react";
import AxiosInstance from "../Components/Axios";
import Box from "@mui/material/Box";
import "../css/Create.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Typography from "@mui/material/Typography";
import TextForm from "../Components/forms/TextForm";
import SelectForm from "../Components/forms/SelectForm";
import Button from "@mui/material/Button";
import store from "../store/index";

const Create = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    gender: "",
    programme: "",
  });

  const getData = async () => {
    try {
      
      const rolesResponse = await AxiosInstance.get("roles/");
      setRoles(rolesResponse.data);

      const gendersResponse = await AxiosInstance.get("genders/");
      setGenders(gendersResponse.data);

      const programmesResponse = await AxiosInstance.get("programmes/");
      setProgrammes(programmesResponse.data);


    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post("users/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        gender: formData.gender,
        programme: formData.programme,
      });
      

      setUsers([...users, response.data]);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        programme: "",
      });

      alert("User created successfully!");

    } catch (error) {
      console.error("Create user failed:", error.response?.data || error.message);
      alert("Unable to create user.");
    }
  };
  

  return (
    <div>
      <Box className="TopBar">
        <AddBoxIcon />

        <Typography sx={{ marginLeft: "15px", fontWeight: "bold" }}>
          <h1>Create New Users</h1>
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box className="FormBox">

          <Box className="FormArea">
            <TextForm
              label="Name"
              value={formData.username}
              onChange={(e) =>
                handleChange("username", e.target.value)
              }
            />
          </Box>

          <Box className="FormArea">
            <TextForm
              label="Email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />
          </Box>

          <Box className="FormArea">
            <TextForm
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
            />
          </Box>

          <Box className="FormArea">
           <SelectForm
              label="Role"
              options={roles}
              value={formData.role}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  role: value,
                })
              }
            />
          </Box>

          <Box className="FormArea">
           <SelectForm
              label="Gender"
              options={genders}
              value={formData.gender}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  gender: value,
                })
              }
            />
          </Box>

          <Box className="FormArea">
            <SelectForm
                label="Programme"
                options={programmes}
                value={formData.programme}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    programme: value,
                  })
                }
              />
          </Box>

          <Box className="FormArea">
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create User
            </Button>
           
          </Box>

        </Box>
      </form>
    </div>
  );
};

export default Create;