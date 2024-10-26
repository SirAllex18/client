import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Form from "scenes/loginPage/form";

const HomePage = () => {
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', marginTop: "10rem" }}>
          <Box>
            <Typography variant="h2" textAlign="center" marginBottom="0.2rem"> Hello, party people!</Typography>
            <Typography variant="subtitle1" textAlign="center"> Login to start organizing! </Typography>
          </Box> 
        </Box>
        <Box sx={{marginBottom: "2rem"}}>
          <Form/>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
