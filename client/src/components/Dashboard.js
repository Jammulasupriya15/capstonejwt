import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./mix.css"
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Dashboard = () => {

  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);


  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash");
    }

  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true)
    }, 1000)

  }, [])

  const Input = styled('input')({
    display: 'none',
  });
  return (
    <>
      {
        data ? <div direction="row" alignitems="center" spacing={2}>
          <h2>Welcome to computation of green coverage Dashbord</h2>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span">Upload Image1</Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
          </label>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span">Upload Image2</Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
          </label>
          <p>User {logindata ? logindata.validUserOne.fname : ""} Please uplod two pictures of same place and in same season but in different years for finding the difference.</p>
        </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }

    </>



  )
}

export default Dashboard