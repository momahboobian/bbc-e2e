import React, { useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../styles/Navbar.css";

const NavBar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleSidebarToggle = () => {
    toggleSidebar(); // Call the toggleSidebar function from props to hide/show the sidebar
  };

  return (
    <div className="navbar-buttons">
      <div className="navbar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleSidebarToggle}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit">Calendar</Button>
        <Button color="inherit">Favorites</Button>
        <Button
          color="inherit"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClick}
        >
          People
        </Button>
      </div>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <CalendarTodayIcon />
          Favorited Availability
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StarIcon />
          Favorites
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PeopleIcon />
          All Partners
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ArrowDropDownIcon />
          Snoozed
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavBar;
