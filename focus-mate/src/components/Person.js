import React from 'react'
import { Typography, Avatar, Card, CardContent } from '@mui/material'

const Person = ({ person }) => {
  return (
    <Card sx={{ margin: 'auto', boxShadow: 3 }}>
      <Avatar
        alt={person.name}
        src={person.photo}
        sx={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          margin: '20px auto',
          boxShadow: 3,
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          {person.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Age:</strong> {person.age}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Contact:</strong> {person.contact}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Education:</strong> {person.education}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Email:</strong> {person.email}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Gender:</strong> {person.gender}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Interests:</strong> {person.interests}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Location:</strong> {person.location}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          <strong>Profession:</strong> {person.profession}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Person
