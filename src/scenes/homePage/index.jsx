import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Box, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomizedTables from "scenes/tableComponent/index.jsx";
import { updateUserRole, setLogout } from "../../state/index.js";
import { useNavigate } from "react-router-dom";

const SelectPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [roleUser, setRole] = useState(user.role || "");
  const [isEditing, setIsEditing] = useState(
    user.role === "" || user.role === undefined
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lockButton = !isEditing && roleUser !== "";

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleChangeRole = (user) => {
    setIsEditing(true);
    changeRole(user);
  };

  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const changeRole = async (user) => {
    try {
      const response = await fetch(
        "http://localhost:3001/assignRole/updateRoleForUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user._id,
            roleUser: user.role,
          }),
        }
      );
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const assignRole = async () => {
    try {
      const response = await fetch("http://localhost:3001/assignRole/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleUser: roleUser,
          firstName: user.firstName,
          lastName: user.lastName,
          buget: user.buget,
          id: user._id,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Network response was not ok");
      }
  
      // Update Redux store and component state
      dispatch(updateUserRole({ role: roleUser }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginRight: "1rem",
          marginTop: "1rem",
        }}
      >
        <Button variant="outlined" onClick={handleLogOut}>
          Log out
        </Button>
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "6rem",
          }}
        >
          <Box>
            <Typography variant="h4" textAlign="center" marginBottom="0.2rem">
              First, choose what responsibility you want.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={roleUser}
              label="Role"
              onChange={handleChange}
              disabled={lockButton}
            >
              <MenuItem value={"Snacks"}>Snacks</MenuItem>
              <MenuItem value={"Drinks"}>Drinks</MenuItem>
              <MenuItem value={"Decorations"}>Decorations</MenuItem>
              <MenuItem value={"Vibes"}>Good vibes</MenuItem>
            </Select>
            <FormHelperText>
              {user.role === undefined
                ? "Select a role from the dropdown."
                : "You have already selected a role."}
            </FormHelperText>
          </FormControl>
        </Box>
        {isEditing && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <Button variant="outlined" onClick={assignRole}>
              Confirm choice
            </Button>
          </Box>
        )}
        {!isEditing && user.role !== "" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <Button variant="outlined" onClick={handleChangeRole}>
              Change option
            </Button>
          </Box>
        )}
        <Typography
          textAlign="center"
          variant="subtitle1"
          sx={{ marginBottom: "1rem" }}
        >
          Other participants to the party:
        </Typography>
        <Box sx={{ marginBottom: "3rem" }}>
          <CustomizedTables />
        </Box>
      </Container>
    </>
  );
};

export default SelectPage;
