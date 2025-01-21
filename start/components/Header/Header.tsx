import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const BackgroundAppBar = styled(AppBar)({
  backgroundImage:
    "url(https://images.unsplash.com/photo-1671043125957-d91fcb383e26?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  backgroundSize: "cover", // Adjust to cover the whole AppBar
  backgroundPosition: "center", // Center the image
  height: "35vh",
});

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BackgroundAppBar
        position="static"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h1"
            component="div"
            sx={{ flexGrow: 1, color: "white", fontFamily: "Henny Penny" }}
          >
            Abraham Showcase
          </Typography>
        </Toolbar>
      </BackgroundAppBar>
    </Box>
  );
};

export default Header;
