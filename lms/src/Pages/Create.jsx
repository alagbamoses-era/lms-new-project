import { useState, useEffect } from 'react';
import AxiosInstance from '../Components/Axios';
import Box from '@mui/material/Box';
import '../css/Create.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Topography from '@mui/material/Typography';
import TextForm from '../Components/forms/TextForm';
import SelectForm from '../Components/forms/SelectForm';


const Create = () =>  {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  console.log(users);
  console.log(courses);
  console.log(roles);
  console.log(genders);
  console.log(programmes);

  const getData = () => {

  AxiosInstance.get('users/').then((response) => {
    setUsers(response.data);    
  });

  AxiosInstance.get('courses/').then((response) => {
    setCourses(response.data);    
  }); 

  AxiosInstance.get('roles/').then((response) => {
    setRoles(response.data);    
  });

  AxiosInstance.get('genders/').then((response) => {
    setGenders(response.data);    
  });

  AxiosInstance.get('programmes/').then((response) => {
    setProgrammes(response.data);    
  });     

 
}

 useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Box className="TopBar">
        <AddBoxIcon />
        <Topography  sx={{ marginLeft: '15px', fontWeight: 'bold', variant: 'subtitle1' }}>
          <h1>Create New Users</h1>
          </Topography>
      </Box>
       <Box className= 'FormBox'>
          <Box className='FormArea'>
            <TextForm label= {"Name"} />
            
          </Box>

          <Box className='FormArea'>
            <TextForm label= {"Email"} /> 
          </Box>

          <Box className='FormArea'>
            <TextForm label= {"Password"} /> 
          </Box>  

          <Box className='FormArea'>
            <SelectForm label={"Role"}
              options={roles}
            />
          </Box>

           <Box className='FormArea'>
            <SelectForm label={"Gender"}
              options={genders}
            />
          </Box>

           <Box className='FormArea'>
            <SelectForm label={"Programme"}
              options={programmes}
            />
          </Box>

          

        
       </Box>
    </div>
  )
}


export default Create;
