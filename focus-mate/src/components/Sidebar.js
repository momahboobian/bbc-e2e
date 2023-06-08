import React, { useState } from "react";
import { Box, Button, Checkbox, Link, Typography } from "@mui/material";
import "../styles/Sidebar.css";

const Sidebar = ({ toggleSidebar, selectedPerson }) => {
  const [isAllMembersChecked, setIsAllMembersChecked] = useState(false);

  const handleAllMembersCheckboxChange = () => {
    setIsAllMembersChecked(!isAllMembersChecked);
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-box session-box">
        <Button variant="contained" className="session-btn sidebar-box-button">
          + Book a Session
        </Button>
        <Link href="#" className="favorites sidebar-box-link" underline="none">
          See Favorites Availability
        </Link>
      </Box>
      <Box className="sidebar-box upcoming-box">
        <Typography className="upcoming-heading">
          <span className="text-left">Upcoming</span>
          <Link
            href="#"
            className="upcoming-link sidebar-box-link"
            underline="none"
          >
            View All
          </Link>
        </Typography>
        {selectedPerson ? (
          <>
            <Typography variant="body1" className="upcoming-text">
              Upcoming session today
            </Typography>
            <Typography variant="body1" className="upcoming-text">
              {selectedPerson.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="zoom-link-button"
              href={selectedPerson.zoomLink}
              target="_blank"
            >
              Zoom Link
            </Button>
          </>
        ) : (
          <Typography variant="body1" className="upcoming-text">
            No upcoming sessions today
          </Typography>
        )}
        <Link
          href="#"
          className="upcoming-link sidebar-box-link"
          underline="none"
        >
          Review Session Guidelines
        </Link>
      </Box>
      <Box className="sidebar-box group-box">
        <Typography className="group-heading text-left">My Groups</Typography>
        {/* Render groups here */}
      </Box>
      <Box
        className="sidebar-box members-box"
        onClick={handleAllMembersCheckboxChange}
      >
        <Checkbox checked={isAllMembersChecked} />
        <Typography variant="body1" className="members-text text-left">
          All Focusmate Members
        </Typography>
      </Box>
      <Link href="#" className="help" underline="none">
        Privacy - Help
      </Link>
    </Box>
  );
};

export default Sidebar;
