import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = () => {
  const roles = ["Snacks", "Drinks", "Decorations", "Vibes"];
  const [rows, setRows] = useState([]);
  const [maxUsers, setMaxUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRows = [];
      let maxUsersCount = 0;

      for (const role of roles) {
        try {
          const response = await fetch(
            "http://localhost:3001/assignRole/getRole",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                roleToFind: role,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const users = data.users || [];
          const row = {
            role: role,
            users: users,
          };
          fetchedRows.push(row);
          if (users.length > maxUsersCount) {
            maxUsersCount = users.length;
          }
        } catch (error) {
          console.error("Error fetching data for role:", role, error);
        }
      }
      setRows(fetchedRows);
      setMaxUsers(maxUsersCount);
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Party Role</StyledTableCell>
            {[...Array(maxUsers)].map((_, index) => (
              <StyledTableCell key={index} align="right">
                Participant {index + 1}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              <StyledTableCell component="th" scope="row">
                {row.role}
              </StyledTableCell>
              {row.users.map((user, userIndex) => (
                <StyledTableCell key={userIndex} align="right">
                  {user.firstName} {user.lastName}
                </StyledTableCell>
              ))}
              {[...Array(maxUsers - row.users.length)].map((_, idx) => (
                <StyledTableCell key={`empty-${idx}`} align="right">
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
