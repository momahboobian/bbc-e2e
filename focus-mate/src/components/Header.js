import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material'
import Person from './Person'

const Header = ({ person }) => {
  const [open, setOpen] = useState(false)

  const handleAvatarClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <AppBar position="static" sx={{ mb: 2 }}>
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
              onClick={handleAvatarClick}
              sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}
            />
          )}
        </Toolbar>
      </AppBar>

      {person && (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogContent>
            <Card>
              <CardMedia component="img" height="140" image={person.photo} alt={person.name} />
              <CardContent>
                <Person person={person} />
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default Header
