import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Person from "./Person";

const Header = ({ data }) => {
  const [person, setPerson] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAvatarClick = (person) => {
    setPerson(person);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchRandomPerson();
  }, []);

  const fetchRandomPerson = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/persons");
      const persons = response.data;
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      setPerson(randomPerson);
    } catch (error) {
      console.log("An error occurred while fetching data:", error);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BBC E2E
          </Typography>
          <Button color="inherit">Invite</Button>
          <Button color="inherit">Help</Button>
          {person && (
            <Avatar
              alt={person.name}
              src={person.photo}
              onClick={() => handleAvatarClick(person)}
            />
          )}
        </Toolbar>
      </AppBar>

      {person && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{person.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Person person={person} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Header;
