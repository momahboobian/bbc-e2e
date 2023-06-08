import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

const Person = ({ person }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        alt={person.name}
        src={person.photo}
        sx={{ width: 150, height: 150, borderRadius: "50%", marginBottom: 5 }}
      />
      <Typography variant="h6" align="center">
        Age: {person.age}
      </Typography>
      <Typography variant="body1" align="center">
        Contact: {person.contact}
      </Typography>
      <Typography variant="body1" align="center">
        Education: {person.education}
      </Typography>
      <Typography variant="body1" align="center">
        Email: {person.email}
      </Typography>
      <Typography variant="body1" align="center">
        Gender: {person.gender}
      </Typography>
      <Typography variant="body1" align="center">
        Interests: {person.interests}
      </Typography>
      <Typography variant="body1" align="center">
        Location: {person.location}
      </Typography>
      <Typography variant="body1" align="center">
        Profession: {person.profession}
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 10 }}>
        Show Matches
      </Button>
    </Box>
  );
};

export default Person;
