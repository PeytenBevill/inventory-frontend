import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LightbulbFilament } from "@phosphor-icons/react";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <LightbulbFilament size={45} style={{ color: "black" }} />
          </Typography>
          <Link to='/'>
          <Button style={{ color: "black" }}>Home</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
