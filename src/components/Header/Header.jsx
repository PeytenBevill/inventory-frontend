import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LightbulbFilament } from "@phosphor-icons/react";

export default function Header() {
  const handleLogOut = () => {
    let id = localStorage.getItem("computerID");
    localStorage.removeItem("computer_num");
    localStorage.removeItem("computerID");
    axios
      .put(`https://second-inventory-backend.onrender.com/computers/${id}`, {
        comp_status: 0,
      })
      .then((res) => {
        res.data;
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white", boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <LightbulbFilament size={45} style={{ color: "black" }} />
          </Typography>
          <Link to="/">
            <Button onClick={handleLogOut} style={{ color: "black" }}>
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
