import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

const NavBar = ({ setIsLoggedIn, note, setNote }) => {
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  const handleCreatePageRouting = () => {
    setNote(null);
    localStorage.removeItem("note");
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <nav style={{ margin: "0 5px" }}>
          <Link to="/" style={{ margin: "0 2em" }}>
            Home
          </Link>
          <Link to="/note" onClick={handleCreatePageRouting}>
            Create Note
          </Link>
        </nav>
        <Button
          variant="outlined"
          sx={{ my: 1, mx: 1.5, position: "absolute", right: 0 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
